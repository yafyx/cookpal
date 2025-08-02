'use client';

import { ChevronRight, Plus, Timer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AddRecipeDrawer } from '@/components/recipes';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { Button } from '@/components/ui/button';
import { MobileHeader } from '@/components/ui/mobile-header';
import { useInventory, useRecipes } from '@/hooks/use-storage';

export default function KitchenPage() {
  const { ingredients: inventory, loading: inventoryLoading } = useInventory();
  const { recipes, loading: recipesLoading, addRecipe } = useRecipes();

  const loading = inventoryLoading || recipesLoading;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <MobileHeader title="Kitchen" />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
        <BottomNavigation activeTab="kitchen" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MobileHeader title="Kitchen" />
      <div className="relative flex-1 overflow-auto pb-20">
        <div className="px-4 pb-4">
          {/* Inventory Section */}
          <div className="">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-[#000000] text-[18px] leading-7">
                Inventory
              </h2>
              <Link
                className="flex items-center gap-1 font-medium text-[#717680] text-[14px] leading-5 transition-colors hover:text-[#181d27]"
                href="/inventory"
              >
                See more
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Inventory List */}
            <div className="relative">
              <div className="flex h-[285px] flex-col gap-3 overflow-y-auto">
                {inventory.length > 0 ? (
                  inventory.map((item) => (
                    <div
                      className="flex items-center justify-between"
                      key={item.id}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 overflow-hidden rounded-lg border border-[#e9eaeb] bg-white">
                          <Image
                            alt={item.name}
                            className="h-full w-full object-cover"
                            height={40}
                            src={item.image}
                            width={40}
                          />
                        </div>
                        <span className="font-normal text-[#181d27] text-[14px] leading-5">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-normal text-[#717680] text-[14px] leading-5">
                        {item.quantity}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-gray-500">No ingredients in inventory</p>
                  </div>
                )}
              </div>
              {/* Fade overlay at bottom of inventory */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-50 w-full"
                style={{
                  background:
                    'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 15%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 35%, rgba(255, 255, 255, 0.35) 45%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.65) 65%, rgba(255, 255, 255, 0.8) 75%, rgba(255, 255, 255, 0.9) 85%, rgba(255, 255, 255, 1) 100%)',
                }}
              />
            </div>
          </div>

          {/* Recipes Section */}
          <div className="">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-[#000000] text-[18px] leading-7">
                Recipes
              </h2>
              <Link
                className="flex items-center gap-1 font-medium text-[#717680] text-[14px] leading-5 transition-colors hover:text-[#181d27]"
                href="/recipes/manage"
              >
                See all
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Horizontal Scrollable Recipe Cards */}
            <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2">
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <div
                    className="group relative h-[449px] w-[330px] flex-shrink-0 snap-start overflow-hidden rounded-3xl"
                    key={recipe.id}
                  >
                    <Link
                      className="absolute inset-0 flex flex-col justify-end p-4 text-white"
                      href={`/recipes/${recipe.id}`}
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), url('${recipe.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <h3 className="mb-3 font-semibold text-[24px] leading-8 tracking-[-0.528px]">
                        {recipe.name}
                      </h3>

                      <div className="mb-3 flex items-center gap-1">
                        <Timer className="h-[18px] w-[18px]" />
                        <span className="text-[12px] leading-[18px]">30m</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="rounded-lg border border-[#e9eaeb] bg-[#fdfdfd] px-5 py-1 font-semibold text-[#181d27] text-[16px] leading-6"
                          size="sm"
                        >
                          <Plus className="mr-2 h-[18px] w-[18px]" />
                          Plan
                        </Button>
                        <Button
                          className="rounded-lg bg-[rgba(253,253,253,0.3)] px-5 py-1 font-semibold text-[#fdfdfd] text-[16px] leading-6 backdrop-blur-[2px]"
                          size="sm"
                          variant="ghost"
                        >
                          <Plus className="mr-2 h-[18px] w-[18px]" />
                          Remix
                        </Button>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="flex h-[200px] w-[330px] items-center justify-center rounded-3xl bg-gray-100">
                  <p className="text-gray-500">No recipes available</p>
                </div>
              )}
            </div>
          </div>

          {/* Floating Add Recipe Button */}
          <AddRecipeDrawer
            onAddRecipe={addRecipe}
            trigger={
              <button
                className="fixed right-4 bottom-25 flex items-center gap-2 rounded-lg bg-[#181d27] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 sm:right-129"
                type="button"
              >
                <Plus className="h-[18px] w-[18px]" />
                <span className="font-semibold text-[16px]">Add Recipe</span>
              </button>
            }
          />
        </div>
      </div>

      <BottomNavigation activeTab="kitchen" />
    </div>
  );
}
