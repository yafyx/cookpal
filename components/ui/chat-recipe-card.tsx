'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Recipe } from '@/lib/types';
import { ChefHat, Clock, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ChatRecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export default function ChatRecipeCard({
  recipe,
  className,
}: ChatRecipeCardProps) {
  const totalDuration =
    recipe.cookingSteps?.reduce((total, step) => {
      const stepDuration = Number.parseInt(
        step.duration?.replace(' mins', '') || '0',
        10
      );
      return total + stepDuration;
    }, 0) || 0;

  return (
    <Card className={`w-full max-w-md overflow-hidden ${className}`}>
      <div className="relative h-32 w-full">
        <Image
          alt={recipe.name}
          className="object-cover"
          fill
          src={recipe.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute right-2 bottom-2 left-2">
          <h3 className="line-clamp-2 font-semibold text-sm text-white">
            {recipe.name}
          </h3>
        </div>
      </div>

      <CardContent className="p-3">
        <div className="mb-3 flex items-center gap-4 text-gray-600 text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{totalDuration > 0 ? `${totalDuration} mins` : 'Quick'}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-3 w-3" />
            <span>{recipe.creator}</span>
          </div>
        </div>

        <p className="mb-3 line-clamp-2 text-gray-700 text-xs">
          {recipe.description}
        </p>

        <div className="mb-3 flex flex-wrap gap-1">
          <Badge className="text-xs" variant="secondary">
            {recipe.nutrition.energy}
          </Badge>
          <Badge className="text-xs" variant="outline">
            {recipe.nutrition.proteins}
          </Badge>
          <Badge className="text-xs" variant="outline">
            {recipe.nutrition.carbs}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button asChild className="h-8 flex-1 text-xs" size="sm">
            <Link href={`/recipe/${recipe.id}`}>
              <Eye className="mr-1 h-3 w-3" />
              View Recipe
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
