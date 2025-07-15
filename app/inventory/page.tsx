'use client';

import { InventoryPage } from '@/components/inventory';
import { useInventory } from '@/hooks/use-storage';

export default function Inventory() {
  const { 
    ingredients, 
    loading,
    addIngredient, 
    updateIngredient, 
    deleteIngredient 
  } = useInventory();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white items-center justify-center">
        <p className="text-gray-500">Loading inventory...</p>
      </div>
    );
  }

  return (
    <InventoryPage
      ingredients={ingredients}
      onAddIngredient={addIngredient}
      onUpdateIngredient={updateIngredient}
      onDeleteIngredient={deleteIngredient}
    />
  );
}
