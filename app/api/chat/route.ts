/** biome-ignore-all lint/suspicious/useAwait: <explanation> */

import type { Ingredient, Recipe } from '@/lib/types';
import { google } from '@ai-sdk/google';
import type { Message } from 'ai';
import { streamText, tool } from 'ai';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Helper function to filter recipes based on ingredients
function filterRecipesByIngredients(
    recipes: Recipe[],
    availableIngredients: string[],
    requestedIngredients?: string[]
) {
    return recipes.filter((recipe) => {
        const recipeIngredients = recipe.ingredients.map((ing) =>
            ing.name.toLowerCase()
        );

        // If specific ingredients provided, check if recipe uses them
        if (requestedIngredients && requestedIngredients.length > 0) {
            const hasRequestedIngredients = requestedIngredients.some((ingredient) =>
                recipeIngredients.includes(ingredient.toLowerCase())
            );
            if (!hasRequestedIngredients) {
                return false;
            }
        }

        // Check if we have all required ingredients
        const missingCount = recipeIngredients.filter(
            (ingredient) => !availableIngredients.includes(ingredient)
        ).length;

        // Return recipes we can make (0 missing) or nearly make (1-2 missing)
        return missingCount <= 2;
    });
}

// Helper function to sort recipes by completeness
function sortRecipesByCompleteness(
    recipes: Recipe[],
    availableIngredients: string[]
) {
    return recipes.sort((a, b) => {
        const aMissing = a.ingredients.filter(
            (ing) => !availableIngredients.includes(ing.name.toLowerCase())
        ).length;
        const bMissing = b.ingredients.filter(
            (ing) => !availableIngredients.includes(ing.name.toLowerCase())
        ).length;
        return aMissing - bMissing;
    });
}

// Helper function to count fully makeable recipes
function countFullyMakeableRecipes(
    recipes: Recipe[],
    availableIngredients: string[]
) {
    return recipes.filter((recipe) => {
        const missing = recipe.ingredients.filter(
            (ing) => !availableIngredients.includes(ing.name.toLowerCase())
        ).length;
        return missing === 0;
    }).length;
}

