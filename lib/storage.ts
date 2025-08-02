import type {
    Ingredient,
    MealPlan,
    MealPlanPreferences,
    Recipe,
} from './types';

const STORAGE_KEYS = {
    INVENTORY: 'cookpal_inventory',
    RECIPES: 'cookpal_recipes',
    MEAL_PLANS: 'cookpal_meal_plans',
    MEAL_PREFERENCES: 'cookpal_meal_preferences',
} as const;

// Default burger recipe
const DEFAULT_BURGER_RECIPE: Recipe = {
    id: 'burger-1',
    name: 'Classic Beef Burger',
    creator: 'CookPal',
    image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=375&h=362&fit=crop&crop=center',
    description:
        'A delicious homemade beef burger with crispy lettuce, fresh tomato, and cheddar cheese on a toasted potato bun. Perfect for lunch or dinner.',
    nutrition: {
        energy: '749Kcal',
        carbs: '36g',
        proteins: '52g',
        fats: '44g',
    },
    ingredients: [
        {
            id: 'bun-1',
            name: 'Potato Bun',
            quantity: '2 pieces',
            image: '/assets/ingredients/bun.png',
        },
        {
            id: 'cheese-1',
            name: 'Cheddar Cheese',
            quantity: '2 slices',
            image: '/assets/ingredients/cheddarcheese.png',
        },
        {
            id: 'beef-1',
            name: 'Beef Patty',
            quantity: '150g',
            image: '/assets/ingredients/brisket.png',
        },
        {
            id: 'lettuce-1',
            name: 'Lettuce',
            quantity: '2 leaves',
            image: '/assets/ingredients/lettuce.png',
        },
        {
            id: 'tomato-1',
            name: 'Tomato',
            quantity: '3 slices',
            image: '/assets/ingredients/tomato.png',
        },
        {
            id: 'onion-1',
            name: 'Red Onion',
            quantity: '2 slices',
            image: '/assets/ingredients/redonion.png',
        },
    ],
    cookingSteps: [
        {
            id: 'step-1',
            step: 1,
            instruction: 'Preheat your grill or pan to medium-high heat.',
            duration: '2 mins',
        },
        {
            id: 'step-2',
            step: 2,
            instruction: 'Season the beef patty with salt and pepper on both sides.',
            duration: '1 min',
        },
        {
            id: 'step-3',
            step: 3,
            instruction:
                'Cook the beef patty for 4-5 minutes per side until desired doneness.',
            duration: '10 mins',
        },
        {
            id: 'step-4',
            step: 4,
            instruction: 'Toast the potato buns lightly on the grill.',
            duration: '2 mins',
        },
        {
            id: 'step-5',
            step: 5,
            instruction:
                'Assemble the burger: bottom bun, lettuce, tomato, beef patty, cheese, onion, top bun.',
            duration: '3 mins',
        },
    ],
};

// Garlic Roasted Chicken recipe
const DEFAULT_ROASTED_CHICKEN_RECIPE: Recipe = {
    id: 'roasted-chicken-1',
    name: 'Garlic Roasted Chicken',
    creator: 'CookPal',
    image: '/assets/fcroasted.png',
    description:
        'Succulent chicken pieces roasted with whole garlic cloves and aromatic herbs. The garlic becomes sweet and caramelized, creating a rich, flavorful dish perfect for family dinners.',
    nutrition: {
        energy: '485Kcal',
        carbs: '8g',
        proteins: '42g',
        fats: '32g',
    },
    ingredients: [
        {
            id: 'chicken-thighs-1',
            name: 'Chicken Thighs',
            quantity: '8 pieces',
            image: '/assets/ingredients/brisket.png',
        },
        {
            id: 'garlic-1',
            name: 'Garlic Cloves',
            quantity: '20 cloves',
            image: '/assets/ingredients/redonion.png',
        },
        {
            id: 'rosemary-1',
            name: 'Fresh Rosemary',
            quantity: '4 sprigs',
            image: '/assets/ingredients/lettuce.png',
        },
        {
            id: 'thyme-1',
            name: 'Fresh Thyme',
            quantity: '6 sprigs',
            image: '/assets/ingredients/lettuce.png',
        },
        {
            id: 'olive-oil-1',
            name: 'Olive Oil',
            quantity: '3 tbsp',
            image: '/assets/ingredients/brisket.png',
        },
        {
            id: 'bread-1',
            name: 'Crusty Bread',
            quantity: '4 slices',
            image: '/assets/ingredients/bun.png',
        },
    ],
    cookingSteps: [
        {
            id: 'step-1',
            step: 1,
            instruction: 'Preheat oven to 400°F (200°C).',
            duration: '5 mins',
        },
        {
            id: 'step-2',
            step: 2,
            instruction: 'Season chicken thighs with salt, pepper, and herbs.',
            duration: '3 mins',
        },
        {
            id: 'step-3',
            step: 3,
            instruction: 'Arrange chicken and whole garlic cloves in a roasting pan.',
            duration: '2 mins',
        },
        {
            id: 'step-4',
            step: 4,
            instruction: 'Drizzle with olive oil and roast for 45-50 minutes.',
            duration: '45 mins',
        },
        {
            id: 'step-5',
            step: 5,
            instruction: 'Serve with crusty bread to soak up the juices.',
            duration: '2 mins',
        },
    ],
};

