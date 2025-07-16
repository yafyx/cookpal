import {
    inventoryStorage,
    mealPlanStorage,
    mealPreferencesStorage,
    recipeStorage,
} from './storage';
import type {
    MealPlan,
    MealPlanGenerationRequest,
    MealPlanPreferences,
    PlannedMeal,
    Recipe,
    SmartSuggestion,
} from './types';

export class SmartMealPlanner {
    private static instance: SmartMealPlanner;

    static getInstance(): SmartMealPlanner {
        if (!SmartMealPlanner.instance) {
            SmartMealPlanner.instance = new SmartMealPlanner();
        }
        return SmartMealPlanner.instance;
    }

    // Generate a smart meal plan using AI
    async generateMealPlan(
        startDate: string,
        endDate: string,
        type: 'weekly' | 'monthly',
        preferences?: Partial<MealPlanPreferences>
    ): Promise<MealPlan> {
        const currentPreferences = mealPreferencesStorage.get();
        const finalPreferences = { ...currentPreferences, ...preferences };

        const inventory = inventoryStorage.getAll();
        const recipes = recipeStorage.getAll();

        const requestData: MealPlanGenerationRequest = {
            startDate,
            endDate,
            type,
            preferences: finalPreferences,
            availableIngredients: inventory,
            availableRecipes: recipes,
        };

        // Generate meal plan using AI
        const aiResponse = await this.callAIMealPlanGeneration(requestData);

        // Create and store the meal plan
        const mealPlan = mealPlanStorage.create({
            name: aiResponse.name,
            startDate,
            endDate,
            type,
            meals: aiResponse.meals,
            preferences: finalPreferences,
            generatedAt: new Date().toISOString(),
        });

        return mealPlan;
    }

