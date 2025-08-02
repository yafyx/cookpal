"use client";

import { useState } from "react";
import {
  Activity,
  Apple,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Settings,
  Heart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HealthAppConnections, HealthData } from "@/lib/types";

interface HealthIntegrationProps {
  healthAppsConnected: HealthAppConnections;
  healthData?: HealthData;
  onConnectAppAction: (app: keyof HealthAppConnections) => void;
}

const healthApps = [
  {
    id: "googleFit" as const,
    name: "Google Fit",
    description: "Track steps, workouts & calories",
    icon: Activity,
    color: "#4285F4",
    features: [
      "Step counting",
      "Workout tracking",
      "Calorie monitoring",
      "Heart rate data",
    ],
  },
  {
    id: "appleHealth" as const,
    name: "Apple Health",
    description: "Sync heart rate & activity data",
    icon: Apple,
    color: "#FF3B30",
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "Nutrition logging",
      "Mindfulness data",
    ],
  },
];

export default function HealthIntegration({
  healthAppsConnected,
  healthData,
  onConnectAppAction,
}: HealthIntegrationProps) {
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const connectedAppsCount =
    Object.values(healthAppsConnected).filter(Boolean).length;
  const hasAnyConnection = connectedAppsCount > 0;

  return (
    <div className="space-y-6">
      {/* Health Apps Integration Card */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gray-100 rounded-none flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-gray-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">
                Health App Integration
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Connect your fitness apps for personalized insights
              </p>
            </div>
            <Badge
              variant="outline"
              className="border border-gray-300 bg-white text-gray-700 font-medium px-3 py-1"
            >
              {connectedAppsCount} connected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {healthApps.map((app) => {
            const isConnected = healthAppsConnected[app.id];
            const IconComponent = app.icon;

            return (
              <div
                key={app.id}
                className={`border p-6 ${
                  isConnected
                    ? "border-[#FD853A] bg-[#FD853A]/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 flex items-center justify-center"
                      style={{ backgroundColor: app.color }}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg mb-1">
                        {app.name}
                      </p>
                      <p className="text-gray-600 text-sm">{app.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {isConnected && (
                      <Badge
                        variant="outline"
                        className="border border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A] font-medium px-3 py-1"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                    <Button
                      variant={isConnected ? "outline" : "default"}
                      size="sm"
                      onClick={() => onConnectAppAction(app.id)}
                      className={
                        isConnected
                          ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium px-4"
                          : "bg-[#FD853A] text-white font-medium hover:bg-[#E8743A] px-4"
                      }
                    >
                      {isConnected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {app.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border border-gray-300 bg-white text-gray-600 font-normal px-2 py-1"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Connection Status Details */}
                {isConnected && (
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-[#FD853A]" />
                      <span className="font-medium">
                        Syncing data automatically
                      </span>
                      <button
                        className="ml-auto text-gray-600 hover:text-gray-800 p-1"
                        onClick={() =>
                          setShowDetails(showDetails === app.id ? null : app.id)
                        }
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>

                    {showDetails === app.id && (
                      <div className="mt-4 space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between items-center py-2 px-3 bg-white border border-gray-200">
                          <span className="font-medium">Last sync:</span>
                          <span className="text-[#FD853A] font-medium">
                            2 minutes ago
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-white border border-gray-200">
                          <span className="font-medium">Data points:</span>
                          <span className="text-[#FD853A] font-medium">
                            Steps, Heart Rate, Calories
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        >
                          Open {app.name}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {!hasAnyConnection && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">
                No Health Apps Connected
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-base">
                Connect your health apps to get personalized meal suggestions
                based on your activity and fitness data
              </p>
              <div className="bg-gray-50 border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">
                  Benefits of connecting:
                </h4>
                <ul className="text-sm text-gray-700 space-y-3 text-left max-w-sm mx-auto">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#FD853A] flex-shrink-0" />
                    <span>Post-workout meal recommendations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#FD853A] flex-shrink-0" />
                    <span>Calorie-based portion suggestions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#FD853A] flex-shrink-0" />
                    <span>Energy-boosting pre-workout snacks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#FD853A] flex-shrink-0" />
                    <span>Recovery-focused nutrition plans</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Today's Health Summary - Only show if connected */}
      {hasAnyConnection && healthData && (
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 bg-[#FD853A] flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  Today's Health Summary
                </h3>
                <p className="text-sm text-gray-600">
                  Real-time data from your connected apps
                </p>
              </div>
              <Badge
                variant="outline"
                className="border border-[#FD853A] bg-[#FD853A]/10 text-[#FD853A] font-medium"
              >
                Live Data
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-[#FD853A] flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-bold">Steps</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {healthData.steps.toLocaleString()}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <span className="font-medium">Goal: 10,000</span>
                  <span className="font-bold">
                    {Math.round((healthData.steps / 10000) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-[#FD853A] h-2"
                    style={{
                      width: `${Math.min((healthData.steps / 10000) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-[#FD853A] flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-bold">
                    Calories
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {healthData.caloriesBurned}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <span className="font-medium">Goal: 500</span>
                  <span className="font-bold">
                    {Math.round((healthData.caloriesBurned / 500) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-[#FD853A] h-2"
                    style={{
                      width: `${Math.min((healthData.caloriesBurned / 500) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-[#FD853A] flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-bold">
                    Heart Rate
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {healthData.heartRate}
                </p>
                <p className="text-xs text-gray-600 font-medium">BPM average</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-[#FD853A] flex items-center justify-center">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-bold">
                    Active
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {healthData.activeMinutes}
                </p>
                <p className="text-xs text-gray-600 font-medium">
                  Minutes today
                </p>
              </div>
            </div>

            {healthData.lastWorkoutTime !== "No data" && (
              <div className="mt-4 p-4 bg-[#FD853A]/5 border border-[#FD853A]/20">
                <h4 className="font-bold text-gray-900 mb-2">Last Workout</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium text-gray-900 capitalize">
                      {healthData.workoutType}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {healthData.workoutDuration} min
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Completed:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {healthData.lastWorkoutTime}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