// Pasta Carbonara recipe
const DEFAULT_CARBONARA_RECIPE: Recipe = {
    id: 'carbonara-1',
    name: 'Classic Pasta Carbonara',
    creator: 'CookPal',
    image: '/assets/pastacarbonara.png',
    description:
        'Authentic Italian pasta carbonara with creamy egg sauce, crispy pancetta, and freshly grated Parmesan cheese. A simple yet elegant dish that showcases the beauty of Italian cuisine.',
    nutrition: {
        energy: '620Kcal',
        carbs: '65g',
        proteins: '28g',
        fats: '32g',
    },
    ingredients: [
        {
            id: 'spaghetti-1',
            name: 'Spaghetti',
            quantity: '400g',
            image: '/assets/ingredients/bun.png',
        },
        {
            id: 'pancetta-1',
            name: 'Pancetta',
            quantity: '150g',
            image: '/assets/ingredients/brisket.png',
        },
        {
            id: 'eggs-1',
            name: 'Large Eggs',
            quantity: '4 pieces',
            image: '/assets/ingredients/brisket.png',
        },
        {
            id: 'parmesan-1',
            name: 'Parmesan Cheese',
            quantity: '100g',
            image: '/assets/ingredients/cheddarcheese.png',
        },
        {
            id: 'black-pepper-1',
            name: 'Black Pepper',
            quantity: '2 tsp',
            image: '/assets/ingredients/redonion.png',
        },
        {
            id: 'garlic-2',
            name: 'Garlic Cloves',
            quantity: '2 cloves',
            image: '/assets/ingredients/redonion.png',
        },
    ],
    cookingSteps: [
        {
            id: 'step-1',
            step: 1,
            instruction: 'Bring a large pot of salted water to boil for pasta.',
            duration: '5 mins',
        },
        {
            id: 'step-2',
            step: 2,
            instruction: 'Cook pancetta in a large skillet until crispy.',
            duration: '8 mins',
        },
        {
            id: 'step-3',
            step: 3,
            instruction: 'Cook spaghetti according to package directions.',
            duration: '10 mins',
        },
        {
            id: 'step-4',
            step: 4,
            instruction: 'Whisk eggs, cheese, and pepper in a bowl.',
            duration: '2 mins',
        },
        {
            id: 'step-5',
            step: 5,
            instruction: 'Combine hot pasta with egg mixture and pancetta.',
            duration: '3 mins',
        },
    ],
};

