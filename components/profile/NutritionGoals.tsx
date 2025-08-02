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
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center bg-gray-100">
            <Target className="h-6 w-6 text-gray-700" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xl">
              Daily Nutrition Goals
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Track your nutritional targets
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 bg-gray-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#FD853A]">
                  <span className="font-bold text-white text-sm">C</span>
                </div>
                <p className="font-bold text-gray-900 text-lg">Calories</p>
              </div>
              <p className="mb-2 font-bold text-4xl text-gray-900">
                {userProfile.nutritionGoals.dailyCalories}
              </p>
              <p className="text-gray-600 text-sm">kcal/day</p>
            </div>

            <div className="border border-gray-200 bg-gray-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#FD853A]">
                  <span className="font-bold text-white text-sm">P</span>
                </div>
                <p className="font-bold text-gray-900 text-lg">Protein</p>
              </div>
              <p className="mb-2 font-bold text-4xl text-gray-900">
                {userProfile.nutritionGoals.minProtein}
              </p>
              <p className="text-gray-600 text-sm">g/day</p>
            </div>

            <div className="border border-gray-200 bg-gray-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#FD853A]">
                  <span className="font-bold text-white text-sm">C</span>
                </div>
                <p className="font-bold text-gray-900 text-lg">Carbs</p>
              </div>
              <p className="mb-2 font-bold text-4xl text-gray-900">
                {userProfile.nutritionGoals.maxCarbs}
              </p>
              <p className="text-gray-600 text-sm">g/day</p>
            </div>

            <div className="border border-gray-200 bg-gray-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#FD853A]">
                  <span className="font-bold text-white text-sm">F</span>
                </div>
                <p className="font-bold text-gray-900 text-lg">Fats</p>
              </div>
              <p className="mb-2 font-bold text-4xl text-gray-900">
                {userProfile.nutritionGoals.maxFats}
              </p>
              <p className="text-gray-600 text-sm">g/day</p>
            </div>
          </div>

          <Button
            className="w-full bg-[#FD853A] hover:bg-[#E8743A] py-4 font-semibold text-white"
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
