'use client';

import IngredientItem from '@/components/dashboard/IngredientItem';
import RecipeCard from '@/components/dashboard/RecipeCard';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { MobileHeader } from '@/components/ui/mobile-header';
import { useInventory, useRecipes } from '@/hooks/use-storage';
import { inventoryStorage } from '@/lib/storage';
import { HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { ingredients, loading: inventoryLoading } = useInventory();
  const { recipes, loading: recipesLoading } = useRecipes();
  const [missingIngredients, setMissingIngredients] = useState<string[]>([]);

  useEffect(() => {
    // Check for missing ingredients for the first recipe
    if (recipes.length > 0 && !recipesLoading) {
      const firstRecipe = recipes[0];
      const { missing } = inventoryStorage.checkAvailability(firstRecipe.ingredients);
      setMissingIngredients(missing);
    }
  }, [recipes, recipesLoading]);

  // Get ingredients that are missing for recipes (limit to first 3)
  const missingIngredientsData = ingredients
    .filter(ingredient => 
      missingIngredients.some(missing => 
        missing.toLowerCase() === ingredient.name.toLowerCase()
      )
    )
    .slice(0, 3);

  const loading = inventoryLoading || recipesLoading;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <MobileHeader
          logo={
            <Image
              alt="CookPal"
              className="h-8 w-auto"
              height={32}
              priority
              src="/cookpal.svg"
              width={120}
            />
          }
          showSearch
        />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
        <BottomNavigation activeTab="home" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <MobileHeader
        logo={
          <Image
            alt="CookPal"
            className="h-8 w-auto"
            height={32}
            priority
            src="/cookpal.svg"
            width={120}
          />
        }
        showSearch
      />

      {/* Main Content */}
      <div className="flex-1 space-y-6 px-4">
        {/* Main Title */}
        <h1 className="font-semibold text-2xl text-[#181d27] tracking-tight">
          What dish you wish to cook today?
        </h1>

        {/* Recipe Cards Carousel */}
        <div className="flex gap-2 overflow-x-auto">
          {recipes.length > 0 ? (
            recipes.slice(0, 3).map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                backgroundImage={recipe.image}
                duration="30m"
                title={recipe.name}
              />
            ))
          ) : (
            <div className="flex h-[200px] w-[330px] items-center justify-center rounded-3xl bg-gray-100">
              <p className="text-gray-500">No recipes available</p>
            </div>
          )}
        </div>

        {/* Missing Ingredients Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-black text-lg">
              What's missing in your fridge
            </h2>
            <HelpCircle className="h-4 w-4 text-[#a4a7ae]" />
          </div>

          <div className="space-y-3">
            {missingIngredientsData.length > 0 ? (
              missingIngredientsData.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  amount={ingredient.quantity}
                  icon={ingredient.image}
                  name={ingredient.name}
                />
              ))
            ) : (
              <div className="py-4 text-center">
                <p className="text-gray-500">
                  {ingredients.length > 0 
                    ? "You have all ingredients for your recipes!" 
                    : "Add some ingredients to your inventory"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </div>
  );
}
