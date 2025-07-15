'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Recipe } from '@/lib/types';
import { getFallbackImageUrl, isEmoji } from '@/lib/utils';
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

  const imageIsEmoji = isEmoji(recipe.image);

  return (
    <Card
      className={`w-full max-w-md gap-3 overflow-hidden p-0 shadow-none ${className}`}
    >
      <div className="relative h-40 w-full">
        {imageIsEmoji ? (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-6xl">
            {recipe.image}
          </div>
        ) : (
          <Image
            alt={recipe.name}
            className="object-cover"
            fill
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getFallbackImageUrl('🍽️');
            }}
            sizes="(max-width: 768px) 100vw, 400px"
            src={recipe.image}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute right-3 bottom-3 left-3">
          <h3 className="line-clamp-2 font-semibold text-sm text-white drop-shadow-md">
            {recipe.name}
          </h3>
        </div>
      </div>

      <CardContent className="mt-0 space-y-3 p-3 pt-0">
        <div className="flex items-center gap-4 text-gray-600 text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{totalDuration > 0 ? `${totalDuration} mins` : 'Quick'}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-3 w-3" />
            <span>{recipe.creator}</span>
          </div>
        </div>

        <p className="line-clamp-2 text-gray-700 text-xs leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex flex-wrap gap-1">
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
