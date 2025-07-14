import type { Ingredient } from '@/lib/types';
import InventoryItem from './InventoryItem';

interface InventoryListProps {
  ingredients: Ingredient[];
}

export default function InventoryList({ ingredients }: InventoryListProps) {
  return (
    <div className="flex flex-col gap-3">
      {ingredients.map((ingredient) => (
        <InventoryItem ingredient={ingredient} key={ingredient.id} />
      ))}
    </div>
  );
}
