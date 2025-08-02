'use client';

import {
  BarChart3,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  List,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import IngredientItem from '@/components/dashboard/IngredientItem';
import RecipeCard from '@/components/dashboard/RecipeCard';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { Button } from '@/components/ui/button';
import { MobileHeader } from '@/components/ui/mobile-header';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useInventory, useRecipes } from '@/hooks/use-storage';
import { inventoryStorage } from '@/lib/storage';

export default function DashboardPage() {
  const router = useRouter();
  const { loading: inventoryLoading } = useInventory();
  const { recipes, loading: recipesLoading } = useRecipes();
  const [missingIngredients, setMissingIngredients] = useState<string[]>([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isGeneratingList, setIsGeneratingList] = useState(false);
  const [showShoppingDrawer, setShowShoppingDrawer] = useState(false);

  const handleNavigateToNutrition = () => {
    router.push('/nutrition');
  };

  const shoppingPlatforms = [
    {
      name: 'Tokopedia',
      description: "Indonesia's largest marketplace",
      color: 'bg-green-500',
      logo: '/assets/icon/tokopedia.svg',
    },
    {
      name: 'Shopee',
      description: 'Free shipping & great deals',
      color: '',
      logo: '/assets/icon/shopee.svg',
    },
    {
      name: 'Gojek',
      description: 'Fresh groceries delivered fast',
      color: '',
      logo: '/assets/icon/gojek.svg',
    },
  ];

  const handleGenerateShoppingList = async () => {
    setIsGeneratingList(true);

    // Mock API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsGeneratingList(false);

    // Open the shopping drawer
    setShowShoppingDrawer(true);
  };

  const handleShopNow = (platform: string) => {
    setShowShoppingDrawer(false);

    // Mock redirect to platform with alert
    alert(
      `Redirecting to ${platform}...\nYour shopping list has been prepared and synced!`
    );

    // In a real app, you would redirect to the platform with the shopping list
    // window.open(`https://${platform.toLowerCase()}.com/search?q=${missingIngredientsData.map(i => i.name).join('+')}`);
  };

  const handleCloseDrawer = () => {
    setShowShoppingDrawer(false);
  };

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

  // Helper function to parse quantity numbers
  const parseQuantity = (quantityStr: string): number => {
    const match = quantityStr.match(/(\d+(?:\.\d+)?)/);
    return match ? Number.parseFloat(match[1]) : 1;
  };

  // Helper function to get quantity unit
  const getQuantityUnit = (quantityStr: string): string => {
    return quantityStr.replace(/^\d+(?:\.\d+)?\s*/, '') || 'piece';
  };

  // Get missing ingredients data with correct missing quantities
  const missingIngredientsData = missingIngredients
    .map((missingName) => {
      let totalMissingQuantity = 0;
      let unit = 'piece';
      let ingredientId = `missing-${missingName}`;
      let ingredientImage = '';

      // Calculate total missing quantity across all recipes
      for (const recipe of recipes) {
        const ingredient = recipe.ingredients.find(
          (ing) => ing.name.toLowerCase() === missingName.toLowerCase()
        );
        if (ingredient) {
          ingredientId = ingredient.id;
          ingredientImage = ingredient.image;
          unit = getQuantityUnit(ingredient.quantity);

          const requiredQuantity = parseQuantity(ingredient.quantity);

          // Check what we have in inventory
          const inventory = inventoryStorage.getAll();
          const inventoryItem = inventory.find(
            (inv) => inv.name.toLowerCase() === missingName.toLowerCase()
          );

          const availableQuantity = inventoryItem
            ? parseQuantity(inventoryItem.quantity)
            : 0;
          const missingForThisRecipe = Math.max(
            0,
            requiredQuantity - availableQuantity
          );

          totalMissingQuantity += missingForThisRecipe;
        }
      }

      return {
        id: ingredientId,
        name: missingName,
        quantity:
          totalMissingQuantity > 0
            ? `${totalMissingQuantity} ${unit}`
            : `1 ${unit}`,
        image: ingredientImage,
      };
    })
    .filter((ingredient) => parseQuantity(ingredient.quantity) > 0) // Only show items we actually need
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
              <>
                {missingIngredientsData.map((ingredient) => (
                  <IngredientItem
                    amount={ingredient.quantity}
                    icon={ingredient.image}
                    key={ingredient.id}
                    name={ingredient.name}
                  />
                ))}

                {/* One-Tap Shopping List Generator */}
                <div className="pt-2">
                  <Button
                    className="w-full rounded-lg py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    disabled={isGeneratingList}
                    onClick={handleGenerateShoppingList}
                    size="lg"
                  >
                    {isGeneratingList ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Generating List...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <List className="h-5 w-5" />
                        <span>Generate Shopping List</span>
                      </div>
                    )}
                  </Button>
                  <p className="mt-2 pb-2 text-center text-gray-500 text-xs">
                    Auto-magically create a shopping list from your planned
                    meals.
                  </p>
                </div>
              </>
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

        {/* Nutrition Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-black text-lg">
              Track Your Nutrition
            </h2>
            <BarChart3 className="h-5 w-5 text-[#fd853a]" />
          </div>

          <div className="rounded-xl border border-[#fd853a]/20 bg-gradient-to-r from-[#fd853a]/10 to-[#f2bf23]/10 p-4">
            <div className="space-y-3 text-center">
              <div className="font-semibold text-2xl text-[#fd853a]">67.3</div>
              <div className="text-gray-600 text-sm">
                Your current nutrition score
              </div>
              <div className="text-gray-500 text-xs">
                You need more protein intake this week
              </div>
              <Button
                className="w-full rounded-lg bg-[#181d27] text-white hover:bg-[#282d37]"
                onClick={handleNavigateToNutrition}
                size="sm"
              >
                View Detailed Nutrition
              </Button>
            </div>
          </div>
        </div>

        {/* Habit Coaching Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-black text-lg">Habit Coaching</h2>
            <Target className="h-5 w-5 text-[#7c3aed]" />
          </div>

          <div className="rounded-xl border border-[#7c3aed]/20 bg-gradient-to-r from-[#7c3aed]/10 to-[#a855f7]/10 p-4">
            <div className="space-y-4">
              {/* Today's Tip */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7c3aed]/20">
                  <Lightbulb className="h-4 w-4 text-[#7c3aed]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#7c3aed] text-sm">
                    Today's Cooking Tip
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Prep your vegetables the night before to save 15 minutes in
                    the morning. This small habit can help you cook healthy
                    meals even on busy days!
                  </p>
                </div>
              </div>

              {/* Habit Progress */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10b981]/20">
                  <TrendingUp className="h-4 w-4 text-[#10b981]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#10b981] text-sm">
                    Your Progress
                  </h3>
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">5 days</span> of consistent
                    healthy cooking! You're building a great habit.
                  </p>
                </div>
              </div>

              {/* Weekly Challenge */}
              <div className="rounded-lg border border-[#7c3aed]/30 bg-white/50 p-3">
                <h4 className="mb-2 font-semibold text-[#7c3aed] text-sm">
                  This Week's Challenge
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Try cooking with 3 new ingredients you've never used before.
                  This expands your cooking skills and keeps meals exciting!
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-gray-200">
                    <div className="h-2 w-2/3 rounded-full bg-[#7c3aed]" />
                  </div>
                  <span className="font-medium text-[#7c3aed] text-xs">
                    2/3
                  </span>
                </div>
              </div>

              <Button
                className="w-full rounded-lg bg-[#7c3aed] text-white hover:bg-[#6d28d9]"
                size="sm"
              >
                View All Tips & Challenges
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />

      {/* Shopping Drawer */}
      <Drawer.Root
        onOpenChange={setShowShoppingDrawer}
        open={showShoppingDrawer}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
          <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
            <Drawer.Content className="flex h-[80vh] max-h-[80vh] w-full max-w-md flex-col rounded-t-[20px] bg-white shadow-xl">
              <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-gray-300" />

              <header className="sticky top-0 z-10 flex items-center justify-between border-gray-200 border-b bg-white p-4">
                <div className="flex items-center">
                  <h1 className="font-bold text-[#181d27] text-lg">
                    Choose Where to Shop
                  </h1>
                </div>
                <Button
                  className="h-8 w-8"
                  onClick={handleCloseDrawer}
                  size="icon"
                  variant="ghost"
                >
                  <X className="h-5 w-5 text-[#414651]" />
                </Button>
              </header>

              <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#a4a7ae] text-sm leading-5">
                      Your smart shopping list is ready! Select your preferred
                      platform to start shopping.
                    </p>
                  </div>

                  {/* Shopping List Preview */}
                  <div className="mb-4 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                        <List className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          Shopping List Preview
                        </h3>
                        <p className="text-gray-500 text-xs">
                          {missingIngredientsData.length} items to purchase
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {missingIngredientsData.map((ingredient, index) => (
                        <div
                          className="flex items-center justify-between rounded-xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/90 hover:shadow-md"
                          key={ingredient.id}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600 text-xs">
                              {index + 1}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800 text-sm leading-tight">
                                {ingredient.name}
                              </span>
                              <span className="text-gray-500 text-xs">
                                Need to buy
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-orange-600 text-sm">
                              {ingredient.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-orange-100/50 px-3 py-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
                      <span className="font-medium text-orange-700 text-xs">
                        Ready to sync with your chosen platform
                      </span>
                    </div>
                  </div>

                  {/* Platform Options */}
                  <div className="space-y-3">
                    {shoppingPlatforms.map((platform) => (
                      <Button
                        className="h-16 w-full justify-between p-4 hover:bg-gray-50"
                        key={platform.name}
                        onClick={() => handleShopNow(platform.name)}
                        variant="outline"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`${platform.color} flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl`}
                          >
                            <Image
                              alt={`${platform.name} logo`}
                              className="h-6 w-6"
                              height={24}
                              src={platform.logo}
                              width={24}
                            />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-[#181d27]">
                              {platform.name}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {platform.description}
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="h-5 w-5 text-gray-400" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Drawer.Content>
          </div>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
