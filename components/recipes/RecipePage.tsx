import { Plus } from 'lucide-react';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { MobileHeader } from '@/components/ui/mobile-header';
import type { Recipe } from '@/lib/types';
import AddRecipeDrawer from './AddRecipeDrawer';
import RecipeList from './RecipeList';

interface RecipePageProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  onUpdateRecipe?: (id: string, updates: Partial<Omit<Recipe, 'id'>>) => void;
  onDeleteRecipe?: (id: string) => void;
}

export default function RecipePage({
  recipes,
  onAddRecipe,
  onUpdateRecipe,
  onDeleteRecipe,
}: RecipePageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MobileHeader
        backHref="/recipes/manage"
        showBackButton={true}
        title="My Recipes"
      />

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* Recipe List */}
        <div className="pb-20">
          <RecipeList
            onDeleteRecipe={onDeleteRecipe}
            onUpdateRecipe={onUpdateRecipe}
            recipes={recipes}
            variant="list"
          />
        </div>

        {/* Gradient overlay for smooth transition to bottom */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[250px] bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* Floating Add Button */}
      <AddRecipeDrawer
        onAddRecipe={onAddRecipe}
        trigger={
          <button
            className="fixed right-4 bottom-25 flex items-center gap-2 rounded-lg bg-[#181d27] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 sm:right-129"
            type="button"
          >
            <Plus className="h-[18px] w-[18px]" />
            <span className="font-semibold text-[16px]">Add Recipe</span>
          </button>
        }
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
