import Image from "next/image";

import type { Recipe } from "@/lib/types";

interface MealCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export default function MealCardV2({ recipe, onClick }: MealCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div className="relative w-full rounded-3xl border border-[rgba(0,0,0,0.12)] border-solid">
      <button
        className="w-full overflow-clip py-2 pr-6 pl-2 text-left transition-colors hover:bg-gray-50"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <div className="flex flex-row items-start justify-start gap-3">
          <div className="relative h-[96px] shrink-0 grow basis-0 rounded-2xl to-[#0000008c]">
            <Image
              alt={recipe.name}
              className="rounded-2xl"
              layout="fill"
              objectFit="cover"
              src={recipe.image}
            />
          </div>
          <div className="flex grow basis-0 flex-col justify-center gap-2 self-stretch px-1">
            <p className="font-bold text-[#181d27] text-base leading-6 truncate">
              {recipe.name}
            </p>
            <div className="flex w-full flex-row items-center justify-between gap-2">
              <div className="flex flex-col items-center justify-center text-[#2b1203] text-sm min-w-0">
                <p className="font-medium leading-5 text-xs text-gray-600">
                  Protein
                </p>
                <p className="font-semibold leading-5 text-sm">
                  {recipe.nutrition.proteins}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center text-[#2b1203] text-sm min-w-0">
                <p className="font-medium leading-5 text-xs text-gray-600">
                  Carbs
                </p>
                <p className="font-semibold leading-5 text-sm">
                  {recipe.nutrition.carbs}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center text-[#2b1203] text-sm min-w-0">
                <p className="font-medium leading-5 text-xs text-gray-600">
                  Fat
                </p>
                <p className="font-semibold leading-5 text-sm">
                  {recipe.nutrition.fats}
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
