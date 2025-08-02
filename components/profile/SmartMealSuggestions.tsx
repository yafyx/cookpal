'use client';

import { ArrowRight, Calendar, ChefHat, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type {
  ActivityContext,
  SmartMealSuggestion,
  WorkoutType,
} from '@/lib/types';

interface SmartMealSuggestionsProps {
  activityContext: ActivityContext;
  suggestions: SmartMealSuggestion[];
  onViewRecipeAction: (recipeId: string) => void;
  onPlanMealAction: (suggestion: SmartMealSuggestion) => void;
}

const workoutTypeColors: Record<WorkoutType, string> = {
  cardio: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
  strength: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
  yoga: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
  pilates: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
  running: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
  cycling: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
  swimming: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
  hiit: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
  crossfit: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
  walking: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
  other: 'border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A]',
};

export default function SmartMealSuggestions({
  activityContext,
  suggestions,
  onViewRecipeAction,
  onPlanMealAction,
}: SmartMealSuggestionsProps) {
  const lastWorkout = activityContext.lastWorkout;
  const upcomingWorkout = activityContext.upcomingWorkout;
  const hasRecentWorkout =
    lastWorkout &&
    new Date(lastWorkout.completedAt).getTime() >
      Date.now() - 4 * 60 * 60 * 1000; // Within 4 hours

  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center bg-gray-100">
            <ChefHat className="h-6 w-6 text-gray-700" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-xl">
              Smart Meal Suggestions
            </h3>
            <p className="mt-1 text-gray-600 text-sm">
              AI-powered recommendations based on your activity
            </p>
          </div>
          <Badge
            className="border border-[#FD853A] bg-[#FD853A]/10 px-3 py-1 font-medium text-[#FD853A]"
            variant="outline"
          >
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Activity Detection Alert */}
        {hasRecentWorkout && (
          <div className="border border-[#FD853A]/20 bg-[#FD853A]/5 p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-[#FD853A]">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-3">
                  <span className="font-bold text-gray-900 text-lg">
                    Workout Detected
                  </span>
                  <Badge
                    className={`${
                      workoutTypeColors[lastWorkout.type]
                    } font-medium`}
                    variant="outline"
                  >
                    {lastWorkout.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm">
                  Perfect timing for recovery nutrition
                </p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="border border-gray-200 bg-white p-4 text-center">
                <span className="block font-bold text-2xl text-gray-900">
                  {lastWorkout.duration}
                </span>
                <p className="font-medium text-gray-600 text-xs">Min</p>
              </div>
              <div className="border border-gray-200 bg-white p-4 text-center">
                <span className="block font-bold text-2xl text-gray-900">
                  {lastWorkout.caloriesBurned}
                </span>
                <p className="font-medium text-gray-600 text-xs">Calories</p>
              </div>
              <div className="border border-gray-200 bg-white p-4 text-center">
                <span className="block font-bold text-2xl text-gray-900 capitalize">
                  {lastWorkout.intensity}
                </span>
                <p className="font-medium text-gray-600 text-xs">Intensity</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Here are personalized meal recommendations to optimize your
              recovery and fuel your next workout.
            </p>
            <div className="mt-4">
              <Button
                className="w-full bg-[#FD853A] font-medium text-white hover:bg-[#E8743A]"
                onClick={() => onViewRecipeAction('')}
                size="sm"
              >
                See More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Upcoming Workout Alert */}
        {upcomingWorkout && (
          <div className="border border-gray-200 bg-gray-50 p-6">
            <div className="mb-3 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-[#FD853A]">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="font-bold text-gray-900 text-lg">
                  Upcoming Workout
                </span>
                <Badge
                  className="ml-3 border border-gray-300 bg-white font-medium text-gray-700"
                  variant="outline"
                >
                  {new Date(upcomingWorkout.scheduledAt).toLocaleTimeString(
                    [],
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </Badge>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              {upcomingWorkout.type} workout in{' '}
              <span className="font-bold">
                {Math.round(
                  (new Date(upcomingWorkout.scheduledAt).getTime() -
                    Date.now()) /
                    (60 * 1000)
                )}{' '}
                minutes
              </span>
              . Consider pre-workout nutrition below.
            </p>
          </div>
        )}

        {suggestions.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-gray-100">
              <ChefHat className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="mb-2 font-bold text-gray-900 text-lg">
              No Suggestions Available
            </h3>
            <p className="mx-auto max-w-md text-gray-600 text-sm">
              Connect your health apps and complete a workout to get
              personalized meal recommendations.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