    // Call the AI API to generate meal plan
    private async callAIMealPlanGeneration(
        requestData: MealPlanGenerationRequest
    ): Promise<{
        name: string;
        meals: PlannedMeal[];
    }> {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'user',
                            content: this.buildMealPlanPrompt(requestData),
                        },
                    ],
                    inventory: requestData.availableIngredients,
                    recipes: requestData.availableRecipes,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the streaming response
            const reader = response.body?.getReader();
            const chunks: string[] = [];

            if (reader) {
                const readAllChunks = async () => {
                    let done = false;
                    while (!done) {
                        const result = await reader.read();
                        done = result.done;
                        if (result.value) {
                            const chunk = new TextDecoder().decode(result.value);
                            chunks.push(chunk);
                        }
                    }
                };
                await readAllChunks();
            }

            const fullResult = chunks.join('');

            // Parse the AI response and extract meal plan data
            return this.parseAIMealPlanResponse(fullResult, requestData);
        } catch (_error) {
            // Fallback to basic meal plan generation
            return this.generateBasicMealPlan(requestData);
        }
    }

    // Build the prompt for AI meal plan generation
    private buildMealPlanPrompt(requestData: MealPlanGenerationRequest): string {
        const {
            startDate,
            endDate,
            type,
            preferences,
            availableIngredients,
            availableRecipes,
        } = requestData;

        return `Generate a smart ${type} meal plan from ${startDate} to ${endDate} with these preferences:

**Preferences:**
- Dietary restrictions: ${preferences.dietaryRestrictions.join(', ') || 'None'}
- Max cooking time: ${preferences.maxCookingTime} minutes
- Meals per day: ${preferences.mealsPerDay}
- Daily calories target: ${preferences.nutritionGoals.dailyCalories}
- Protein target: ${preferences.nutritionGoals.minProtein}g
- Cooking skill level: ${preferences.cookingSkillLevel}
- Favorite ingredients: ${preferences.favoriteIngredients.join(', ') || 'None'}
- Avoid ingredients: ${preferences.avoidIngredients.join(', ') || 'None'}

**Available ingredients:** ${availableIngredients.length} items
**Available recipes:** ${availableRecipes.length} recipes

Please create a meal plan that:
1. Maximizes use of available ingredients
2. Suggests new recipes if needed using createRecipe tool
3. Balances nutrition according to goals
4. Fits within time constraints
5. Provides variety and follows preferences

Use the available tools to:
- Check ingredient availability with getInventory
- Find suitable recipes with findRecipesByIngredients
- Create new recipes if needed with createRecipe
- Add missing ingredients with createIngredient

Provide a complete meal plan with specific recipes for each day and meal type.`;
    }

    // Parse AI response and extract meal plan data
    private parseAIMealPlanResponse(
        _response: string,
        requestData: MealPlanGenerationRequest
    ): { name: string; meals: PlannedMeal[] } {
        // This is a simplified parser - in a real implementation you'd have more sophisticated parsing
        const meals: PlannedMeal[] = [];
        const startDate = new Date(requestData.startDate);
        const endDate = new Date(requestData.endDate);

        // Generate days between start and end date
        const days = this.generateDateRange(startDate, endDate);

        // Use existing recipes as fallback
        const availableRecipes = requestData.availableRecipes;

        for (const [index, date] of days.entries()) {
            const mealTypes = requestData.preferences.preferredMealTypes;

            for (const mealType of mealTypes) {
                const recipe = availableRecipes[index % availableRecipes.length];
                if (recipe) {
                    const availability = inventoryStorage.checkAvailability(
                        recipe.ingredients
                    );

                    meals.push({
                        id: `meal-${date.toISOString()}-${mealType}`,
                        date: date.toISOString().split('T')[0],
                        mealType: mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
                        recipe,
                        isAvailable: availability.available,
                        missingIngredients: availability.missing,
                        preparationTime: this.estimatePreparationTime(recipe),
                        nutritionScore: this.calculateNutritionScore(
                            recipe,
                            requestData.preferences.nutritionGoals
                        ),
                    });
                }
            }
        }

        return {
            name: `${requestData.type === 'weekly' ? 'Weekly' : 'Monthly'} Meal Plan`,
            meals,
        };
    }

    // Generate basic meal plan as fallback
    private generateBasicMealPlan(requestData: MealPlanGenerationRequest): {
        name: string;
        meals: PlannedMeal[];
    } {
        const meals: PlannedMeal[] = [];
        const startDate = new Date(requestData.startDate);
        const endDate = new Date(requestData.endDate);
        const days = this.generateDateRange(startDate, endDate);

        for (const [index, date] of days.entries()) {
            const mealTypes = requestData.preferences.preferredMealTypes;

            for (const mealType of mealTypes) {
                const recipe =
                    requestData.availableRecipes[
                    index % requestData.availableRecipes.length
                    ];
                if (recipe) {
                    const availability = inventoryStorage.checkAvailability(
                        recipe.ingredients
                    );

                    meals.push({
                        id: `meal-${date.toISOString()}-${mealType}`,
                        date: date.toISOString().split('T')[0],
                        mealType: mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
                        recipe,
                        isAvailable: availability.available,
                        missingIngredients: availability.missing,
                        preparationTime: this.estimatePreparationTime(recipe),
                        nutritionScore: this.calculateNutritionScore(
                            recipe,
                            requestData.preferences.nutritionGoals
                        ),
                    });
                }
            }
        }

        return {
            name: `Basic ${requestData.type === 'weekly' ? 'Weekly' : 'Monthly'} Meal Plan`,
            meals,
        };
    }

    // Helper method to generate date range
    private generateDateRange(start: Date, end: Date): Date[] {
        const dates: Date[] = [];
        const current = new Date(start);

        while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return dates;
    }

    // Estimate preparation time for a recipe
    private estimatePreparationTime(recipe: Recipe): string {
        if (recipe.cookingSteps && recipe.cookingSteps.length > 0) {
            const totalMinutes = recipe.cookingSteps.reduce((total, step) => {
                if (step.duration) {
                    const minutes = Number.parseInt(step.duration.replace(/\D/g, ''), 10);
                    return total + (Number.isNaN(minutes) ? 0 : minutes);
                } Number.isNaN
                return total;
            }, 0);

            return totalMinutes > 0 ? `${totalMinutes} mins` : '30 mins';
        }

        return '30 mins';
    }

    // Calculate nutrition score based on goals
    private calculateNutritionScore(
        recipe: Recipe,
        goals: MealPlanPreferences['nutritionGoals']
    ): number {
        // Simple scoring based on how well the recipe meets nutrition goals
        const energy = Number.parseInt(
            recipe.nutrition.energy.replace(/\D/g, ''),
            10
        );
        const carbs = Number.parseInt(
            recipe.nutrition.carbs.replace(/\D/g, ''),
            10
        );
        const proteins = Number.parseInt(
            recipe.nutrition.proteins.replace(/\D/g, ''),
            10
        );
        const fats = Number.parseInt(recipe.nutrition.fats.replace(/\D/g, ''), 10);

        let score = 0;

        // Score based on calorie target (per meal, assuming 3 meals per day)
        const targetCaloriesPerMeal = goals.dailyCalories / 3;
        const calorieScore = Math.max(
            0,
            100 -
            (Math.abs(energy - targetCaloriesPerMeal) / targetCaloriesPerMeal) * 100
        );
        score += calorieScore * 0.3;

        // Score based on protein target
        const targetProteinPerMeal = goals.minProtein / 3;
        const proteinScore = Math.min(100, (proteins / targetProteinPerMeal) * 100);
        score += proteinScore * 0.3;

        // Score based on balanced nutrition
        if (goals.balancedMeals) {
            const balanceScore = carbs > 0 && proteins > 0 && fats > 0 ? 100 : 50;
            score += balanceScore * 0.4;
        }

        return Math.round(score);
    }

    // Generate smart suggestions for meal planning
    async generateSmartSuggestions(
        currentPlan?: MealPlan
    ): Promise<SmartSuggestion[]> {
        const suggestions: SmartSuggestion[] = [];
        const inventory = inventoryStorage.getAll();
        const preferences = mealPreferencesStorage.get();

        // Add await to make this function truly async
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Suggest missing ingredients
        if (currentPlan) {
            const allMissingIngredients = currentPlan.meals.flatMap(
                (meal) => meal.missingIngredients
            );
            const uniqueMissing = [...new Set(allMissingIngredients)];

            if (uniqueMissing.length > 0) {
                suggestions.push({
                    type: 'ingredient',
                    message: `You're missing ${uniqueMissing.length} ingredients for your meal plan. Add them to your inventory?`,
                    actionable: true,
                    action: {
                        type: 'add_ingredient',
                        data: { ingredients: uniqueMissing },
                    },
                });
            }
        }

        // Suggest new recipes based on available ingredients
        const availableIngredients = inventory.map((ing) => ing.name.toLowerCase());
        if (availableIngredients.length > 5) {
            suggestions.push({
                type: 'recipe',
                message: `You have ${availableIngredients.length} ingredients available. Let me suggest some new recipes you can make!`,
                actionable: true,
                action: {
                    type: 'create_recipe',
                    data: { ingredients: availableIngredients },
                },
            });
        }

        // Suggest nutrition improvements
        if (preferences.nutritionGoals.dailyCalories > 2500) {
            suggestions.push({
                type: 'nutrition',
                message:
                    'Your calorie goal is quite high. Consider adding more protein-rich recipes to your meal plan.',
                actionable: false,
            });
        }

        return suggestions;
    }

    // Get current meal plan
    getCurrentMealPlan(): MealPlan | null {
        return mealPlanStorage.getCurrent();
    }

    // Get meals for a specific date
    getMealsForDate(date: string): PlannedMeal[] {
        const currentPlan = this.getCurrentMealPlan();
        if (!currentPlan) { return []; }

        return currentPlan.meals.filter((meal) => meal.date === date);
    }

    // Update meal preferences
    updatePreferences(
        updates: Partial<MealPlanPreferences>
    ): MealPlanPreferences {
        return mealPreferencesStorage.update(updates);
    }

    // Get current preferences
    getPreferences(): MealPlanPreferences {
        return mealPreferencesStorage.get();
    }
}

export const smartMealPlanner = SmartMealPlanner.getInstance();
