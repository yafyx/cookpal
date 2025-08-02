"use client";

import { useState } from "react";
import {
  Target,
  Trophy,
  Zap,
  Clock,
  Heart,
  TrendingUp,
  ChefHat,
  CheckCircle,
  Calendar,
  ArrowRight,
  Shield,
  Sparkles,
  Activity,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SmartMealSuggestion, ActivityContext, WorkoutType } from "@/lib/types";

interface SmartMealSuggestionsProps {
  activityContext: ActivityContext;
  suggestions: SmartMealSuggestion[];
  onViewRecipeAction: (recipeId: string) => void;
  onPlanMealAction: (suggestion: SmartMealSuggestion) => void;
}

const workoutTypeColors: Record<WorkoutType, string> = {
  cardio: "bg-red-100 text-red-700 border-red-200",
  strength: "bg-blue-100 text-blue-700 border-blue-200",
  yoga: "bg-purple-100 text-purple-700 border-purple-200",
  pilates: "bg-pink-100 text-pink-700 border-pink-200",
  running: "bg-orange-100 text-orange-700 border-orange-200",
  cycling: "bg-green-100 text-green-700 border-green-200",
  swimming: "bg-cyan-100 text-cyan-700 border-cyan-200",
  hiit: "bg-red-100 text-red-700 border-red-200",
  crossfit: "bg-gray-100 text-gray-700 border-gray-200",
  walking: "bg-emerald-100 text-emerald-700 border-emerald-200",
  other: "bg-gray-100 text-gray-700 border-gray-200",
};

const suggestionTypeIcons = {
  "post-workout-recovery": Trophy,
  "pre-workout-energy": Zap,
  "weight-loss": TrendingUp,
  "muscle-building": Target,
  "endurance-boost": Heart,
  "heart-health": Heart,
  "immune-support": Shield,
  "energy-boost": Zap,
  "sleep-quality": Clock,
};