// Surf & Turf recipe
const DEFAULT_SURF_TURF_RECIPE: Recipe = {
    id: 'surf-turf-1',
    name: 'Surf & Turf',
    creator: 'CookPal',
    image: '/assets/surfnturf.png',
    description:
        'A luxurious combination of perfectly grilled steak and succulent seafood. This classic surf and turf dish is perfect for special occasions and romantic dinners.',
    nutrition: {
        energy: '680Kcal',
        carbs: '12g',
        proteins: '58g',
        fats: '45g',
    },
    ingredients: [
        {
            id: 'steak-1',
            name: 'Ribeye Steak',
            quantity: '250g',
            image: '/assets/ingredients/brisket.png',
        },
        {
            id: 'shrimp-1',
            name: 'Large Shrimp',
            quantity: '8 pieces',
            image: '/assets/ingredients/brisket.png',
        },
        {
            id: 'garlic-3',
            name: 'Garlic Cloves',
            quantity: '4 cloves',
            image: '/assets/ingredients/redonion.png',
        },
        {
            id: 'butter-1',
            name: 'Butter',
            quantity: '3 tbsp',
            image: '/assets/ingredients/cheddarcheese.png',
        },
        {
            id: 'lemon-1',
            name: 'Lemon',
            quantity: '1 piece',
            image: '/assets/ingredients/tomato.png',
        },
        {
            id: 'herbs-1',
            name: 'Fresh Herbs',
            quantity: '2 tbsp',
            image: '/assets/ingredients/lettuce.png',
        },
    ],
    cookingSteps: [
        {
            id: 'step-1',
            step: 1,
            instruction: 'Season steak with salt and pepper, let rest at room temperature.',
            duration: '30 mins',
        },
        {
            id: 'step-2',
            step: 2,
            instruction: 'Preheat grill or cast iron skillet to high heat.',
            duration: '5 mins',
        },
        {
            id: 'step-3',
            step: 3,
            instruction: 'Grill steak to desired doneness (4-5 minutes per side for medium-rare).',
            duration: '10 mins',
        },
        {
            id: 'step-4',
            step: 4,
            instruction: 'Cook shrimp with garlic and butter until pink and opaque.',
            duration: '4 mins',
        },
        {
            id: 'step-5',
            step: 5,
            instruction: 'Serve steak and shrimp together with lemon wedges and fresh herbs.',
            duration: '2 mins',
        },
    ],
};

// Default inventory items
const DEFAULT_INVENTORY: Ingredient[] = [
    {
        id: 'inv-1',
        name: 'Lettuce',
        quantity: '4 leaves',
        image: '/assets/ingredients/lettuce.png',
    },
    {
        id: 'inv-2',
        name: 'Red Onion',
        quantity: '2 pieces',
        image: '/assets/ingredients/redonion.png',
    },
    {
        id: 'inv-3',
        name: 'Tomato',
        quantity: '4 pieces',
        image: '/assets/ingredients/tomato.png',
    },
    {
        id: 'inv-4',
        name: 'Cucumber',
        quantity: '2 pieces',
        image: '/assets/ingredients/cucumber.png',
    },
    {
        id: 'inv-5',
        name: 'Potato Bun',
        quantity: '6 pieces',
        image: '/assets/ingredients/bun.png',
    },
    {
        id: 'inv-6',
        name: 'Cheddar Cheese',
        quantity: '8 slices',
        image: '/assets/ingredients/cheddarcheese.png',
    },
    {
        id: 'inv-7',
        name: 'Beef Patty',
        quantity: '4 pieces',
        image: '/assets/ingredients/brisket.png',
    },
    {
        id: 'inv-8',
        name: 'Chicken Thighs',
        quantity: '8 pieces',
        image: '/assets/ingredients/brisket.png',
    },
    {
        id: 'inv-9',
        name: 'Garlic Cloves',
        quantity: '30 cloves',
        image: '/assets/ingredients/redonion.png',
    },
    {
        id: 'inv-10',
        name: 'Spaghetti',
        quantity: '500g',
        image: '/assets/ingredients/bun.png',
    },
    {
        id: 'inv-11',
        name: 'Pancetta',
        quantity: '200g',
        image: '/assets/ingredients/brisket.png',
    },
    {
        id: 'inv-12',
        name: 'Large Eggs',
        quantity: '12 pieces',
        image: '/assets/ingredients/brisket.png',
    },
    {
        id: 'inv-13',
        name: 'Parmesan Cheese',
        quantity: '150g',
        image: '/assets/ingredients/cheddarcheese.png',
    },
    {
        id: 'inv-14',
        name: 'Ribeye Steak',
        quantity: '2 pieces',
        image: '/assets/ingredients/brisket.png',
    },
    {
        id: 'inv-15',
        name: 'Large Shrimp',
        quantity: '16 pieces',
        image: '/assets/ingredients/brisket.png',
    },
];

