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