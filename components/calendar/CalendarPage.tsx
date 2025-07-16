'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { smartMealPlanner } from '@/lib/smart-meal-planner';
import type { MealPlan } from '@/lib/types';
import { Calendar, RefreshCw, Settings, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import MealCard from './MealCard';

interface MealPlanData {
  day: string;
  date: string;
  recipe: {
    name: string;
  };
  isAvailable?: boolean;
  missingIngredients?: string[];
}

export default function CalendarPage() {
  const [currentPlan, setCurrentPlan] = useState<MealPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  // Generate current week dates
  useEffect(() => {
    const today = new Date();
    const currentWeek: string[] = [];
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      currentWeek.push(date.toISOString().split('T')[0]);
    }

    setWeekDays(currentWeek);
  }, []);

  // Load existing meal plan
  useEffect(() => {
    const existingPlan = smartMealPlanner.getCurrentMealPlan();
    if (existingPlan) {
      setCurrentPlan(existingPlan);
    }
  }, []);

  // Generate new meal plan
  const handleGenerateMealPlan = async (type: 'weekly' | 'monthly') => {
    setIsGenerating(true);
    try {
      const today = new Date();
      const startDate = today.toISOString().split('T')[0];

      const endDate = new Date(today);
      if (type === 'weekly') {
        endDate.setDate(today.getDate() + 6);
      } else {
        endDate.setMonth(today.getMonth() + 1);
      }

      const plan = await smartMealPlanner.generateMealPlan(
        startDate,
        endDate.toISOString().split('T')[0],
        type
      );
      setCurrentPlan(plan);
    } catch {
      // Handle error silently for now
    } finally {
      setIsGenerating(false);
    }
  };

  // Convert date to meal plan data
  const convertToMealPlanData = (date: string): MealPlanData => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayIndex = new Date(date).getDay();
    const dayName = dayNames[dayIndex];

    // Find meal for this date
    const meal = currentPlan?.meals.find((m) => m.date === date);
    if (!meal) {
      return {
        day: dayName,
        date,
        recipe: { name: 'No menu yet' },
      };
    }

    return {
      day: dayName,
      date,
      recipe: meal.recipe,
      isAvailable: meal.isAvailable,
      missingIngredients: meal.missingIngredients || [],
    };
  };

  // Create meal plan data for display
  const mealPlanData: MealPlanData[] = weekDays.map((date) =>
    convertToMealPlanData(date)
  );

  const mealsInView =
    currentPlan?.meals.filter((meal) => weekDays.includes(meal.date)) ?? [];
  const readyMealsInView = mealsInView.filter(
    (m) =>
      m.isAvailable &&
      (!m.missingIngredients || m.missingIngredients.length === 0)
  );

  const handleMealClick = (_meal: MealPlanData) => {
    // TODO: Implement meal click navigation
  };

  // Onboarding screen
  if (!(currentPlan || isGenerating)) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-md px-6 py-12">
          <div className="text-center">
            <div className="mb-8">
              <Sparkles className="mx-auto mb-6 h-12 w-12 text-gray-900" />
              <h1 className="mb-4 font-medium text-2xl text-gray-900 tracking-tight">
                Calendar
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Automatically schedule weekly or monthly cooking menus based on
                your preferences and available ingredients.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                className="h-12 w-full font-medium"
                disabled={isGenerating}
                onClick={() => handleGenerateMealPlan('weekly')}
                size="lg"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Create Weekly Plan
              </Button>
              <Button
                className="h-12 w-full font-medium"
                disabled={isGenerating}
                onClick={() => handleGenerateMealPlan('monthly')}
                size="lg"
                variant="outline"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Create Monthly Plan
              </Button>
            </div>

            <Button
              className="mt-6 w-full"
              onClick={() => {
                // TODO: Open preferences dialog
              }}
              variant="ghost"
            >
              <Settings className="mr-2 h-4 w-4" />
              Set Preferences
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading screen
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-md px-6 py-12">
          <div className="text-center">
            <RefreshCw className="mx-auto mb-6 h-8 w-8 animate-spin text-gray-900" />
            <h2 className="mb-2 font-medium text-gray-900 text-xl">
              Creating your menu...
            </h2>
            <p className="text-gray-600">
              Our AI is preparing a menu based on your preferences
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {[
              'skeleton-1',
              'skeleton-2',
              'skeleton-3',
              'skeleton-4',
              'skeleton-5',
              'skeleton-6',
              'skeleton-7',
            ].map((id) => (
              <div
                className="h-16 animate-pulse rounded-lg bg-gray-100"
                key={id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main calendar view
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-4">
        {/* Header */}
        {currentPlan && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-[18px]">{currentPlan.name}</h1>
              <Button
                disabled={isGenerating}
                onClick={() => handleGenerateMealPlan(currentPlan.type)}
                size="sm"
                variant="outline"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Badge className="text-sm" variant="outline">
                {mealsInView.length} meals
              </Badge>
              <Badge className="text-sm" variant="secondary">
                {readyMealsInView.length} ready to cook
              </Badge>
            </div>
          </div>
        )}

        {/* Weekly meal plan list */}
        <div className="space-y-2">
          {mealPlanData.map((meal) => (
            <div key={meal.date}>
              <div className="flex items-center gap-4 py-1">
                <div className="w-16 shrink-0">
                  <span className="font-medium text-gray-500 text-sm">
                    {meal.day}
                  </span>
                </div>
                <div className="relative flex-1">
                  <MealCard
                    onClick={() => handleMealClick(meal)}
                    recipe={meal.recipe}
                  />
                  {/* Availability indicator */}
                  {meal.isAvailable !== undefined && (
                    <div className="absolute top-2 right-2">
                      <Badge
                        className="text-xs"
                        variant={meal.isAvailable ? 'secondary' : 'destructive'}
                      >
                        {meal.isAvailable
                          ? 'Ready'
                          : `Needs ${meal.missingIngredients?.length || 0} ingredients`}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
