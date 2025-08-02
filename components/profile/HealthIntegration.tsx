"use client";

import { useState } from "react";
import {
  Activity,
  Apple,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Shield,
  ExternalLink,
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
    color: "bg-blue-100 text-blue-600",
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
    color: "bg-red-100 text-red-600",
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
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                Health App Integration
              </h3>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Connect your fitness apps for personalized insights
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200/60 font-semibold px-3 py-1.5 shadow-sm"
            >
              {connectedAppsCount} connected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {healthApps.map((app) => {
            const isConnected = healthAppsConnected[app.id];
            const IconComponent = app.icon;

            return (
              <div
                key={app.id}
                className={`border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
                  isConnected
                    ? "border-emerald-200 bg-gradient-to-r from-emerald-50/80 to-teal-50/80"
                    : "border-gray-200 bg-gradient-to-r from-white to-gray-50/60 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${
                        app.id === "googleFit"
                          ? "bg-gradient-to-br from-blue-500 to-blue-600"
                          : app.id === "appleHealth"
                          ? "bg-gradient-to-br from-red-500 to-red-600"
                          : "bg-gradient-to-br from-green-500 to-green-600"
                      }`}
                    >
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg mb-1">
                        {app.name}
                      </p>
                      <p className="text-gray-600 font-medium text-sm">
                        {app.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {isConnected && (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-700 border-emerald-200 font-semibold px-3 py-1"
                      >
                        <CheckCircle className="h-3 w-3 mr-1.5" />
                        Connected
                      </Badge>
                    )}
                    <Button
                      variant={isConnected ? "outline" : "default"}
                      size="sm"
                      onClick={() => onConnectAppAction(app.id)}
                      className={
                        isConnected
                          ? "border-gray-300 hover:bg-gray-100 font-semibold text-gray-700 px-4"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl px-4 transition-all duration-200 hover:scale-[1.02]"
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
                      className="text-xs border-gray-300 text-gray-600 font-medium px-2 py-1 hover:bg-gray-50 transition-colors"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Connection Status Details */}
                {isConnected && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-emerald-700">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-semibold">
                        Syncing data automatically
                      </span>
                      <button
                        className="ml-auto text-emerald-600 hover:text-emerald-800 p-2 rounded-lg hover:bg-emerald-100 transition-all duration-200"
                        onClick={() =>
                          setShowDetails(showDetails === app.id ? null : app.id)
                        }
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>

                    {showDetails === app.id && (
                      <div className="mt-4 space-y-3 text-sm text-emerald-700 animate-in fade-in-50 slide-in-from-top-2 duration-300">
                        <div className="flex justify-between items-center py-2 px-3 bg-white/60 rounded-lg">
                          <span className="font-medium">Last sync:</span>
                          <span className="text-emerald-600 font-semibold">
                            2 minutes ago
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-white/60 rounded-lg">
                          <span className="font-medium">Data points:</span>
                          <span className="text-emerald-600 font-semibold">
                            Steps, Heart Rate, Calories
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200"
                        >
                          <ExternalLink className="h-3 w-3 mr-2" />
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
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl tracking-tight">
                No Health Apps Connected
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-base leading-relaxed">
                Connect your health apps to get personalized meal suggestions
                based on your activity and fitness data
              </p>
              <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200/60 rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-blue-900 mb-4 text-lg">
                  Benefits of connecting:
                </h4>
                <ul className="text-sm text-blue-800 space-y-3 text-left max-w-sm mx-auto">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span>Post-workout meal recommendations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span>Calorie-based portion suggestions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span>Energy-boosting pre-workout snacks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
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
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  Today's Health Summary
                </h3>
                <p className="text-sm text-gray-500 font-normal">
                  Real-time data from your connected apps
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-green-300 text-green-700 font-semibold"
              >
                Live Data
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-blue-700 font-bold">Steps</span>
                </div>
                <p className="text-3xl font-bold text-blue-800 mb-2">
                  {healthData.steps.toLocaleString()}
                </p>
                <div className="flex items-center justify-between text-xs text-blue-600 mb-2">
                  <span className="font-medium">Goal: 10,000</span>
                  <span className="font-bold">
                    {Math.round((healthData.steps / 10000) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (healthData.steps / 10000) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-red-700 font-bold">
                    Calories
                  </span>
                </div>
                <p className="text-3xl font-bold text-red-800 mb-2">
                  {healthData.caloriesBurned}
                </p>
                <p className="text-xs text-red-600 font-medium">Burned today</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-purple-700 font-bold">
                    Heart Rate
                  </span>
                </div>
                <p className="text-3xl font-bold text-purple-800 mb-2">
                  {healthData.heartRate}
                </p>
                <p className="text-xs text-purple-600 font-medium">avg BPM</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-orange-700 font-bold">
                    Active
                  </span>
                </div>
                <p className="text-3xl font-bold text-orange-800 mb-2">
                  {healthData.activeMinutes}m
                </p>
                <p className="text-xs text-orange-600 font-medium">Today</p>
              </div>
            </div>

            {healthData.workoutDuration > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-3 text-green-700">
                  <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">
                      {healthData.workoutType} workout completed -{" "}
                      {healthData.workoutDuration} minutes
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      Great job! Check out your personalized recovery meal
                      suggestions below.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Privacy & Data Control */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Privacy & Data Control
              </h3>
              <p className="text-sm text-gray-500 font-normal">
                Your data security is our priority
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-600" />
              Your data is secure
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Health data is encrypted and stored locally
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                You control which apps can access your data
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Data is only used to improve your meal suggestions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                You can disconnect apps anytime
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-gray-900">
                  Smart Meal Suggestions
                </p>
                <p className="text-sm text-gray-600">
                  Use activity data for personalized recommendations
                </p>
              </div>
              <div className="h-6 w-11 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-end px-1 shadow-inner">
                <div className="h-4 w-4 bg-white rounded-full shadow transition-transform"></div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-gray-900">Workout Detection</p>
                <p className="text-sm text-gray-600">
                  Automatically detect workouts and suggest recovery meals
                </p>
              </div>
              <div className="h-6 w-11 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-end px-1 shadow-inner">
                <div className="h-4 w-4 bg-white rounded-full shadow transition-transform"></div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full border-gray-300 hover:bg-gray-50 font-semibold"
          >
            <Settings className="h-4 w-4 mr-2" />
            Advanced Privacy Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
