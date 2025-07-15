'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { Ingredient } from '@/lib/types';
import { getFallbackImageUrl, isEmoji } from '@/lib/utils';
import { Package } from 'lucide-react';
import Image from 'next/image';

interface ChatIngredientCardProps {
  ingredient: Ingredient;
  className?: string;
}

export default function ChatIngredientCard({
  ingredient,
  className,
}: ChatIngredientCardProps) {
  const imageIsEmoji = isEmoji(ingredient.image);

  return (
    <Card className={`w-full max-w-xs overflow-hidden ${className}`}>
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 flex-shrink-0">
            {imageIsEmoji ? (
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100 text-2xl">
                {ingredient.image}
              </div>
            ) : (
              <Image
                alt={ingredient.name}
                className="rounded-lg object-cover"
                fill
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getFallbackImageUrl('🥘');
                }}
                src={ingredient.image}
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-gray-900 text-sm">
              {ingredient.name}
            </h3>
            <div className="mt-1 flex items-center gap-1">
              <Package className="h-3 w-3 text-gray-500" />
              <span className="text-gray-600 text-xs">
                {ingredient.quantity}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
