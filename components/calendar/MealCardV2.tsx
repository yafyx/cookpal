import Image from 'next/image';

interface MealCardProps {
  recipe: {
    name: string;
    protein: number;
    carbs: number;
    fat: number;
    image: string;
  };
  onClick?: () => void;
}

export default function MealCardV2({ recipe, onClick }: MealCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
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
          <div className="flex grow basis-0 flex-col items-start justify-start gap-1 self-stretch">
            <p className="font-semibold text-[#181d27] text-base leading-6">
              {recipe.name}
            </p>
            <div className="flex w-full flex-row items-start justify-between">
              <div className="flex flex-col items-start justify-start text-[#2b1203] text-sm">
                <p className="font-medium leading-5">Protein</p>
                <p className="font-normal leading-5">{recipe.protein}gr</p>
              </div>
              <div className="flex flex-col items-start justify-start text-[#2b1203] text-sm">
                <p className="font-medium leading-5">Carbs</p>
                <p className="font-normal leading-5">{recipe.carbs}gr</p>
              </div>
              <div className="flex flex-col items-start justify-start text-[#2b1203] text-sm">
                <p className="font-medium leading-5">Fat</p>
                <p className="font-normal leading-5">{recipe.fat}gr</p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
