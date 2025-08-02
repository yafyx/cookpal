"use client";

import { Settings, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NutritionGoalsProps {
  userProfile: UserProfile;
}

interface NutritionItemProps {
  label: string;
  value: number;
  unit: string;
  icon: string;
}

const NutritionItem = ({ label, value, unit, icon }: NutritionItemProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-background transition-all hover:shadow-md">
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#FD853A] to-[#FD853A]/70" />
      <div className="p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FD853A]/10 text-[#FD853A]">
            <span className="font-semibold text-sm">{icon}</span>
          </div>
          <p className="font-medium text-foreground">{label}</p>
        </div>
        <div className="flex items-end gap-2">
          <p className="font-bold text-3xl text-foreground">{value}</p>
          <p className="mb-1 text-muted-foreground text-sm">{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default function NutritionGoals({ userProfile }: NutritionGoalsProps) {
  const nutritionItems: NutritionItemProps[] = [
    {
      label: "Calories",
      value: userProfile.nutritionGoals.dailyCalories,
      unit: "kcal/day",
      icon: "C",
    },
    {
      label: "Protein",
      value: userProfile.nutritionGoals.minProtein,
      unit: "g/day",
      icon: "P",
    },
    {
      label: "Carbs",
      value: userProfile.nutritionGoals.maxCarbs,
      unit: "g/day",
      icon: "C",
    },
    {
      label: "Fats",
      value: userProfile.nutritionGoals.maxFats,
      unit: "g/day",
      icon: "F",
    },
  ];

  return (
    <Card className="relative overflow-hidden border-border bg-background">
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#FD853A] to-[#FD853A]/30" />
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FD853A]/10 text-[#FD853A]">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Daily Nutrition Goals
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your nutritional targets
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {nutritionItems.map((item) => (
              <NutritionItem
                key={item.label}
                label={item.label}
                value={item.value}
                unit={item.unit}
                icon={item.icon}
              />
            ))}
          </div>

          <Button
            className={cn(
              "w-full font-medium",
              "bg-[#FD853A] hover:bg-[#FD853A]/90 text-white"
            )}
          >
            <Settings className="mr-2 h-4 w-4" />
            Adjust Nutrition Goals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
