'use client';

import {
  ArrowRight,
  Calendar,
  ChefHat,
  Clock,
  Dumbbell,
  Flame,
  Trophy,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
    <Card className="overflow-hidden border border-border bg-background">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-bold text-foreground text-xl">
            Smart Meal Suggestions
          </CardTitle>
          <Badge
            className="border border-[#FD853A] bg-[#FD853A]/5 px-2.5 py-1 font-medium text-[#FD853A] text-xs"
            variant="outline"
          >
            AI Powered
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Personalized recommendations based on your activity profile
        </p>
      </CardHeader>

      <CardContent className="p-0">
        {/* Activity Detection Alert */}
        {hasRecentWorkout && (
          <div className="border-border border-b bg-gradient-to-b from-[#FD853A]/5 to-transparent p-6 last:border-b-0">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FD853A]">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-base text-foreground">
                    Recent Workout Detected
                  </h3>
                  <Badge
                    className={`${workoutTypeColors[lastWorkout.type]} text-xs`}
                    variant="outline"
                  >
                    {lastWorkout.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Optimize your recovery with these nutrition recommendations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-border bg-card p-3 text-center">
                <div className="mb-1 flex items-center justify-center text-[#FD853A]">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="block font-semibold text-foreground text-lg">
                  {lastWorkout.duration}
                </span>
                <p className="text-muted-foreground text-xs">Minutes</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-3 text-center">
                <div className="mb-1 flex items-center justify-center text-[#FD853A]">
                  <Flame className="h-4 w-4" />
                </div>
                <span className="block font-semibold text-foreground text-lg">
                  {lastWorkout.caloriesBurned}
                </span>
                <p className="text-muted-foreground text-xs">Calories</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-3 text-center">
                <div className="mb-1 flex items-center justify-center text-[#FD853A]">
                  <Dumbbell className="h-4 w-4" />
                </div>
                <span className="block font-semibold text-foreground text-lg capitalize">
                  {lastWorkout.intensity}
                </span>
                <p className="text-muted-foreground text-xs">Intensity</p>
              </div>
            </div>

            {suggestions.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground text-sm">
                    Recovery Nutrition
                  </h4>
                  <Button
                    className="h-8 gap-1 text-[#FD853A] text-xs hover:bg-[#FD853A]/10 hover:text-[#FD853A]"
                    onClick={() => onViewRecipeAction('')}
                    size="sm"
                    variant="ghost"
                  >
                    View All
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upcoming Workout Alert */}
        {upcomingWorkout && (
          <div className="border-border border-b bg-card/50 p-6 last:border-b-0">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FD853A]/10">
                <Calendar className="h-4 w-4 text-[#FD853A]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-base text-foreground">
                    Upcoming {upcomingWorkout.type} Workout
                  </h3>
                  <Badge
                    className="border-border bg-background font-normal text-muted-foreground text-xs"
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
            </div>
            <p className="text-muted-foreground text-sm">
              <span className="font-medium text-foreground">
                {Math.round(
                  (new Date(upcomingWorkout.scheduledAt).getTime() -
                    Date.now()) /
                    (60 * 1000)
                )}{' '}
                minutes
              </span>{' '}
              until your workout. Consider these pre-workout nutrition options
              below.
            </p>
          </div>
        )}

        {suggestions.length === 0 && (
          <div className="p-6 text-center last:border-b-0">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FD853A]/10">
              <ChefHat className="h-6 w-6 text-[#FD853A]" />
            </div>
            <h3 className="mb-2 font-medium text-base text-foreground">
              No Suggestions Available
            </h3>
            <p className="mx-auto max-w-md text-muted-foreground text-sm">
              Connect your health apps and complete a workout to get
              personalized meal recommendations.
            </p>
          </div>
        )}

        {suggestions.length > 0 && !hasRecentWorkout && !upcomingWorkout && (
          <div className="p-6 last:border-b-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground text-sm">
                Recommended Meals
              </h4>
              <Button
                className="h-8 gap-1 text-[#FD853A] text-xs hover:bg-[#FD853A]/10 hover:text-[#FD853A]"
                onClick={() => onViewRecipeAction('')}
                size="sm"
                variant="ghost"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
