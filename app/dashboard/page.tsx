'use client';

import { BarChart3, ExternalLink, HelpCircle, List, X } from 'lucide-react';
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
                  <div className="mb-2 rounded-xl bg-gray-50 p-4">
                    <h3 className="mb-2 font-medium text-gray-700 text-sm">
                      Shopping List Preview
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {missingIngredientsData.map((ingredient) => (
                        <div
                          className="flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs"
                          key={ingredient.id}
                        >
                          <span>{ingredient.name}</span>
                          <span className="text-gray-500">
                            ({ingredient.quantity})
                          </span>
                        </div>
                      ))}
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
