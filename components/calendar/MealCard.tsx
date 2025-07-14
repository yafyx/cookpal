interface MealCardProps {
  recipe: {
    name: string;
    image: string;
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
      className="relative h-[96px] w-full cursor-pointer overflow-hidden text-left transition-opacity hover:opacity-90"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <div
        className="relative h-full w-full bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 100%), url('${recipe.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute right-0 bottom-0 left-0 p-4">
          <h3 className="font-semibold text-[18px] text-white leading-[28px]">
            {recipe.name}
          </h3>
        </div>
      </div>
    </button>
  );
}