export default function SmartMealSuggestions({
  activityContext,
  suggestions,
  onViewRecipeAction,
  onPlanMealAction,
}: SmartMealSuggestionsProps) {
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(
    null
  );

  const lastWorkout = activityContext.lastWorkout;
  const upcomingWorkout = activityContext.upcomingWorkout;
  const hasRecentWorkout =
    lastWorkout &&
    new Date(lastWorkout.completedAt).getTime() >
      Date.now() - 4 * 60 * 60 * 1000; // Within 4 hours

  return (
    <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-4">
          <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Smart Meal Suggestions
            </h3>
            <p className="text-sm text-gray-500 font-medium mt-1">
              AI-powered recommendations based on your activity
            </p>
          </div>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-orange-200/60 font-semibold px-3 py-1.5 shadow-sm"
          >
            <Sparkles className="h-3 w-3 mr-1.5" />
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Activity Detection Alert */}
        {hasRecentWorkout && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-green-800 text-lg">
                    Workout Detected!
                  </span>
                  <Badge
                    variant="outline"
                    className={`${
                      workoutTypeColors[lastWorkout.type]
                    } font-semibold`}
                  >
                    {lastWorkout.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-green-600 font-medium">
                  Perfect timing for recovery nutrition!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white/60 rounded-lg p-3 text-center border border-green-200">
                <span className="text-xl font-bold text-green-800 block">
                  {lastWorkout.duration}min
                </span>
                <p className="text-xs text-green-600 font-medium">Duration</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center border border-green-200">
                <span className="text-xl font-bold text-green-800 block">
                  {lastWorkout.caloriesBurned}
                </span>
                <p className="text-xs text-green-600 font-medium">
                  Calories burned
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center border border-green-200">
                <span className="text-xl font-bold text-green-800 block capitalize">
                  {lastWorkout.intensity}
                </span>
                <p className="text-xs text-green-600 font-medium">Intensity</p>
              </div>
            </div>
            <p className="text-sm text-green-700 font-medium">
              Here are personalized meal recommendations to optimize your
              recovery and fuel your next workout!
            </p>
          </div>
        )}

        {/* Upcoming Workout Alert */}
        {upcomingWorkout && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <span className="font-bold text-blue-800 text-lg">
                  Upcoming Workout
                </span>
                <Badge
                  variant="outline"
                  className="text-blue-700 border-blue-300 ml-2 font-semibold"
                >
                  {new Date(upcomingWorkout.scheduledAt).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-blue-700 font-medium">
              {upcomingWorkout.type} workout in{" "}
              <span className="font-bold">
                {Math.round(
                  (new Date(upcomingWorkout.scheduledAt).getTime() -
                    Date.now()) /
                    (60 * 1000)
                )}{" "}
                minutes
              </span>
              . Consider pre-workout nutrition below.
            </p>
          </div>
        )}

        {/* Meal Suggestions */}
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const isExpanded = expandedSuggestion === suggestion.id;
            const SuggestionIcon =
              suggestionTypeIcons[suggestion.suggestedFor] || ChefHat;

            return (
              <div
                key={suggestion.id}
                className="border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-lg transition-all duration-200"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                          <SuggestionIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">
                            {suggestion.mealName}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs border-orange-300 text-orange-700 font-semibold"
                            >
                              {suggestion.timing.optimal.replace("-", " ")}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                            >
                              <Star className="h-3 w-3 mr-1" />
                              {suggestion.healthScore}/10
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 font-medium">
                        {suggestion.timing.reason}
                      </p>

                      {/* Health Score Visual */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-2 rounded-full transition-colors ${
                                  i < Math.round(suggestion.healthScore / 2)
                                    ? "bg-gradient-to-r from-green-400 to-green-500"
                                    : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-700">
                            Health Score
                          </span>
                        </div>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <span className="font-semibold text-orange-600">
                          {suggestion.recipe.nutrition.energy}
                        </span>
                        <span className="font-semibold text-blue-600">
                          {suggestion.recipe.nutrition.proteins} protein
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedSuggestion(isExpanded ? null : suggestion.id)
                      }
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                      {isExpanded ? "Less" : "More"}
                    </Button>
                  </div>

                  {/* Nutritional Benefits */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestion.nutritionalBenefits
                      .slice(0, 3)
                      .map((benefit, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-green-50 text-green-700 border-green-200 font-medium"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {benefit}
                        </Badge>
                      ))}
                    {suggestion.nutritionalBenefits.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-300 text-gray-600 font-medium"
                      >
                        +{suggestion.nutritionalBenefits.length - 3} more
                        benefits
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onViewRecipeAction(suggestion.recipe.id)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg"
                    >
                      <ChefHat className="h-4 w-4 mr-2" />
                      View Recipe
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPlanMealAction(suggestion)}
                      className="flex-1 border-gray-300 hover:bg-gray-50 font-semibold"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Plan Meal
                    </Button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-gray-200 space-y-5">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <h5 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          Why this meal?
                        </h5>
                        <ul className="text-sm space-y-2">
                          {suggestion.nutritionalBenefits.map(
                            (benefit, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-3 text-blue-800"
                              >
                                <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                <span className="font-medium">{benefit}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                        <h5 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Matched Goals
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.matchedGoals.map((goal, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-purple-300 text-purple-700 font-medium"
                            >
                              <Target className="h-3 w-3 mr-1" />
                              {goal}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                        <h5 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          Nutrition Facts
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="text-center p-3 bg-white/60 rounded-lg border border-green-200">
                            <p className="text-lg font-bold text-green-800">
                              {suggestion.recipe.nutrition.energy}
                            </p>
                            <p className="text-xs text-green-600 font-medium">
                              Calories
                            </p>
                          </div>
                          <div className="text-center p-3 bg-white/60 rounded-lg border border-green-200">
                            <p className="text-lg font-bold text-green-800">
                              {suggestion.recipe.nutrition.proteins}
                            </p>
                            <p className="text-xs text-green-600 font-medium">
                              Protein
                            </p>
                          </div>
                          <div className="text-center p-3 bg-white/60 rounded-lg border border-green-200">
                            <p className="text-lg font-bold text-green-800">
                              {suggestion.recipe.nutrition.carbs}
                            </p>
                            <p className="text-xs text-green-600 font-medium">
                              Carbs
                            </p>
                          </div>
                          <div className="text-center p-3 bg-white/60 rounded-lg border border-green-200">
                            <p className="text-lg font-bold text-green-800">
                              {suggestion.recipe.nutrition.fats}
                            </p>
                            <p className="text-xs text-green-600 font-medium">
                              Fats
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {suggestions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChefHat className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">
              No suggestions yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Connect your health apps and complete a workout to get
              personalized meal suggestions based on your activity and goals
            </p>
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-5 max-w-sm mx-auto">
              <h4 className="font-bold text-gray-900 mb-3">What you'll get:</h4>
              <ul className="text-sm text-gray-700 space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Post-workout recovery meals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Pre-workout energy boosters
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Goal-specific nutrition plans
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Personalized timing recommendations
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* View All Button */}
        {suggestions.length > 0 && (
          <Button variant="outline" className="w-full">
            View All Suggestions
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
