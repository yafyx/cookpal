'use client';

import { HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import IngredientItem from '@/components/dashboard/IngredientItem';
import RecipeCard from '@/components/dashboard/RecipeCard';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { MobileHeader } from '@/components/ui/mobile-header';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useInventory, useRecipes } from '@/hooks/use-storage';
import { inventoryStorage } from '@/lib/storage';

export default function DashboardPage() {
  const { loading: inventoryLoading } = useInventory();
  const { recipes, loading: recipesLoading } = useRecipes();
  const [missingIngredients, setMissingIngredients] = useState<string[]>([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    // Check for missing ingredients across all recipes
    if (recipes.length > 0 && !recipesLoading) {
      const allMissing = new Set<string>();

      // Check missing ingredients for each recipe
      for (const recipe of recipes) {
        const { missing } = inventoryStorage.checkAvailability(
          recipe.ingredients
        );
        for (const ingredient of missing) {
          allMissing.add(ingredient);
        }
      }

      setMissingIngredients(Array.from(allMissing));
    }
  }, [recipes, recipesLoading]);

  // Get missing ingredients data from recipes (limit to first 3)
  const missingIngredientsData = missingIngredients
    .map((missingName) => {
      // Find the ingredient in any recipe to get its image and quantity
      for (const recipe of recipes) {
        const ingredient = recipe.ingredients.find(
          (ing) => ing.name.toLowerCase() === missingName.toLowerCase()
        );
        if (ingredient) {
          return {
            id: ingredient.id,
            name: ingredient.name,
            quantity: ingredient.quantity,
            image: ingredient.image,
          };
        }
      }
      // Fallback if ingredient not found in any recipe
      return {
        id: `missing-${missingName}`,
        name: missingName,
        quantity: '1 piece',
        image: '',
      };
    })
    .slice(0, 3);

  const loading = inventoryLoading || recipesLoading;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <MobileHeader
          logo={
            <Image
              alt="CookPal"
              className="h-12 w-auto"
              height={48}
              priority
              src="/cookpal.svg"
              width={180}
            />
          }
          showSearch
        />
        <div className="flex flex-1 items-center justify-center">
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
            className="h-12 w-auto"
            height={48}
            priority
            src="/cookpal.svg"
            width={180}
          />
        }
        showSearch
      />

      {/* Main Content */}
      <div className="flex-1 space-y-6 px-4 pt-4 pb-20">
        {/* Main Title */}
        <h1 className="font-semibold text-2xl text-[#181d27] tracking-tight">
          What dish you wish to cook today?
        </h1>

        {/* Recipe Cards Carousel */}
        <div className="-mr-4 flex snap-x snap-mandatory scroll-pr-4 gap-2 overflow-x-auto scroll-smooth pb-4">
          {recipes.length > 0 ? (
            recipes
              .slice(0, 3)
              .map((recipe) => (
                <RecipeCard
                  backgroundImage={recipe.image}
                  duration="30m"
                  id={recipe.id}
                  key={recipe.id}
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
            <Tooltip onOpenChange={setTooltipOpen} open={tooltipOpen}>
              <TooltipTrigger
                onClick={(e) => {
                  e.preventDefault();
                  setTooltipOpen(!tooltipOpen);
                }}
              >
                <HelpCircle className="h-5 w-5 text-[#a4a7ae]" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">
                  This shows ingredients that you're missing for your planned
                  recipes.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-3">
            {missingIngredientsData.length > 0 ? (
              missingIngredientsData.map((ingredient) => (
                <IngredientItem
                  amount={ingredient.quantity}
                  icon={ingredient.image}
                  key={ingredient.id}
                  name={ingredient.name}
                />
              ))
            ) : (
              <div className="py-4 text-center">
                <p className="text-gray-500">
                  {recipes.length > 0
                    ? 'You have all ingredients for your recipes!'
                    : 'Add some recipes to see missing ingredients'}
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
