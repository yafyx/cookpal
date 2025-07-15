import { MobileHeader } from '@/components/ui/mobile-header';
import type { Ingredient } from '@/lib/types';
import { Plus } from 'lucide-react';
import BottomNavigation from '../ui/bottom-navigation';
import AddIngredientDrawer from './AddIngredientDrawer';
import InventoryList from './InventoryList';

interface InventoryPageProps {
  ingredients: Ingredient[];
  onAddIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
  onUpdateIngredient?: (
    id: string,
    updates: Partial<Omit<Ingredient, 'id'>>
  ) => void;
  onDeleteIngredient?: (id: string) => void;
}

export default function InventoryPage({
  ingredients,
  onAddIngredient,
  onUpdateIngredient,
  onDeleteIngredient,
}: InventoryPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MobileHeader
        backHref="/recipes"
        showBackButton={true}
        title="Inventory"
      />

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* Inventory List */}
        <div className="pb-20">
          <InventoryList
            ingredients={ingredients}
            onDeleteIngredient={onDeleteIngredient}
            onUpdateIngredient={onUpdateIngredient}
          />
        </div>

        {/* Gradient overlay for smooth transition to bottom */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[250px] bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* Floating Add Button */}
      <AddIngredientDrawer
        onAddIngredient={onAddIngredient}
        trigger={
          <button
            className="fixed right-4 bottom-25 flex items-center gap-2 rounded-lg bg-[#181d27] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 sm:right-129"
            type="button"
          >
            <Plus className="h-[18px] w-[18px]" />
            <span className="font-semibold text-[16px]">Add</span>
          </button>
        }
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
