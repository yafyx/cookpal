'use client';

import { AddIngredientForm } from '@/components/inventory';
import type { Ingredient } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function AddInventoryPage() {
  const router = useRouter();

  const handleAddIngredient = (_ingredient: Omit<Ingredient, 'id'>) => {
    // For now, just navigate back to inventory
    router.push('/inventory');
  };

  const handleClose = () => {
    router.push('/inventory');
  };

  return (
    <div className="min-h-screen bg-white">
      <AddIngredientForm
        onAddIngredient={handleAddIngredient}
        onClose={handleClose}
      />
    </div>
  );
}
