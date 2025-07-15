import { Button } from '@/components/ui/button';
import type { Recipe } from '@/lib/types';
import { Clock } from 'lucide-react';
import { CookIcon } from '../ui/cook-icon';
import { CookingSteps } from './CookingSteps';
import { IngredientItem } from './IngredientItem';
import { NutritionCard } from './NutritionCard';

interface RecipeDetailsProps {
  recipe: Recipe;
}

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const nutritionCards = [
    { label: 'Energy', value: recipe.nutrition.energy },
    { label: 'Carbs', value: recipe.nutrition.carbs },
    { label: 'Proteins', value: recipe.nutrition.proteins },
    { label: 'Fats', value: recipe.nutrition.fats },
  ];

  return (
    <div className="bg-white">
      {/* Hero Image with Gradient Overlay */}
      <div
        className="relative h-[362px] w-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), url('${recipe.image}')`,
        }}
      >
        {/* Recipe info overlay on image */}
        <div className="absolute right-0 bottom-0 left-0 p-4">
          <div className="mb-3">
            <h1 className="mb-3 font-semibold text-2xl text-white leading-8 tracking-[-0.528px]">
              {recipe.name}
            </h1>

            {/* Timer */}
            <div className="mb-3 flex items-center gap-1">
              <Clock className="h-[18px] w-[18px] text-white" />
              <span className="font-normal text-white text-xs leading-[18px]">
                30m
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button className="rounded-lg bg-black px-5 py-1 font-semibold text-base text-white leading-6 hover:bg-gray-800">
                <CookIcon className="mr-2 h-[18px] w-[18px]" />
                Cook
              </Button>
              <Button className="rounded-lg bg-white px-5 py-1 font-semibold text-[#181d27] text-base leading-6 hover:bg-gray-100">
                Plan
              </Button>
              <Button className="rounded-lg bg-white/30 px-5 py-1 font-semibold text-base text-white leading-6 backdrop-blur-sm hover:bg-white/40">
                Remix
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        {/* Recipe Details */}
        <div className="mb-6 pt-4">
          <p className="mb-4 text-[#181d27] text-sm leading-5">
            {recipe.description}
          </p>
        </div>

        {/* Nutrition Cards */}
        <div className="mb-6 flex gap-2">
          {nutritionCards.map((nutrition) => (
            <NutritionCard
              key={nutrition.label}
              label={nutrition.label}
              value={nutrition.value}
            />
          ))}
        </div>

        {/* Ingredients Section */}
        <div className="mb-6">
          <h2 className="mb-4 font-semibold text-[#000000] text-lg leading-7">
            Ingredients
          </h2>
          <div className="space-y-3">
            {recipe.ingredients.map((ingredient) => (
              <IngredientItem ingredient={ingredient} key={ingredient.id} />
            ))}
          </div>
        </div>

        {/* Cooking Steps Section */}
        {recipe.cookingSteps && recipe.cookingSteps.length > 0 && (
          <div>
            <CookingSteps steps={recipe.cookingSteps} />
          </div>
        )}
      </div>
    </div>
  );
}
