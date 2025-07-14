import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { RecipeDetails } from '@/components/recipe/RecipeDetails';
import type { Recipe } from '@/lib/types';

// Mock recipe data - in a real app this would come from an API
const mockRecipe: Recipe = {
  id: '1',
  name: 'Beef Burger',
  creator: 'Creator',
  image: '/api/placeholder/375/362',
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
      image: '/api/placeholder/33/33',
    },
    {
      id: '2',
      name: 'Cheddar Cheese',
      quantity: '8 Slices',
      image: '/api/placeholder/33/33',
    },
    {
      id: '3',
      name: 'Brisket',
      quantity: '320g',
      image: '/api/placeholder/33/33',
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
  params: {
    id: string;
  };
}

export default function RecipePage({ params }: PageProps) {
  // In a real app, you would fetch the recipe using params.id
  // const recipe = await fetchRecipe(params.id)
  const _recipeId = params.id; // This would be used to fetch the actual recipe

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 overflow-auto">
        <RecipeDetails recipe={mockRecipe} />
      </div>
      <BottomNavigation activeTab="recipes" />
    </div>
  );
}
