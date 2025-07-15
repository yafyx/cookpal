/** biome-ignore-all lint/suspicious/useAwait: <explanation> */

import { inventoryStorage, recipeStorage } from '@/lib/storage';
import type { Recipe } from '@/lib/types';
import { google } from '@ai-sdk/google';
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
        const { messages } = await req.json();

        const result = streamText({
            model: google('gemini-2.5-flash'),
            messages,
            maxSteps: 5, // Allow multiple steps for tool calling
            tools: {
                getInventory: tool({
                    description: "Get the user's current inventory of ingredients",
                    parameters: z.object({}),
                    execute: async () => {
                        const inventory = inventoryStorage.getAll();
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
                        const recipes = recipeStorage.getAll();
                        return {
                            recipes,
                            count: recipes.length,
                        };
                    },
                }),
                getRecipeById: tool({
                    description: 'Get a specific recipe by its ID',
                    parameters: z.object({
                        id: z.string().describe('The recipe ID'),
                    }),
                    execute: async ({ id }) => {
                        const recipe = recipeStorage.getById(id);
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
                        const recipe = recipeStorage.getById(recipeId);
                        if (!recipe) {
                            return {
                                canMake: false,
                                error: `Recipe with ID ${recipeId} not found`,
                                missingIngredients: [],
                            };
                        }

                        const inventory = inventoryStorage.getAll();
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
                        const inventory = inventoryStorage.getAll();
                        const recipes = recipeStorage.getAll();
                        const availableIngredients = inventory.map((item) =>
                            item.name.toLowerCase()
                        );

                        const possibleRecipes = filterRecipesByIngredients(
                            recipes,
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
                        const ingredient = inventoryStorage.getById(id);
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
            },
            system: `You are CookPal, a helpful cooking assistant. You help users with:
- Managing their ingredient inventory
- Finding recipes they can make with available ingredients
- Providing cooking tips and suggestions
- Helping with meal planning

IMPORTANT INSTRUCTIONS:
1. Always provide a conversational response after using tools
2. Use the tool results to inform your response, but don't just repeat the data
3. Be encouraging and helpful in your responses
4. When showing recipes, mention how many they can make completely vs. with missing ingredients
5. When checking inventory, provide helpful context about what they have
6. If they're missing ingredients, suggest alternatives or next steps

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
