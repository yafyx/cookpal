'use client';

import { RecipePage } from '@/components/recipe';
import { useRecipes } from '@/hooks/use-storage';

export default function ManageRecipesPage() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();

  return (
    <RecipePage
      onAddRecipe={addRecipe}
      onDeleteRecipe={deleteRecipe}
      onUpdateRecipe={updateRecipe}
      recipes={recipes}
    />
  );
}
