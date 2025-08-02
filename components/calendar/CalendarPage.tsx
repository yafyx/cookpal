'use client';

import { Button } from '@/components/ui/button';
import { smartMealPlanner } from '@/lib/smart-meal-planner';
import type { Meal, MealPlan } from '@/lib/types';
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import MealCard from './MealCard';

export default function CalendarPage() {
  const [currentPlan, setCurrentPlan] = useState<MealPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: endOfWeek(currentDate),
  });

  const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const prevWeek = () => setCurrentDate(addDays(currentDate, -7));

  useEffect(() => {
    const existingPlan = smartMealPlanner.getCurrentMealPlan();
    if (existingPlan) {
      setCurrentPlan(existingPlan);
    }
  }, []);

  const handleGenerateMealPlan = async () => {
    setIsGenerating(true);
    try {
      const today = new Date();
      const startDate = today.toISOString().split('T')[0];

      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 6);

      const plan = await smartMealPlanner.generateMealPlan(
        startDate,
        endDate.toISOString().split('T')[0],
        'weekly'
      );
      setCurrentPlan(plan);
    } catch {
      // Handle error silently for now
    } finally {
      setIsGenerating(false);
    }
  };

  const getMealsForDate = (date: Date): Meal[] => {
    const dateString = format(date, 'yyyy-MM-dd');
    return currentPlan?.meals.filter((m) => m.date === dateString) || [];
  };

  const selectedMeals = getMealsForDate(currentDate);

  if (!(currentPlan || isGenerating)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="p-6 text-center">
          <Sparkles className="mx-auto mb-6 h-12 w-12 text-gray-900" />
          <h1 className="mb-4 font-medium text-2xl text-gray-900 tracking-tight">
            Smart Meal Planner
          </h1>
          <p className="mb-8 text-gray-600 leading-relaxed">
            Auto-generates weekly/monthly menus via Cooking Calendar
          </p>
          <Button
            className="h-12 w-full font-medium"
            disabled={isGenerating}
            onClick={handleGenerateMealPlan}
            size="lg"
          >
            Create Weekly Plan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-4 flex w-full flex-col items-start justify-start">
          <h1 className="font-semibold text-2xl text-[#2b1203]">
            Smart Meal Planner
          </h1>
          <p className="text-[rgba(34,14,2,0.4)] text-sm">
            Auto-generates weekly/monthly menus via Cooking Calendar
          </p>
        </div>

        <div className="mb-4 flex w-full flex-col items-start justify-start">
          <div className="flex w-full items-center justify-between">
            <h2 className="font-semibold text-[#2b1203] text-lg">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center gap-2">
              <Button onClick={prevWeek} size="icon" variant="outline">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={nextWeek} size="icon" variant="outline">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2 flex w-full justify-between">
            {weekDays.map((day) => (
              <Button
                className={`flex h-auto flex-col items-center p-2 ${
                  format(day, 'yyyy-MM-dd') ===
                  format(currentDate, 'yyyy-MM-dd')
                    ? 'bg-[rgba(253,133,58,0.12)] text-[#fd853a] hover:bg-[rgba(253,133,58,0.2)]'
                    : 'hover:bg-gray-100'
                }`}
                key={day.toString()}
                onClick={() => setCurrentDate(day)}
                variant={
                  format(day, 'yyyy-MM-dd') ===
                  format(currentDate, 'yyyy-MM-dd')
                    ? 'default'
                    : 'ghost'
                }
              >
                <p
                  className={`font-semibold text-lg ${
                    format(day, 'yyyy-MM-dd') ===
                    format(currentDate, 'yyyy-MM-dd')
                      ? 'text-[#fd853a]'
                      : 'text-slate-800'
                  }`}
                >
                  {format(day, 'd')}
                </p>
                <p
                  className={`text-xs ${
                    format(day, 'yyyy-MM-dd') ===
                    format(currentDate, 'yyyy-MM-dd')
                      ? 'text-[#fd853a]'
                      : 'text-slate-400'
                  }`}
                >
                  {format(day, 'E')}
                </p>
              </Button>
            ))}
          </div>
        </div>

        <div className="w-full">
          {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => (
            <div className="mb-4" key={mealType}>
              <h3 className="mb-2 font-semibold text-[#2b1203] text-lg">
                {mealType}
              </h3>
              <div className="flex flex-col gap-2">
                {selectedMeals
                  .filter(
                    (meal) =>
                      meal.mealType.toLowerCase() === mealType.toLowerCase()
                  )
                  .map((meal) => (
                    <MealCard key={meal.recipe.id} recipe={meal.recipe} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
