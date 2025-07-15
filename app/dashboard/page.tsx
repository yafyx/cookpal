'use client';

import IngredientItem from '@/components/dashboard/IngredientItem';
import RecipeCard from '@/components/dashboard/RecipeCard';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { MobileHeader } from '@/components/ui/mobile-header';
import { HelpCircle } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const ingredients = [
    { name: 'Lettuce', amount: '4', icon: '/assets/ingredients/lettuce.png' },
    { name: 'Red Onion', amount: '2', icon: '/assets/ingredients/redonion.png' },
    { name: 'Tomato', amount: '4', icon: '/assets/ingredients/tomato.png' },
  ];

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
          <RecipeCard
            backgroundImage="/assets/kangkung.png"
            duration="30m"
            title="Kangkung"
          />
          <RecipeCard
            backgroundImage="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=330&h=449&fit=crop&crop=center"
            duration="30m"
            title="Beef Burger"
          />
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
            {ingredients.map((ingredient) => (
              <IngredientItem
                amount={ingredient.amount}
                icon={ingredient.icon}
                key={ingredient.name}
                name={ingredient.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </div>
  );
}
