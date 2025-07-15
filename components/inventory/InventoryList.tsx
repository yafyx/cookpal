import type { Ingredient } from '@/lib/types';
import InventoryItem from './InventoryItem';

interface InventoryListProps {
  ingredients: Ingredient[];
  onUpdateIngredient?: (id: string, updates: Partial<Omit<Ingredient, 'id'>>) => void;
  onDeleteIngredient?: (id: string) => void;
}

export default function InventoryList({ 
  ingredients,
  onUpdateIngredient,
  onDeleteIngredient 
}: InventoryListProps) {
  return (
    <div className="flex flex-col gap-1">
      {ingredients.map((ingredient) => (
        <InventoryItem 
          key={ingredient.id}
          ingredient={ingredient}
          onUpdate={onUpdateIngredient}
          onDelete={onDeleteIngredient}
        />
      ))}
    </div>
  );
}