// Default meal plan preferences
const DEFAULT_MEAL_PREFERENCES: MealPlanPreferences = {
    dietaryRestrictions: [],
    maxCookingTime: 60,
    mealsPerDay: 3,
    nutritionGoals: {
        dailyCalories: 2000,
        maxCarbs: 250,
        minProtein: 50,
        maxFats: 65,
        balancedMeals: true,
    },
    favoriteIngredients: [],
    avoidIngredients: [],
    preferredMealTypes: ['lunch', 'dinner'],
    cookingSkillLevel: 'intermediate',
};

// Utility functions for local storage
function getFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') {
        return defaultValue;
    }

    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (_error) {
        return defaultValue;
    }
}

function _setInStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {
        // console.error('Failed to set item in local storage:', _error);
    }
}

// Initialize default data if not exists
function initializeDefaultData(): void {
    if (typeof window === 'undefined') {
        return;
    }

    const existingInventory = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    const existingRecipes = localStorage.getItem(STORAGE_KEYS.RECIPES);

    if (!existingInventory) {
        _setInStorage(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY);
    }

    if (!existingRecipes) {
        _setInStorage(STORAGE_KEYS.RECIPES, [DEFAULT_BURGER_RECIPE, DEFAULT_ROASTED_CHICKEN_RECIPE, DEFAULT_CARBONARA_RECIPE, DEFAULT_SURF_TURF_RECIPE]);
    }
}

// Recipe CRUD operations
export const recipeStorage = {
    getAll: (): Recipe[] => {
        const recipes = getFromStorage(STORAGE_KEYS.RECIPES, [
            DEFAULT_BURGER_RECIPE,
            DEFAULT_ROASTED_CHICKEN_RECIPE,
            DEFAULT_CARBONARA_RECIPE,
            DEFAULT_SURF_TURF_RECIPE,
        ]);
        return recipes;
    },

    getById: (id: string): Recipe | null => {
        const recipes = recipeStorage.getAll();
        return recipes.find((recipe) => recipe.id === id) || null;
    },

    create: (recipe: Omit<Recipe, 'id'>): Recipe => {
        const newRecipe: Recipe = {
            ...recipe,
            id: `recipe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };

        const recipes = recipeStorage.getAll();
        const updatedRecipes = [newRecipe, ...recipes];
        _setInStorage(STORAGE_KEYS.RECIPES, updatedRecipes);

        return newRecipe;
    },

    update: (id: string, updates: Partial<Omit<Recipe, 'id'>>): Recipe | null => {
        const recipes = recipeStorage.getAll();
        const index = recipes.findIndex((recipe) => recipe.id === id);

        if (index === -1) {
            return null;
        }

        const updatedRecipe = { ...recipes[index], ...updates };
        recipes[index] = updatedRecipe;
        _setInStorage(STORAGE_KEYS.RECIPES, recipes);

        return updatedRecipe;
    },

    delete: (id: string): boolean => {
        const recipes = recipeStorage.getAll();
        const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);

        if (filteredRecipes.length === recipes.length) {
            return false;
        }

        _setInStorage(STORAGE_KEYS.RECIPES, filteredRecipes);
        return true;
    },
};

// Inventory CRUD operations
export const inventoryStorage = {
    getAll: (): Ingredient[] => {
        const inventory = getFromStorage(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY);
        return inventory;
    },

    getById: (id: string): Ingredient | null => {
        const inventory = inventoryStorage.getAll();
        return inventory.find((ingredient) => ingredient.id === id) || null;
    },

    create: (ingredient: Omit<Ingredient, 'id'>): Ingredient => {
        const newIngredient: Ingredient = {
            ...ingredient,
            id: `inv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            image:
                ingredient.image ||
                'https://images.unsplash.com/photo-1518937669666-7db0b5d2c6bb?w=100&h=100&fit=crop&crop=center',
        };

        const inventory = inventoryStorage.getAll();
        const updatedInventory = [newIngredient, ...inventory];
        _setInStorage(STORAGE_KEYS.INVENTORY, updatedInventory);

        return newIngredient;
    },

    update: (
        id: string,
        updates: Partial<Omit<Ingredient, 'id'>>
    ): Ingredient | null => {
        const inventory = inventoryStorage.getAll();
        const index = inventory.findIndex((ingredient) => ingredient.id === id);

        if (index === -1) {
            return null;
        }

        const updatedIngredient = { ...inventory[index], ...updates };
        inventory[index] = updatedIngredient;
        _setInStorage(STORAGE_KEYS.INVENTORY, inventory);

        return updatedIngredient;
    },

    delete: (id: string): boolean => {
        const inventory = inventoryStorage.getAll();
        const filteredInventory = inventory.filter(
            (ingredient) => ingredient.id !== id
        );

        if (filteredInventory.length === inventory.length) {
            return false;
        }

        _setInStorage(STORAGE_KEYS.INVENTORY, filteredInventory);
        return true;
    },

    // Helper method to check if an ingredient is available for a recipe
    checkAvailability: (
        recipeIngredients: Recipe['ingredients']
    ): { available: boolean; missing: string[] } => {
        const inventory = inventoryStorage.getAll();
        const missing: string[] = [];

        for (const recipeIngredient of recipeIngredients) {
            const inventoryItem = inventory.find(
                (inv) => inv.name.toLowerCase() === recipeIngredient.name.toLowerCase()
            );

            if (!inventoryItem) {
                missing.push(recipeIngredient.name);
            }
        }

        return {
            available: missing.length === 0,
            missing,
        };
    },
};

