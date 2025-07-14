import type { Ingredient } from '@/lib/types';
import Image from 'next/image';

interface InventoryItemProps {
  ingredient: Ingredient;
}

export default function InventoryItem({ ingredient }: InventoryItemProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#e9eaeb] bg-white">
          <Image
            alt={ingredient.name}
            className="object-cover"
            height={24}
            src={ingredient.image}
            width={24}
          />
        </div>
        <span className="font-normal text-[#181d27] text-sm">
          {ingredient.name}
        </span>
      </div>
      <span className="font-normal text-[#717680] text-sm">
        {ingredient.quantity}
      </span>
    </div>
  );
}
