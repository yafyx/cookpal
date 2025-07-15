/** biome-ignore-all lint/suspicious/useAwait: <explanation> */

import { inventoryStorage, recipeStorage } from '@/lib/storage';
import { google } from '@ai-sdk/google';
import { convertToCoreMessages, streamText, tool } from 'ai';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: google('gemini-2.0-flash'),
            messages: convertToCoreMessages(messages),
            tools: {
                getInventory: tool({
                    description: "Get the user's current inventory of ingredients",
                    parameters: z.object({}),
                    execute: async () => {
                        const inventory = inventoryStorage.getAll();
                        return {
                            inventory,
                            message: `Found ${inventory.length} ingredients in your inventory.`,
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
                            message: `Found ${recipes.length} recipes available.`,
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
                                message: `Recipe with ID ${id} not found.`,
                            };
                        }
                        return {
                            recipe,
                            message: `Found recipe: ${recipe.name}`,
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
                                message: `Recipe with ID ${recipeId} not found.`,
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
                            message: canMake
                                ? `You have all ingredients to make ${recipe.name}!`
                                : `You're missing ${missingIngredients.length} ingredients: ${missingIngredients.join(', ')}`,
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

                        const possibleRecipes = recipes.filter((recipe) => {
                            const recipeIngredients = recipe.ingredients.map((ing) =>
                                ing.name.toLowerCase()
                            );

                            // If specific ingredients provided, check if recipe uses them
                            if (ingredients && ingredients.length > 0) {
                                const hasRequestedIngredients = ingredients.some((ingredient) =>
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

                        return {
                            recipes: possibleRecipes,
                            message: `Found ${possibleRecipes.length} recipes you can make${ingredients ? ` with ${ingredients.join(', ')}` : ''}.`,
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
                                message: `Ingredient with ID ${id} not found.`,
                            };
                        }
                        return {
                            ingredient,
                            message: `Found ingredient: ${ingredient.name} (${ingredient.quantity})`,
                        };
                    },
                }),
            },
            system: `You are CookPal, a helpful cooking assistant. You help users with:
        - Managing their ingredient inventory
        - Finding recipes they can make with available ingredients
        - Providing cooking tips and suggestions
        - Helping with meal planning

        Always be friendly, helpful, and specific in your responses. When users ask about ingredients or recipes, use the available tools to check their current inventory and recipe database.

        For recipe suggestions, prioritize recipes they can actually make with their current ingredients. If they're missing ingredients, suggest alternatives or where to find them.

        Keep responses concise but informative. Use emojis sparingly and only when they enhance the message.`,
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
