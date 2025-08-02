"use client";

import { Settings, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile } from "@/lib/types";

interface NutritionGoalsProps {
  userProfile: UserProfile;
}

export default function NutritionGoals({ userProfile }: NutritionGoalsProps) {
  return (
    <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-md">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xl tracking-tight">
              Daily Nutrition Goals
            </h3>
            <p className="font-medium text-gray-500 text-sm mt-1">
              Track your nutritional targets
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50/80 to-blue-100/60 p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500 shadow-sm">
                  <span className="font-bold text-white text-sm">C</span>
                </div>
                <p className="font-semibold text-blue-700 text-base">
                  Calories
                </p>
              </div>
              <p className="mb-2 font-bold text-3xl text-blue-800 tracking-tight">
                {userProfile.nutritionGoals.dailyCalories}
              </p>
              <p className="font-medium text-blue-600 text-sm">kcal/day</p>
            </div>

            <div className="rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50/80 to-green-100/60 p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-500 shadow-sm">
                  <span className="font-bold text-white text-sm">P</span>
                </div>
                <p className="font-semibold text-green-700 text-base">
                  Protein
                </p>
              </div>
              <p className="mb-2 font-bold text-3xl text-green-800 tracking-tight">
                {userProfile.nutritionGoals.minProtein}
              </p>
              <p className="font-medium text-green-600 text-sm">g/day</p>
            </div>

            <div className="rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50/80 to-orange-100/60 p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500 shadow-sm">
                  <span className="font-bold text-white text-sm">C</span>
                </div>
                <p className="font-semibold text-orange-700 text-base">Carbs</p>
              </div>
              <p className="mb-2 font-bold text-3xl text-orange-800 tracking-tight">
                {userProfile.nutritionGoals.maxCarbs}
              </p>
              <p className="font-medium text-orange-600 text-sm">g/day</p>
            </div>

            <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50/80 to-red-100/60 p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500 shadow-sm">
                  <span className="font-bold text-white text-sm">F</span>
                </div>
                <p className="font-semibold text-red-700 text-base">Fats</p>
              </div>
              <p className="mb-2 font-bold text-3xl text-red-800 tracking-tight">
                {userProfile.nutritionGoals.maxFats}
              </p>
              <p className="font-medium text-red-600 text-sm">g/day</p>
            </div>
          </div>

          <Button
            className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 py-4 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            variant="default"
          >
            <Settings className="mr-2 h-5 w-5" />
            Adjust Nutrition Goals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
