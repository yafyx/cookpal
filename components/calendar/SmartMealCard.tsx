import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { PlannedMeal } from '@/lib/types';
import { AlertCircle, Clock, Star } from 'lucide-react';
import type React from 'react';

interface SmartMealCardProps {
  meal: PlannedMeal;
  onClick?: () => void;
}

export function SmartMealCard({ meal, onClick }: SmartMealCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  const getMealTypeVariant = (mealType: string) => {
    if (mealType === 'breakfast') {
      return 'default';
    }
    if (mealType === 'lunch') {
      return 'secondary';
    }
    return 'outline';
  };

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        meal.isAvailable ? 'border-gray-200' : 'border-orange-200 bg-orange-50'
      }`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <CardContent className="p-3">
        <div className="space-y-2">
          {/* Meal Type Badge */}
          <div className="flex items-center justify-between">
            <Badge
              className="text-xs capitalize"
              variant={getMealTypeVariant(meal.mealType)}
            >
              {meal.mealType}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span className="text-gray-500 text-xs">
                {meal.nutritionScore}
              </span>
            </div>
          </div>

          {/* Recipe Name */}
          <h4 className="line-clamp-2 font-medium text-gray-900 text-sm">
            {meal.recipe.name}
          </h4>

          {/* Preparation Time */}
          <div className="flex items-center space-x-1 text-gray-500 text-xs">
            <Clock className="h-3 w-3" />
            <span>{meal.preparationTime}</span>
          </div>

          {/* Availability Status */}
          {!meal.isAvailable && meal.missingIngredients.length > 0 && (
            <div className="flex items-center space-x-1 text-orange-600 text-xs">
              <AlertCircle className="h-3 w-3" />
              <span>Butuh {meal.missingIngredients.length} bahan</span>
            </div>
          )}

          {/* Nutrition Info */}
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>{meal.recipe.nutrition.energy}</span>
            <span>{meal.recipe.nutrition.proteins} protein</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
