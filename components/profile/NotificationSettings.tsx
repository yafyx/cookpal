"use client";

import { useState } from "react";
import {
  Bell,
  BellOff,
  Clock,
  Heart,
  Utensils,
  Activity,
  Target,
  Smartphone,
  Check,
  X,
  Settings,
  Shield,
  Volume2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: any;
  enabled: boolean;
  category: "health" | "meals" | "goals" | "social";
  timing?: string;
}

interface NotificationSettingsProps {
  settings: NotificationSetting[];
  onToggleSettingAction: (id: string) => void;
  onUpdateTimingAction: (id: string, timing: string) => void;
}

export default function NotificationSettings({
  settings,
  onToggleSettingAction,
  onUpdateTimingAction,
}: NotificationSettingsProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = {
    health: {
      name: "Health & Activity",
      icon: Heart,
      color: "bg-gradient-to-br from-red-500 to-red-600",
      bgColor: "from-red-50 to-pink-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
    meals: {
      name: "Meal Planning",
      icon: Utensils,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
    },
    goals: {
      name: "Goals & Progress",
      icon: Target,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    social: {
      name: "Social & Sharing",
      icon: Smartphone,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
    },
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, NotificationSetting[]>);

  const enabledCount = settings.filter((s) => s.enabled).length;

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Notification Settings
              </h3>
              <p className="text-sm text-gray-500 font-normal">
                Customize your alerts and reminders
              </p>
            </div>
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-purple-50 text-purple-700 border-purple-200 font-semibold"
          >
            {enabledCount} active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Actions */}
        <div className="flex gap-3 pb-6 border-b border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              settings.forEach((s) => !s.enabled && onToggleSettingAction(s.id))
            }
            className="flex-1 border-gray-300 hover:bg-gray-50 font-semibold"
          >
            <Bell className="h-4 w-4 mr-2" />
            Enable All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              settings.forEach((s) => s.enabled && onToggleSettingAction(s.id))
            }
            className="flex-1 border-gray-300 hover:bg-gray-50 font-semibold"
          >
            <BellOff className="h-4 w-4 mr-2" />
            Disable All
          </Button>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {Object.entries(categories).map(([categoryKey, category]) => {
            const categorySettings = groupedSettings[categoryKey] || [];
            const enabledInCategory = categorySettings.filter(
              (s) => s.enabled
            ).length;
            const IconComponent = category.icon;
            const isExpanded = expandedCategory === categoryKey;

            return (
              <div
                key={categoryKey}
                className={`border rounded-xl bg-gradient-to-r ${category.bgColor} ${category.borderColor}`}
              >
                <div
                  className="p-5 cursor-pointer hover:bg-white/30 transition-colors"
                  onClick={() =>
                    setExpandedCategory(isExpanded ? null : categoryKey)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 ${category.color} rounded-xl flex items-center justify-center shadow-sm`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {category.name}
                        </h4>
                        <p
                          className={`text-sm font-medium ${category.textColor}`}
                        >
                          {enabledInCategory} of {categorySettings.length}{" "}
                          enabled
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          enabledInCategory > 0 ? "secondary" : "outline"
                        }
                        className={`font-semibold ${
                          enabledInCategory > 0
                            ? `bg-green-50 text-green-700 border-green-200`
                            : `border-gray-300 text-gray-600`
                        }`}
                      >
                        {enabledInCategory > 0 ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {isExpanded ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Settings className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 space-y-4">
                    {categorySettings.map((setting) => {
                      const SettingIcon = setting.icon;
                      return (
                        <div
                          key={setting.id}
                          className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-white/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
                              <SettingIcon
                                className={`h-5 w-5 ${category.textColor}`}
                              />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-bold text-gray-900">
                                {setting.title}
                              </h5>
                              <p className="text-sm text-gray-600 font-medium">
                                {setting.description}
                              </p>
                              {setting.timing && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Clock className="h-3 w-3 text-gray-500" />
                                  <span className="text-xs text-gray-500 font-medium">
                                    {setting.timing}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {setting.timing && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // This would open a time picker in a real app
                                  const newTiming = prompt(
                                    "Set timing:",
                                    setting.timing
                                  );
                                  if (newTiming) {
                                    onUpdateTimingAction(setting.id, newTiming);
                                  }
                                }}
                                className="text-xs border-gray-300 hover:bg-gray-50"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                Edit Time
                              </Button>
                            )}

                            <button
                              onClick={() => onToggleSettingAction(setting.id)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                setting.enabled
                                  ? "bg-gradient-to-r from-green-500 to-green-600"
                                  : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  setting.enabled
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Global Settings */}
        <div className="pt-6 border-t border-gray-200">
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-600" />
              Global Notification Settings
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">Do Not Disturb</p>
                  <p className="text-sm text-gray-600">
                    Pause all notifications during quiet hours
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">Sound & Vibration</p>
                  <p className="text-sm text-gray-600">
                    Enable notification sounds and haptic feedback
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">
                    Preview in Lock Screen
                  </p>
                  <p className="text-sm text-gray-600">
                    Show notification content when device is locked
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 border-gray-300 hover:bg-gray-50 font-semibold"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Advanced Notification Settings
            </Button>
          </div>
        </div>

        {settings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              No notification settings
            </h3>
            <p className="text-gray-600">
              Configure your notification preferences to stay updated with your
              health and meal planning.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
