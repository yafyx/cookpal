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
    date: string // YYYY-MM-DD
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
    recipe: Recipe
    isAvailable?: boolean
    missingIngredients?: string[]
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

// Health Integration Types
export interface HealthData {
    steps: number
    caloriesBurned: number
    heartRate: number
    workoutDuration: number // in minutes
    lastWorkoutTime: string
    workoutType: WorkoutType
    sleepHours?: number
    activeMinutes: number
}

export interface UserProfile {
    id: string
    name: string
    email: string
    avatar?: string
    joinDate: string
    healthAppsConnected: HealthAppConnections
    nutritionGoals: NutritionGoals
    dietaryPreferences: DietaryPreferences
    activityLevel: ActivityLevel
    healthMetrics: HealthMetrics
}

export interface HealthAppConnections {
    googleFit: boolean
    appleHealth: boolean
    strava?: boolean
}

export interface DietaryPreferences {
    restrictions: string[] // 'vegetarian', 'vegan', 'gluten-free', etc.
    allergies: string[]
    favoriteIngredients: string[]
    dislikedIngredients: string[]
    culturalPreferences: string[] // 'mediterranean', 'asian', etc.
}

export interface HealthMetrics {
    currentWeight?: number
    targetWeight?: number
    height?: number
    age?: number
    bmi?: number
    bodyFatPercentage?: number
}

export interface SmartMealSuggestion {
    id: string
    mealName: string
    suggestedFor: MealSuggestionReason
    recipe: Recipe
    nutritionalBenefits: string[]
    timing: {
        optimal: string // 'pre-workout', 'post-workout', 'breakfast', etc.
        reason: string
    }
    healthScore: number // 1-10 rating
    matchedGoals: string[] // which nutrition goals this helps with
}

export interface ActivityContext {
    lastWorkout: {
        type: WorkoutType
        duration: number
        intensity: WorkoutIntensity
        completedAt: string
        caloriesBurned: number
    }
    upcomingWorkout?: {
        scheduledAt: string
        type: WorkoutType
        estimatedDuration: number
    }
    dailyActivity: {
        steps: number
        activeMinutes: number
        sedentaryMinutes: number
    }
}

export type WorkoutType =
    | 'cardio'
    | 'strength'
    | 'yoga'
    | 'pilates'
    | 'running'
    | 'cycling'
    | 'swimming'
    | 'hiit'
    | 'crossfit'
    | 'walking'
    | 'other'

export type WorkoutIntensity = 'low' | 'moderate' | 'high' | 'very-high'

export type ActivityLevel = 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active'

export type MealSuggestionReason =
    | 'post-workout-recovery'
    | 'pre-workout-energy'
    | 'weight-loss'
    | 'muscle-building'
    | 'endurance-boost'
    | 'heart-health'
    | 'immune-support'
    | 'energy-boost'
    | 'sleep-quality'

export interface HealthNotification {
    id: string
    type: 'meal-suggestion' | 'hydration-reminder' | 'workout-detected' | 'goal-achieved'
    title: string
    message: string
    actionable: boolean
    action?: {
        label: string
        type: 'view-recipe' | 'log-meal' | 'adjust-goals' | 'plan-meal'
        data: Record<string, any>
    }
    createdAt: string
    read: boolean
}