export async function POST(req: NextRequest) {
    try {
        const {
            messages,
            inventory,
            recipes: clientRecipes,
        }: {
            messages: Message[];
            inventory: Ingredient[];
            recipes: Recipe[];
        } = await req.json();

        const result = streamText({
            model: google('gemini-2.5-flash'),
            messages,
            maxSteps: 10, // Allow multiple steps for tool calling
            tools: {
                getInventory: tool({
                    description: "Get the user's current inventory of ingredients",
                    parameters: z.object({}),
                    execute: async () => {
                        return {
                            inventory,
                            count: inventory.length,
                        };
                    },
                }),
                getRecipes: tool({
                    description: 'Get all available recipes',
                    parameters: z.object({}),
                    execute: async () => {
                        return {
                            recipes: clientRecipes,
                            count: clientRecipes.length,
                        };
                    },
                }),
                getRecipeById: tool({
                    description: 'Get a specific recipe by its ID',
                    parameters: z.object({
                        id: z.string().describe('The recipe ID'),
                    }),
                    execute: async ({ id }) => {
                        const recipe = clientRecipes.find((r) => r.id === id) || null;
                        if (!recipe) {
                            return {
                                recipe: null,
                                error: `Recipe with ID ${id} not found`,
                            };
                        }
                        return {
                            recipe,
                        };
                    },
                }),
                checkCanMakeRecipe: tool({
                    description:
                        'Check if the user can make a specific recipe with their current inventory',
                    parameters: z.object({
                        recipeId: z.string().describe('The recipe ID to check'),
                    }),
                    execute: async ({ recipeId }) => {
                        const recipe = clientRecipes.find((r) => r.id === recipeId) || null;
                        if (!recipe) {
                            return {
                                canMake: false,
                                error: `Recipe with ID ${recipeId} not found`,
                                missingIngredients: [],
                            };
                        }

                        const missingIngredients: string[] = [];

                        for (const ingredient of recipe.ingredients) {
                            const inventoryItem = inventory.find(
                                (item) =>
                                    item.name.toLowerCase() === ingredient.name.toLowerCase()
                            );

                            if (!inventoryItem) {
                                missingIngredients.push(ingredient.name);
                            }
                        }

                        const canMake = missingIngredients.length === 0;

                        return {
                            canMake,
                            recipe: recipe.name,
                            missingIngredients,
                        };
                    },
                }),
                findRecipesByIngredients: tool({
                    description:
                        'Find recipes that can be made with available ingredients',
                    parameters: z.object({
                        ingredients: z
                            .array(z.string())
                            .optional()
                            .describe('Optional: specific ingredients to search for'),
                    }),
                    execute: async ({ ingredients }) => {
                        const availableIngredients = inventory.map((item) =>
                            item.name.toLowerCase()
                        );

                        const possibleRecipes = filterRecipesByIngredients(
                            clientRecipes,
                            availableIngredients,
                            ingredients
                        );

                        const sortedRecipes = sortRecipesByCompleteness(
                            possibleRecipes,
                            availableIngredients
                        );

                        const fullyMakeableCount = countFullyMakeableRecipes(
                            sortedRecipes,
                            availableIngredients
                        );

                        return {
                            recipes: sortedRecipes,
                            fullyMakeableCount,
                            totalFound: sortedRecipes.length,
                            searchIngredients: ingredients,
                        };
                    },
                }),
                getIngredientById: tool({
                    description: 'Get a specific ingredient from inventory by ID',
                    parameters: z.object({
                        id: z.string().describe('The ingredient ID'),
                    }),
                    execute: async ({ id }) => {
                        const ingredient = inventory.find((item) => item.id === id) || null;
                        if (!ingredient) {
                            return {
                                ingredient: null,
                                error: `Ingredient with ID ${id} not found`,
                            };
                        }
                        return {
                            ingredient,
                        };
                    },
                }),
                createRecipe: tool({
                    description:
                        'Create a new recipe based on user query and preferences',
                    parameters: z.object({
                        name: z.string().describe('The recipe name'),
                        creator: z.string().describe('The recipe creator name'),
                        description: z.string().describe('Recipe description'),
                        image: z
                            .string()
                            .optional()
                            .describe('Recipe image URL (optional)'),
                        nutrition: z.object({
                            energy: z.string().describe('Energy content (e.g., "500Kcal")'),
                            carbs: z.string().describe('Carbohydrates (e.g., "45g")'),
                            proteins: z.string().describe('Proteins (e.g., "25g")'),
                            fats: z.string().describe('Fats (e.g., "15g")'),
                        }),
                        ingredients: z.array(
                            z.object({
                                name: z.string().describe('Ingredient name'),
                                quantity: z.string().describe('Ingredient quantity'),
                                image: z
                                    .string()
                                    .optional()
                                    .describe('Ingredient image URL (optional)'),
                            })
                        ),
                        cookingSteps: z
                            .array(
                                z.object({
                                    step: z.number().describe('Step number'),
                                    instruction: z.string().describe('Cooking instruction'),
                                    duration: z
                                        .string()
                                        .optional()
                                        .describe('Step duration (optional)'),
                                })
                            )
                            .optional(),
                    }),
                    execute: async ({
                        name,
                        creator,
                        description,
                        image,
                        nutrition,
                        ingredients,
                        cookingSteps,
                    }) => {
                        // Check current inventory to see what ingredients user has
                        const availableIngredients = inventory.map((item) => ({
                            name: item.name.toLowerCase(),
                            id: item.id,
                            originalName: item.name,
                            image: item.image,
                        }));

                        // Remove duplicates from ingredients list first
                        const uniqueIngredients = ingredients.filter(
                            (ingredient, index, self) =>
                                index ===
                                self.findIndex(
                                    (t) => t.name.toLowerCase() === ingredient.name.toLowerCase()
                                )
                        );

                        const ingredientsToAdd: Array<{
                            name: string;
                            quantity: string;
                            image: string;
                        }> = [];

                        // Process ingredients and identify missing ones
                        const processedIngredients = uniqueIngredients.map((ingredient) => {
                            const existingIngredient = availableIngredients.find(
                                (item) => item.name === ingredient.name.toLowerCase()
                            );

                            // If user doesn't have the ingredient, prepare it for addition with quantity 0
                            if (!existingIngredient) {
                                const ingredientToAdd = {
                                    name: ingredient.name,
                                    quantity: '0',
                                    image: ingredient.image || '✨',
                                };
                                ingredientsToAdd.push(ingredientToAdd);

                                return {
                                    id: `ing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                                    name: ingredient.name,
                                    quantity: ingredient.quantity,
                                    image: ingredient.image || '✨',
                                };
                            }

                            // Use existing ingredient data if available
                            return {
                                id: `ing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                                name: existingIngredient.originalName, // Use original case
                                quantity: ingredient.quantity,
                                image: existingIngredient.image, // Use existing image
                            };
                        });

                        // Process cooking steps
                        const processedSteps =
                            cookingSteps?.map((step) => ({
                                id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                                step: step.step,
                                instruction: step.instruction,
                                duration: step.duration,
                            })) || [];

                        const newRecipe = {
                            id: `recipe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                            name,
                            creator,
                            description,
                            image: image || '🍽️',
                            nutrition,
                            ingredients: processedIngredients,
                            cookingSteps: processedSteps,
                        };

                        return {
                            recipe: newRecipe,
                            message: `Recipe "${name}" created successfully!`,
                            ingredientsAdded: ingredientsToAdd.length,
                            ingredientsToAdd,
                        };
                    },
                }),
                createIngredient: tool({
                    description: 'Create a new ingredient in the inventory',
                    parameters: z.object({
                        name: z.string().describe('Ingredient name'),
                        quantity: z
                            .string()
                            .describe(
                                'Ingredient quantity (use "0" if user does not have it)'
                            ),
                        image: z
                            .string()
                            .optional()
                            .describe('Ingredient image URL (optional)'),
                    }),
                    execute: async ({ name, quantity, image }) => {
                        // Check if ingredient already exists
                        const existingIngredient = inventory.find(
                            (item) => item.name.toLowerCase() === name.toLowerCase()
                        );

                        if (existingIngredient) {
                            return {
                                ingredient: existingIngredient,
                                message: `Ingredient "${name}" already exists in inventory`,
                                existed: true,
                                shouldAdd: false,
                            };
                        }

                        // Prepare ingredient data for client-side storage
                        const ingredientToAdd = {
                            name,
                            quantity,
                            image: image || '✨',
                        };

                        return {
                            ingredient: ingredientToAdd,
                            message: `Ingredient "${name}" will be added to inventory${quantity === '0' ? ' (quantity: 0 - you need to get this)' : ''}`,
                            existed: false,
                            shouldAdd: true,
                            ingredientToAdd,
                        };
                    },
                }),
            },
            system: `You are CookPal, a helpful cooking assistant. You help users with:
- Managing their ingredient inventory
- Finding recipes they can make with available ingredients
- Creating new recipes based on user preferences and queries
- Adding new ingredients to inventory
- Providing cooking tips and suggestions
- Helping with meal planning

IMPORTANT INSTRUCTIONS:
1. Always provide a conversational response after using tools
2. Use the tool results to inform your response, but don't just repeat the data
3. Be encouraging and helpful in your responses
4. When showing recipes, mention how many they can make completely vs. with missing ingredients
5. When checking inventory, provide helpful context about what they have
6. If they're missing ingredients, suggest alternatives or next steps

RECIPE CREATION GUIDELINES:
- When creating recipes, base them on the user's specific query and preferences
- The system will identify missing ingredients and provide them in the response for client-side storage
- Always include reasonable nutrition information and cooking steps
- Make recipes practical and achievable
- When ingredients are missing, tell the user they'll be added to their inventory with quantity "0"

INGREDIENT CREATION GUIDELINES:
- When adding ingredients that the user doesn't have, set quantity to "0"
- Always check if an ingredient already exists before creating a new one
- Provide helpful context about where to find or buy missing ingredients
- Note that ingredient storage happens on the client side, not server side

For recipe suggestions, prioritize recipes they can actually make with their current ingredients. If they're missing ingredients, suggest alternatives or where to find them.

Keep responses concise but informative. Use emojis sparingly and only when they enhance the message.

Remember: Always generate a helpful response after using tools - don't just return the tool results.`,
        });

        return result.toDataStreamResponse();
    } catch (_error) {
        return new Response(
            JSON.stringify({
                error: 'An error occurred while processing your request.',
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
