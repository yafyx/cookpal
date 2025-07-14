import BottomNavigation from '@/components/dashboard/BottomNavigation';
import RecipeCard from '@/components/dashboard/RecipeCard';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';

// Mock recipe data - in a real app this would come from an API
const mockRecipes = [
  {
    id: '1',
    title: 'Kangkung',
    duration: '30m',
    backgroundImage: '/api/placeholder/330/449',
  },
  {
    id: '2',
    title: 'Beef Burger',
    duration: '30m',
    backgroundImage: '/api/placeholder/330/449',
  },
  {
    id: '3',
    title: 'Spicy Noodles',
    duration: '25m',
    backgroundImage: '/api/placeholder/330/449',
  },
  {
    id: '4',
    title: 'Greek Salad',
    duration: '15m',
    backgroundImage: '/api/placeholder/330/449',
  },
];

export default function RecipesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 overflow-auto pb-20">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <h1 className="mb-4 font-semibold text-2xl text-[#000000] leading-8 tracking-[-0.528px]">
            Recipes
          </h1>

          {/* Search and Filter */}
          <div className="mb-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-[#717680]" />
              <input
                className="w-full rounded-lg border border-[#e9eaeb] py-2 pr-4 pl-10 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#fd853a]"
                placeholder="Search recipes..."
                type="text"
              />
            </div>
            <Button className="px-3" size="sm" variant="outline">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="px-4">
          <div className="grid grid-cols-1 gap-4">
            {mockRecipes.map((recipe) => (
              <RecipeCard
                backgroundImage={recipe.backgroundImage}
                duration={recipe.duration}
                id={recipe.id}
                key={recipe.id}
                title={recipe.title}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation activeTab="recipes" />
    </div>
  );
}