// Meal Plan CRUD operations
export const mealPlanStorage = {
    getAll: (): MealPlan[] => {
        const mealPlans = getFromStorage(STORAGE_KEYS.MEAL_PLANS, []);
        return mealPlans;
    },

    getById: (id: string): MealPlan | null => {
        const mealPlans = mealPlanStorage.getAll();
        return mealPlans.find((plan) => plan.id === id) || null;
    },

    getCurrent: (): MealPlan | null => {
        const mealPlans = mealPlanStorage.getAll();
        const now = new Date();

        return (
            mealPlans.find((plan) => {
                const startDate = new Date(plan.startDate);
                const endDate = new Date(plan.endDate);
                return now >= startDate && now <= endDate;
            }) || null
        );
    },

    create: (plan: Omit<MealPlan, 'id'>): MealPlan => {
        const newPlan: MealPlan = {
            ...plan,
            id: `meal-plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };

        const mealPlans = mealPlanStorage.getAll();
        const updatedPlans = [newPlan, ...mealPlans];
        _setInStorage(STORAGE_KEYS.MEAL_PLANS, updatedPlans);

        return newPlan;
    },

    update: (
        id: string,
        updates: Partial<Omit<MealPlan, 'id'>>
    ): MealPlan | null => {
        const mealPlans = mealPlanStorage.getAll();
        const index = mealPlans.findIndex((plan) => plan.id === id);

        if (index === -1) {
            return null;
        }

        const updatedPlan = { ...mealPlans[index], ...updates };
        mealPlans[index] = updatedPlan;
        _setInStorage(STORAGE_KEYS.MEAL_PLANS, mealPlans);

        return updatedPlan;
    },

    delete: (id: string): boolean => {
        const mealPlans = mealPlanStorage.getAll();
        const filteredPlans = mealPlans.filter((plan) => plan.id !== id);

        if (filteredPlans.length === mealPlans.length) {
            return false;
        }

        _setInStorage(STORAGE_KEYS.MEAL_PLANS, filteredPlans);
        return true;
    },
};

// Meal Preferences CRUD operations
export const mealPreferencesStorage = {
    get: (): MealPlanPreferences => {
        const preferences = getFromStorage(
            STORAGE_KEYS.MEAL_PREFERENCES,
            DEFAULT_MEAL_PREFERENCES
        );
        return preferences;
    },

    update: (updates: Partial<MealPlanPreferences>): MealPlanPreferences => {
        const currentPreferences = mealPreferencesStorage.get();
        const updatedPreferences = { ...currentPreferences, ...updates };
        _setInStorage(STORAGE_KEYS.MEAL_PREFERENCES, updatedPreferences);
        return updatedPreferences;
    },

    reset: (): MealPlanPreferences => {
        _setInStorage(STORAGE_KEYS.MEAL_PREFERENCES, DEFAULT_MEAL_PREFERENCES);
        return DEFAULT_MEAL_PREFERENCES;
    },
};

// Initialize data on first load
export const initializeStorage = initializeDefaultData;

// Export storage keys for external use if needed
export { STORAGE_KEYS };
