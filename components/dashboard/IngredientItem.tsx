interface IngredientItemProps {
  name: string;
  amount: string;
  icon?: string;
}

export default function IngredientItem({
  name,
  amount,
  icon,
}: IngredientItemProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex h-10 items-center gap-2">
        <div className="flex h-[33px] w-[33px] items-center justify-center rounded-lg border border-[#e9eaeb] bg-white">
          {icon ? (
            <div
              className="h-[22px] w-[22px] bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url('${icon}')` }}
            />
          ) : (
            <div className="h-[22px] w-[22px] rounded-full bg-gray-200" />
          )}
        </div>
        <span className="text-[#181d27] text-sm">{name}</span>
      </div>
      <span className="text-[rgba(223,4,8,0.6)] text-sm">{amount} left</span>
    </div>
  );
}
