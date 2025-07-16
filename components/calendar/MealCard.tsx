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

  return (
    <button
      className="h-16 w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-left transition-colors hover:bg-gray-50"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <div className="flex items-center justify-between">
        <h3 className="truncate font-medium text-gray-900 text-sm">
          {recipe.name}
        </h3>
      </div>
    </button>
  );
}
