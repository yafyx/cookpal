import { Card } from '@/components/ui/card';

interface NutritionCardProps {
  label: string;
  value: string;
}

export function NutritionCard({ label, value }: NutritionCardProps) {
  return (
    <Card className="flex h-[90px] flex-1 flex-col items-center justify-center gap-1 rounded-lg border-[#e9eaeb] bg-white p-3">
      <span className="font-normal text-[#717680] text-xs leading-[18px]">
        {label}
      </span>
      <span className="font-semibold text-[#181d27] text-sm leading-5">
        {value}
      </span>
    </Card>
  );
}
