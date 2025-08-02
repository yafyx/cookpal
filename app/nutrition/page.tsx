"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/ui/bottom-navigation";
import { Button } from "@/components/ui/button";
import { MobileHeader } from "@/components/ui/mobile-header";

// Mock data for nutrition chart
const nutritionData = [
  { day: "Su", protein: 45, carbs: 120, fat: 65 },
  { day: "Mo", protein: 95, carbs: 40, fat: 25 },
  { day: "Tu", protein: 110, carbs: 85, fat: 45 },
  { day: "We", protein: 35, carbs: 65, fat: 30 },
  { day: "Th", protein: 80, carbs: 110, fat: 70 },
  { day: "Fr", protein: 125, carbs: 55, fat: 35 },
  { day: "Sa", protein: 60, carbs: 95, fat: 55 },
];

const maxValue = Math.max(
  ...nutritionData.map((d) => d.protein + d.carbs + d.fat)
);

export default function NutritionPage() {
  const router = useRouter();

  const handleBrowseMeal = () => {
    router.push("/recipes");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <MobileHeader title="Nutrition" />

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 pb-20">
        <div className="flex flex-col gap-7">
          {/* Nutrition Score Section */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-center">
              <div className="font-semibold text-4xl text-[#fd853a] tracking-tight">
                67.3
              </div>
              <div className="font-semibold text-black text-lg">
                Nutrition Score
              </div>
              <div className="text-black text-sm">
                You need more protein intake this week
              </div>
            </div>
          </div>

          {/* Nutrition Chart */}
          <div className="flex flex-col gap-1">
            {/* Chart Container */}
            <div className="h-[178px] rounded-xl bg-gray-50 p-4">
              <div className="relative h-full w-full">
                {/* Y-axis lines */}
                <div className="absolute top-0 right-0 left-0 h-full w-full">
                  {new Array(6).fill(null).map((_, i) => (
                    <div
                      className="absolute right-0 left-0 border-gray-200 border-b"
                      key={`y-axis-line-${i * 20}`}
                      style={{ top: `${i * 20}%` }}
                    />
                  ))}
                </div>

                {/* Chart bars */}
                <div className="absolute right-4 bottom-8 left-8 flex items-end justify-between">
                  {nutritionData.map((data) => (
                    <div
                      className="flex flex-col items-center gap-1"
                      key={data.day}
                    >
                      {/* Stacked bars */}
                      <div className="relative h-[110px] w-3 rounded-t-md overflow-hidden">
                        {/* Fat bar (orange) - bottom layer */}
                        <div
                          className="absolute bottom-0 w-full bg-[#fd853a]"
                          style={{
                            height: `${
                              (data.fat /
                                (data.protein + data.carbs + data.fat)) *
                              ((data.protein + data.carbs + data.fat) /
                                maxValue) *
                              100
                            }%`,
                          }}
                        />
                        {/* Carbs bar (yellow) - middle layer */}
                        <div
                          className="absolute w-full bg-[#f2bf23]"
                          style={{
                            bottom: `${
                              (data.fat /
                                (data.protein + data.carbs + data.fat)) *
                              ((data.protein + data.carbs + data.fat) /
                                maxValue) *
                              100
                            }%`,
                            height: `${
                              (data.carbs /
                                (data.protein + data.carbs + data.fat)) *
                              ((data.protein + data.carbs + data.fat) /
                                maxValue) *
                              100
                            }%`,
                          }}
                        />
                        {/* Protein bar (green) - top layer */}
                        <div
                          className="absolute w-full rounded-t-md bg-[#5ff13a]"
                          style={{
                            bottom: `${
                              ((data.fat + data.carbs) /
                                (data.protein + data.carbs + data.fat)) *
                              ((data.protein + data.carbs + data.fat) /
                                maxValue) *
                              100
                            }%`,
                            height: `${
                              (data.protein /
                                (data.protein + data.carbs + data.fat)) *
                              ((data.protein + data.carbs + data.fat) /
                                maxValue) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Day labels */}
                <div className="absolute right-4 bottom-0 left-8 flex justify-between font-semibold text-black text-sm">
                  {nutritionData.map((data) => (
                    <div key={data.day}>{data.day}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="font-semibold text-black text-lg">
                Recommendation to eat
              </div>
              <div className="mt-2 max-w-[247px] text-[#535862] text-sm">
                There's no recommendation for now yet. Seems like you have
                fulfill the nutrition for today!
              </div>
            </div>

            {/* Floating meal cards */}
            <div className="relative h-[84px] w-[82px]">
              {/* Main card */}
              <div className="absolute top-[-4px] left-0 rounded-3xl border border-gray-200 bg-white shadow-lg">
                <div className="p-2">
                  <div
                    className="h-[68px] w-[66px] rounded-2xl bg-center bg-cover bg-gradient-to-b from-transparent to-black/40"
                    style={{
                      backgroundImage: "url('/assets/pastacarbonara.png')",
                    }}
                  />
                </div>
              </div>

              {/* Rotated card 1 */}
              <div className="absolute top-[-6.12px] left-[12.5px] flex h-[96px] w-[95px] items-center justify-center">
                <div className="rotate-[350.622deg]">
                  <div className="rounded-3xl border border-gray-200 bg-white shadow-lg">
                    <div className="p-2">
                      <div
                        className="h-[68px] w-[66px] rounded-2xl bg-center bg-cover bg-gradient-to-b from-transparent to-black/40"
                        style={{
                          backgroundImage: "url('/assets/surfnturf.png')",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rotated card 2 */}
              <div className="absolute top-[-9.18px] left-[-24.5px] flex h-[102px] w-[101px] items-center justify-center">
                <div className="rotate-[15deg]">
                  <div className="rounded-3xl border border-gray-200 bg-white shadow-lg">
                    <div className="p-2">
                      <div
                        className="h-[68px] w-[66px] rounded-2xl bg-center bg-cover bg-gradient-to-b from-transparent to-black/40"
                        style={{
                          backgroundImage: "url('/assets/pastacarbonara.png')",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Browse meal button */}
            <Button
              className="rounded-lg bg-[#181d27] px-5 py-2 font-semibold text-[#fdfdfd] text-base hover:bg-[#282d37]"
              onClick={handleBrowseMeal}
            >
              Browse meal
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </div>
  );
}
