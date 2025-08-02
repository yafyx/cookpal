'use client';

import { useState } from 'react';

import {
  AccountSettings,
  HealthIntegration,
  NutritionGoals,
  ProfileHeader,
  SmartMealSuggestions,
} from '@/components/profile';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { Card, CardContent } from '@/components/ui/card';
import { MobileHeader } from '@/components/ui/mobile-header';
import type {
  ActivityContext,
  HealthAppConnections,
  HealthData,
  SmartMealSuggestion,
  UserProfile,
} from '@/lib/types';

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'guest',
    name: 'Guest User',
    email: 'guest@cookpal.com',
    avatar: '',
    joinDate: 'Today',
    healthAppsConnected: {
      googleFit: false,
      appleHealth: false,
    },
    nutritionGoals: {
      dailyCalories: 2000,
      maxCarbs: 200,
      minProtein: 120,
      maxFats: 70,
      balancedMeals: true,
    },
    dietaryPreferences: {
      restrictions: [],
      allergies: [],
      favoriteIngredients: [],
      dislikedIngredients: [],
      culturalPreferences: [],
    },
    activityLevel: 'moderately-active',
    healthMetrics: {
      currentWeight: 0,
      targetWeight: 0,
      height: 0,
      age: 0,
      bmi: 0,
    },
  });

  const [healthData] = useState<HealthData>({
    steps: 8472,
    caloriesBurned: 342,
    heartRate: 72,
    workoutDuration: 45,
    lastWorkoutTime: '2 hours ago',
    workoutType: 'strength',
    activeMinutes: 28,
  });

  const [activityContext] = useState<ActivityContext>({
    lastWorkout: {
      type: 'strength',
      duration: 45,
      intensity: 'moderate',
      completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      caloriesBurned: 342,
    },
    dailyActivity: {
      steps: 8472,
      activeMinutes: 28,
      sedentaryMinutes: 720, // 12 hours sedentary
    },
  });

  const [mealSuggestions] = useState<SmartMealSuggestion[]>([
    {
      id: '1',
      mealName: 'Post-Workout Protein Bowl',
      suggestedFor: 'post-workout-recovery',
      recipe: {
        id: '1',
        name: 'Greek Yogurt Protein Bowl',
        creator: 'AI Chef',
        image: '/assets/protein-bowl.jpg',
        description: 'High-protein recovery meal',
        nutrition: {
          energy: '450 kcal',
          carbs: '35g',
          proteins: '40g',
          fats: '15g',
        },
        ingredients: [],
      },
      nutritionalBenefits: [
        'High protein for muscle recovery',
        'Complex carbs for glycogen replenishment',
        'Anti-inflammatory ingredients',
        'Rich in electrolytes',
      ],
      timing: {
        optimal: 'post-workout',
        reason:
          'Ideal protein and carb ratio for muscle recovery after strength training',
      },
      healthScore: 9,
      matchedGoals: ['Muscle building', 'Recovery', 'Protein intake'],
    },
    {
      id: '2',
      mealName: 'Energy Smoothie',
      suggestedFor: 'pre-workout-energy',
      recipe: {
        id: '2',
        name: 'Banana Oat Energy Smoothie',
        creator: 'AI Chef',
        image: '/assets/energy-smoothie.jpg',
        description: 'Quick energy boost for workouts',
        nutrition: {
          energy: '220 kcal',
          carbs: '45g',
          proteins: '15g',
          fats: '3g',
        },
        ingredients: [],
      },
      nutritionalBenefits: [
        'Quick-release carbohydrates',
        'Natural sugars for energy',
        'Light and easy to digest',
        'B-vitamins for energy metabolism',
      ],
      timing: {
        optimal: 'pre-workout',
        reason:
          'Light carbs provide sustained energy without causing digestive discomfort',
      },
      healthScore: 8,
      matchedGoals: ['Energy boost', 'Pre-workout fuel', 'Quick nutrition'],
    },
  ]);

  const handleConnectHealthApp = (app: keyof HealthAppConnections) => {
    setUserProfile((prev) => ({
      ...prev,
      healthAppsConnected: {
        ...prev.healthAppsConnected,
        [app]: !prev.healthAppsConnected[app],
      },
    }));
  };

  const handleViewRecipe = (_recipeId: string) => {
    // Navigate to recipe details
  };

  const handlePlanMeal = (_suggestion: SmartMealSuggestion) => {
    // Add to meal planner
  };

  const hasAnyHealthAppConnected = Object.values(
    userProfile.healthAppsConnected
  ).some(Boolean);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <MobileHeader title="Profile" />
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="mx-auto max-w-2xl space-y-6 px-4 py-6">
          {/* Profile Header Card */}
          <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-8">
              <ProfileHeader userProfile={userProfile} />
            </CardContent>
          </Card>

          {/* Health Integration */}
          <HealthIntegration
            healthAppsConnected={userProfile.healthAppsConnected}
            healthData={hasAnyHealthAppConnected ? healthData : undefined}
            onConnectAppAction={handleConnectHealthApp}
          />

          {/* Smart Meal Suggestions - Only show when health apps are connected */}
          {hasAnyHealthAppConnected && (
            <div className="fade-in-50 slide-in-from-bottom-4 animate-in duration-700">
              <SmartMealSuggestions
                activityContext={activityContext}
                onPlanMealAction={handlePlanMeal}
                onViewRecipeAction={handleViewRecipe}
                suggestions={mealSuggestions}
              />
            </div>
          )}

          {/* Nutrition Goals */}
          <NutritionGoals userProfile={userProfile} />

          {/* Account Settings */}
          <AccountSettings />

          {/* Bottom padding for navigation */}
          <div className="h-4" />
        </div>
      </main>
      <BottomNavigation activeTab="profile" />
    </div>
  );
}
