export interface Recipe {
    id: string
    name: string
    creator: string
    image: string
    description: string
    nutrition: {
        energy: string
        carbs: string
        proteins: string
        fats: string
    }
    ingredients: Array<{
        id: string
        name: string
        quantity: string
        image: string
    }>
    cookingSteps?: CookingStep[]
}

export interface Ingredient {
    id: string
    name: string
    quantity: string
    image: string
}

export interface CookingStep {
    id: string
    step: number
    instruction: string
    duration?: string
}

// Smart Calendar & Meal Planning Types
export interface MealPlan {
    id: string
    name: string
    startDate: string
    endDate: string
    type: 'weekly' | 'monthly'
    meals: Meal[]
    preferences: MealPlanPreferences
    generatedAt: string
}

export interface Meal {
    id: string
    date: string
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
    recipe: Recipe
    isAvailable: boolean
    missingIngredients: string[]
    preparationTime: string
    nutritionScore: number
}

export interface MealPlanPreferences {
    dietaryRestrictions: string[]
    maxCookingTime: number // in minutes
    mealsPerDay: number
    nutritionGoals: NutritionGoals
    favoriteIngredients: string[]
    avoidIngredients: string[]
    preferredMealTypes: string[]
    cookingSkillLevel: 'beginner' | 'intermediate' | 'advanced'
}

export interface NutritionGoals {
    dailyCalories: number
    maxCarbs: number // grams
    minProtein: number // grams
    maxFats: number // grams
    balancedMeals: boolean
}

export interface MealPlanGenerationRequest {
    startDate: string
    endDate: string
    type: 'weekly' | 'monthly'
    preferences: MealPlanPreferences
    availableIngredients: Ingredient[]
    availableRecipes: Recipe[]
}

export interface SmartSuggestion {
    type: 'ingredient' | 'recipe' | 'nutrition' | 'time'
    message: string
    actionable: boolean
    action?: {
        type: 'add_ingredient' | 'create_recipe' | 'adjust_nutrition' | 'change_time'
        data: Record<string, unknown>
    }
} 