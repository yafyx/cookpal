import {
    initializeStorage,
    inventoryStorage,
    recipeStorage,
} from '@/lib/storage';
import type { Ingredient, Recipe } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';

export function useStorage() {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            initializeStorage();
            setInitialized(true);
        }
    }, []);

    return {
        initialized,
        inventory: inventoryStorage,
        recipes: recipeStorage,
    };
}

export function useInventory() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            initializeStorage();
            const storedIngredients = inventoryStorage.getAll();
            setIngredients(storedIngredients);
            setLoading(false);
        }
    }, []);

    const addIngredient = (ingredient: Omit<Ingredient, 'id'>) => {
        const newIngredient = inventoryStorage.create(ingredient);
        setIngredients((prev) => [newIngredient, ...prev]);
        return newIngredient;
    };

    const updateIngredient = (
        id: string,
        updates: Partial<Omit<Ingredient, 'id'>>
    ) => {
        const updatedIngredient = inventoryStorage.update(id, updates);
        if (updatedIngredient) {
            setIngredients((prev) =>
                prev.map((ingredient) =>
                    ingredient.id === id ? updatedIngredient : ingredient
                )
            );
        }
        return updatedIngredient;
    };

    const deleteIngredient = (id: string) => {
        const success = inventoryStorage.delete(id);
        if (success) {
            setIngredients((prev) =>
                prev.filter((ingredient) => ingredient.id !== id)
            );
        }
        return success;
    };

    const refreshIngredients = () => {
        const storedIngredients = inventoryStorage.getAll();
        setIngredients(storedIngredients);
    };

    return {
        ingredients,
        loading,
        addIngredient,
        updateIngredient,
        deleteIngredient,
        refreshIngredients,
    };
}

export function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            initializeStorage();
            const storedRecipes = recipeStorage.getAll();
            setRecipes(storedRecipes);
            setLoading(false);
        }
    }, []);

    const addRecipe = (recipe: Omit<Recipe, 'id'>) => {
        const newRecipe = recipeStorage.create(recipe);
        setRecipes((prev) => [newRecipe, ...prev]);
        return newRecipe;
    };

    const updateRecipe = (id: string, updates: Partial<Omit<Recipe, 'id'>>) => {
        const updatedRecipe = recipeStorage.update(id, updates);
        if (updatedRecipe) {
            setRecipes((prev) =>
                prev.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
            );
        }
        return updatedRecipe;
    };

    const deleteRecipe = (id: string) => {
        const success = recipeStorage.delete(id);
        if (success) {
            setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
        }
        return success;
    };

    const getRecipeById = useCallback((id: string) => {
        return recipeStorage.getById(id);
    }, []);

    const refreshRecipes = () => {
        const storedRecipes = recipeStorage.getAll();
        setRecipes(storedRecipes);
    };

    return {
        recipes,
        loading,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        getRecipeById,
        refreshRecipes,
    };
}
