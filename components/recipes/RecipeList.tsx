import type { Recipe } from '@/lib/types';
import RecipeItem from './RecipeItem';

interface RecipeListProps {
  recipes: Recipe[];
  onUpdateRecipe?: (id: string, updates: Partial<Omit<Recipe, 'id'>>) => void;
  onDeleteRecipe?: (id: string) => void;
  variant?: 'list' | 'card';
}

export default function RecipeList({
  recipes,
  onUpdateRecipe,
  onDeleteRecipe,
  variant = 'list',
}: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-gray-300 border-dashed">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No recipes yet</p>
          <p className="mt-1 text-gray-400 text-sm">
            Add your first recipe to get started
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {recipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            onDelete={onDeleteRecipe}
            onUpdate={onUpdateRecipe}
            recipe={recipe}
            variant="card"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          onDelete={onDeleteRecipe}
          onUpdate={onUpdateRecipe}
          recipe={recipe}
          variant="list"
        />
      ))}
    </div>
  );
}
