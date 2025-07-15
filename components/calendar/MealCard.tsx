import { Button } from '@/components/ui/button';
import { CookIcon } from '../ui/cook-icon';

interface MealCardProps {
  recipe: {
    name: string;
  };
  onClick?: () => void;
}

export default function MealCard({ recipe, onClick }: MealCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  const handleCookClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Handle cook action here
  };

  return (
    <button
      className="relative h-[96px] w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-left transition-opacity hover:opacity-90"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <div className="relative flex h-full w-full items-center justify-between p-4">
        <div>
          <h3 className="font-semibold text-[18px] text-gray-800 leading-[28px]">
            {recipe.name}
          </h3>
        </div>
        <Button
          className="rounded-lg bg-black px-3 py-1 font-semibold text-sm text-white leading-5 hover:bg-gray-800"
          onClick={handleCookClick}
          size="sm"
          type="button"
        >
          <CookIcon className="mr-1 h-[14px] w-[14px]" />
          Cook
        </Button>
      </div>
    </button>
  );
}
