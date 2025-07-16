import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { smartMealPlanner } from '@/lib/smart-meal-planner';
import type { MealPlanPreferences } from '@/lib/types';
import { useEffect, useState } from 'react';

interface MealPlanPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MealPlanPreferencesDialog({
  open,
  onOpenChange,
}: MealPlanPreferencesDialogProps) {
  const [preferences, setPreferences] = useState<MealPlanPreferences>({
    dietaryRestrictions: [],
    maxCookingTime: 60,
    mealsPerDay: 3,
    nutritionGoals: {
      dailyCalories: 2000,
      maxCarbs: 250,
      minProtein: 50,
      maxFats: 65,
      balancedMeals: true,
    },
    favoriteIngredients: [],
    avoidIngredients: [],
    preferredMealTypes: ['lunch', 'dinner'],
    cookingSkillLevel: 'intermediate',
  });

  // Load current preferences on mount
  useEffect(() => {
    if (open) {
      const currentPreferences = smartMealPlanner.getPreferences();
      setPreferences(currentPreferences);
    }
  }, [open]);

  const handleSave = () => {
    smartMealPlanner.updatePreferences(preferences);
    onOpenChange(false);
  };

  const handleMealTypeChange = (mealType: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      preferredMealTypes: checked
        ? [...prev.preferredMealTypes, mealType]
        : prev.preferredMealTypes.filter((type) => type !== mealType),
    }));
  };

  const mealTypes = [
    { value: 'breakfast', label: 'Sarapan' },
    { value: 'lunch', label: 'Makan Siang' },
    { value: 'dinner', label: 'Makan Malam' },
    { value: 'snack', label: 'Camilan' },
  ];

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Preferensi Meal Planning</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Pengaturan Dasar</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-medium text-sm" htmlFor="maxCookingTime">
                  Waktu Memasak Maksimal (menit)
                </label>
                <Input
                  id="maxCookingTime"
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      maxCookingTime: Number.parseInt(e.target.value, 10) || 60,
                    }))
                  }
                  type="number"
                  value={preferences.maxCookingTime}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium text-sm" htmlFor="mealsPerDay">
                  Jumlah Makanan per Hari
                </label>
                <Input
                  id="mealsPerDay"
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      mealsPerDay: Number.parseInt(e.target.value, 10) || 3,
                    }))
                  }
                  type="number"
                  value={preferences.mealsPerDay}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-sm" htmlFor="skillLevel">
                Tingkat Kemampuan Memasak
              </label>
              <Select
                onValueChange={(value) =>
                  setPreferences((prev) => ({
                    ...prev,
                    cookingSkillLevel: value as
                      | 'beginner'
                      | 'intermediate'
                      | 'advanced',
                  }))
                }
                value={preferences.cookingSkillLevel}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Pemula</SelectItem>
                  <SelectItem value="intermediate">Menengah</SelectItem>
                  <SelectItem value="advanced">Mahir</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Meal Types */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Tipe Makanan</h3>
            <div className="grid grid-cols-2 gap-4">
              {mealTypes.map((mealType) => (
                <div
                  className="flex items-center space-x-2"
                  key={mealType.value}
                >
                  <Checkbox
                    checked={preferences.preferredMealTypes.includes(
                      mealType.value
                    )}
                    id={mealType.value}
                    onCheckedChange={(checked) =>
                      handleMealTypeChange(mealType.value, checked as boolean)
                    }
                  />
                  <label
                    className="font-medium text-sm"
                    htmlFor={mealType.value}
                  >
                    {mealType.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Goals */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Target Nutrisi</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-medium text-sm" htmlFor="dailyCalories">
                  Kalori Harian
                </label>
                <Input
                  id="dailyCalories"
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      nutritionGoals: {
                        ...prev.nutritionGoals,
                        dailyCalories:
                          Number.parseInt(e.target.value, 10) || 2000,
                      },
                    }))
                  }
                  type="number"
                  value={preferences.nutritionGoals.dailyCalories}
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium text-sm" htmlFor="minProtein">
                  Protein Minimal (g)
                </label>
                <Input
                  id="minProtein"
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      nutritionGoals: {
                        ...prev.nutritionGoals,
                        minProtein: Number.parseInt(e.target.value, 10) || 50,
                      },
                    }))
                  }
                  type="number"
                  value={preferences.nutritionGoals.minProtein}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Batal
          </Button>
          <Button onClick={handleSave}>Simpan Preferensi</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
