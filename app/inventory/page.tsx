'use client';

import { InventoryPage } from '@/components/inventory';
import { useInventory } from '@/hooks/use-storage';

export default function Inventory() {
  const inventory = useInventory();

  if (inventory.loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <p className="text-gray-500">Loading inventory...</p>
      </div>
    );
  }

  return (
    <InventoryPage
      ingredients={inventory.ingredients}
      onAddIngredient={inventory.addIngredient}
      onDeleteIngredient={inventory.deleteIngredient}
      onUpdateIngredient={inventory.updateIngredient}
    />
  );
}
