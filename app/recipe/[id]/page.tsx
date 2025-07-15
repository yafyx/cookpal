import { RecipeDetails } from '@/components/recipe/RecipeDetails';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { Button } from '@/components/ui/button';
import type { Recipe } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock recipe data - in a real app this would come from an API
const mockRecipe: Recipe = {
  id: '1',
  name: 'Beef Burger',
  creator: 'Creator',
  image: 'https://placehold.co/375x362/d97706/ffffff.png?text=🍔+Beef+Burger',
  description:
    'Homemade beef cutlet with a special sauce with parmesan and mustard will not leave you indifferent. The crispy rice flour bun will impress you with its irresistibility.',
  nutrition: {
    energy: '749Kcal',
    carbs: '36g',
    proteins: '52g',
    fats: '44g',
  },
  ingredients: [
    {
      id: '1',
      name: 'Potato Bun',
      quantity: '4',
      image: 'https://placehold.co/33x33/d97706/ffffff.png?text=🍞',
    },
    {
      id: '2',
      name: 'Cheddar Cheese',
      quantity: '8 Slices',
      image: 'https://placehold.co/33x33/fbbf24/ffffff.png?text=🧀',
    },
    {
      id: '3',
      name: 'Brisket',
      quantity: '320g',
      image: 'https://placehold.co/33x33/7c2d12/ffffff.png?text=🥩',
    },
  ],
  cookingSteps: [
    {
      id: '1',
      step: 1,
      instruction: 'Preheat your grill or pan to medium-high heat.',
      duration: '2 mins',
    },
    {
      id: '2',
      step: 2,
      instruction: 'Season the brisket with salt and pepper on both sides.',
      duration: '1 min',
    },
    {
      id: '3',
      step: 3,
      instruction:
        'Cook the brisket for 4-5 minutes per side until desired doneness.',
      duration: '10 mins',
    },
    {
      id: '4',
      step: 4,
      instruction: 'Toast the potato buns lightly on the grill.',
      duration: '2 mins',
    },
    {
      id: '5',
      step: 5,
      instruction:
        'Assemble the burger with cheese and your favorite toppings.',
      duration: '3 mins',
    },
  ],
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function FloatingBackButton() {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-20 pointer-events-none">
      {/* Floating Back Button */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        <Link href="/recipes">
          <Button
            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-200"
            size="icon"
            variant="ghost"
          >
            <ArrowLeft className="h-5 w-5 text-[#414651]" />
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default async function RecipePage({ params }: PageProps) {
  // In a real app, you would fetch the recipe using params.id
  // const recipe = await fetchRecipe(params.id)
  const { id } = await params;
  const _recipeId = id; // This would be used to fetch the actual recipe

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <FloatingBackButton />
      <div className="flex-1 overflow-auto">
        <RecipeDetails recipe={mockRecipe} />
      </div>
      <BottomNavigation activeTab="kitchen" />
    </div>
  );
}
