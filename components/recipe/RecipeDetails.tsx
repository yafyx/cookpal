import { Button } from '@/components/ui/button';
import type { Recipe } from '@/lib/types';
import { CookIcon } from '../ui/cook-icon';
import { Separator } from '../ui/separator';
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
          backgroundImage: `url('${recipe.image}')`,
        }}
      >
        {/* Recipe info overlay on image */}
        <div className="absolute right-0 bottom-[-30] left-0 z-10 p-4">
          <div className="mb-4">
            <h1 className="mb-3 font-semibold text-4xl text-black leading-8 tracking-[-0.528px]">
              {recipe.name}
            </h1>

            {/* Timer */}
            <div className="mb-3 flex items-center gap-1">
              <span className="font-normal text-black text-xs leading-[18px]">
                Creator
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button className="rounded-lg bg-black px-5 py-1 font-semibold text-base text-white leading-6 hover:bg-black">
                <CookIcon className="h-[20px] w-[20px]" />
                Cook
              </Button>
              <Button className="rounded-lg bg-white px-5 py-1 font-semibold text-[#181d27] text-base leading-6 hover:bg-white">
                Plan
              </Button>
              <Button className="rounded-lg bg-white px-5 py-1 font-semibold text-base text-black leading-6 hover:bg-white">
                Remix
              </Button>
            </div>
          </div>
        </div>

        {/* Fade overlay at bottom */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-60 w-full"
          style={{
            background:
              'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 15%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 35%, rgba(255, 255, 255, 0.35) 45%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.65) 65%, rgba(255, 255, 255, 0.8) 75%, rgba(255, 255, 255, 0.9) 85%, rgba(255, 255, 255, 1) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="px-4">
        {/* Recipe Details */}
        <div className="mb-4 pt-4">
          <p className="mb-4 text-[#181d27] text-sm leading-5">
            {recipe.description}
          </p>
        </div>

        <Separator className="my-4" />

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
