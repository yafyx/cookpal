import { Card } from '@/components/ui/card';

interface NutritionCardProps {
  label: string;
  value: string;
}

export function NutritionCard({ label, value }: NutritionCardProps) {
  return (
    <Card className="flex h-[90px] flex-1 flex-col items-center justify-center gap-1 rounded-lg border-gray-200 bg-[#F5F5F5] p-3 shadow-none">
      <span className="font-semibold text-[#717680]/60 text-sm leading-[18px]">
        {label}
      </span>
      <span className="font-semibold text-[#181d27] text-sm leading-5">
        {value}
      </span>
    </Card>
  );
}
