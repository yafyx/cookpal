'use client';

import { HelpCircle, Search } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import IngredientItem from './IngredientItem';
import RecipeCard from './RecipeCard';

// Mock recipe images - in a real app, these would come from your API/database
const mockImages = {
  kangkung:
    'https://images.unsplash.com/photo-1555126634-323283e090fa?w=330&h=449&fit=crop&crop=center',
  beefBurger:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=330&h=449&fit=crop&crop=center',
  lettuce:
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=22&h=22&fit=crop&crop=center',
  redOnion:
    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=22&h=22&fit=crop&crop=center',
  tomato:
    'https://images.unsplash.com/photo-1546470427-227e3b88c48b?w=22&h=22&fit=crop&crop=center',
};

export default function Dashboard() {
  const ingredients = [
    { name: 'Lettuce', amount: '4', icon: mockImages.lettuce },
    { name: 'Red Onion', amount: '2', icon: mockImages.redOnion },
    { name: 'Tomato', amount: '4', icon: mockImages.tomato },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="font-bold text-[#181d27] text-lg">CookPal</div>
        </div>
        <Search className="h-6 w-6 text-[#414651]" />
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6 px-4">
        {/* Main Title */}
        <h1 className="font-semibold text-2xl text-[#181d27] tracking-tight">
          What dish you wish to cook today?
        </h1>

        {/* Recipe Cards Carousel */}
        <div className="flex gap-2 overflow-x-auto pb-4">
          <RecipeCard
            backgroundImage={mockImages.kangkung}
            duration="30m"
            title="Kangkung"
          />
          <RecipeCard
            backgroundImage={mockImages.beefBurger}
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
