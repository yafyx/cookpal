import type { Ingredient } from '@/lib/types';
import { getFallbackImageUrl, isEmoji } from '@/lib/utils';
import Image from 'next/image';

interface IngredientItemProps {
  ingredient: Ingredient;
}

export function IngredientItem({ ingredient }: IngredientItemProps) {
  const imageIsEmoji = isEmoji(ingredient.image);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex h-10 items-center gap-2">
        <div className="flex aspect-square h-full items-center justify-center overflow-hidden rounded-lg border border-[#e9eaeb] bg-white">
          {imageIsEmoji ? (
            <div className="flex h-full w-full items-center justify-center text-lg">
              {ingredient.image}
            </div>
          ) : (
            <Image
              alt={ingredient.name}
              className="object-cover"
              height={22}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImageUrl('🥘');
              }}
              src={ingredient.image}
              width={22}
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-normal text-[#181d27] text-sm leading-5">
            {ingredient.name}
          </span>
        </div>
      </div>
      <div className="font-normal text-[#717680] text-sm leading-5">
        {ingredient.quantity}
      </div>
    </div>
  );
}
