"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Calendar,
  Heart,
  Activity,
  Scale,
  Zap,
  BarChart3,
  Trophy,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HealthMetric {
  id: string;
  name: string;
  currentValue: number;
  previousValue: number;
  unit: string;
  target?: number;
  trend: "up" | "down" | "stable";
  icon: any;
  color: string;
}

interface ProgressTrackingProps {
  metrics: HealthMetric[];
  timeframe: "week" | "month" | "year";
  onTimeframeChangeAction: (timeframe: "week" | "month" | "year") => void;
}

export default function ProgressTracking({
  metrics,
  timeframe,
  onTimeframeChangeAction,
}: ProgressTrackingProps) {
  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "stable":
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (
    trend: "up" | "down" | "stable",
    metricName: string
  ) => {
    // For weight, down trend is good; for other metrics, up trend is usually good
    const isWeightMetric = metricName.toLowerCase().includes("weight");

    if (trend === "stable") return "text-gray-600";

    if (isWeightMetric) {
      return trend === "down" ? "text-green-600" : "text-red-600";
    } else {
      return trend === "up" ? "text-green-600" : "text-red-600";
    }
  };

  const calculateProgress = (current: number, target?: number) => {
    if (!target) return null;
    return Math.round((current / target) * 100);
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Progress Tracking
              </h3>
              <p className="text-sm text-gray-500 font-normal">
                Your health journey insights
              </p>
            </div>
          </CardTitle>
          <div className="flex gap-2">
            {(["week", "month", "year"] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "default" : "outline"}
                size="sm"
                onClick={() => onTimeframeChangeAction(period)}
                className={`text-xs h-8 px-3 font-semibold ${
                  timeframe === period
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            const progress = calculateProgress(
              metric.currentValue,
              metric.target
            );
            const change = metric.currentValue - metric.previousValue;
            const changePercent = (
              (change / metric.previousValue) *
              100
            ).toFixed(1);

            return (
              <div
                key={metric.id}
                className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-sm ${
                        metric.name.toLowerCase().includes("weight")
                          ? "bg-gradient-to-br from-purple-500 to-purple-600"
                          : metric.name.toLowerCase().includes("heart")
                          ? "bg-gradient-to-br from-red-500 to-red-600"
                          : metric.name.toLowerCase().includes("step")
                          ? "bg-gradient-to-br from-blue-500 to-blue-600"
                          : metric.name.toLowerCase().includes("calorie")
                          ? "bg-gradient-to-br from-orange-500 to-orange-600"
                          : "bg-gradient-to-br from-green-500 to-green-600"
                      }`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 text-lg">
                        {metric.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-3xl font-bold text-gray-900">
                          {metric.currentValue}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">
                          {metric.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-2">
                      {getTrendIcon(metric.trend)}
                      <span
                        className={`text-sm font-bold ${getTrendColor(
                          metric.trend,
                          metric.name
                        )}`}
                      >
                        {change > 0 ? "+" : ""}
                        {change.toFixed(1)} {metric.unit}
                      </span>
                    </div>
                    {metric.target && (
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-300 text-gray-600 font-medium"
                      >
                        Target: {metric.target} {metric.unit}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Progress bar if target exists */}
                {metric.target && progress !== null && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-700 mb-2">
                      <span className="font-medium">Progress to Goal</span>
                      <span className="font-bold">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          progress >= 100
                            ? "bg-gradient-to-r from-green-400 to-green-500"
                            : progress >= 75
                            ? "bg-gradient-to-r from-blue-400 to-blue-500"
                            : progress >= 50
                            ? "bg-gradient-to-r from-orange-400 to-orange-500"
                            : "bg-gradient-to-r from-red-400 to-red-500"
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    {progress >= 100 && (
                      <div className="flex items-center gap-2 mt-2 text-green-700">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm font-bold">
                          Goal achieved!
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">
                    vs. last {timeframe}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold ${getTrendColor(
                        metric.trend,
                        metric.name
                      )}`}
                    >
                      {changePercent}% change
                    </span>
                    {Math.abs(parseFloat(changePercent)) > 5 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200"
                      >
                        Significant
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium text-gray-900 mb-3">
            This {timeframe} summary
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Improving
                </span>
              </div>
              <p className="text-lg font-bold text-green-700">
                {
                  metrics.filter(
                    (m) =>
                      m.trend === "up" ||
                      (m.name.includes("Weight") && m.trend === "down")
                  ).length
                }
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Minus className="h-3 w-3 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Stable
                </span>
              </div>
              <p className="text-lg font-bold text-gray-700">
                {metrics.filter((m) => m.trend === "stable").length}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="h-3 w-3 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">
                  On Track
                </span>
              </div>
              <p className="text-lg font-bold text-orange-700">
                {
                  metrics.filter(
                    (m) =>
                      m.target &&
                      calculateProgress(m.currentValue, m.target)! >= 80
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          <Calendar className="h-4 w-4 mr-2" />
          View Detailed History
        </Button>
      </CardContent>
    </Card>
  );
}

// Sample data for testing
export const sampleHealthMetrics: HealthMetric[] = [
  {
    id: "1",
    name: "Daily Steps",
    currentValue: 8547,
    previousValue: 7823,
    unit: "steps",
    target: 10000,
    trend: "up",
    icon: Activity,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "2",
    name: "Weight",
    currentValue: 68.5,
    previousValue: 70.2,
    unit: "kg",
    target: 68,
    trend: "down",
    icon: Scale,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "3",
    name: "Resting Heart Rate",
    currentValue: 72,
    previousValue: 75,
    unit: "bpm",
    target: 70,
    trend: "down",
    icon: Heart,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "4",
    name: "Active Minutes",
    currentValue: 45,
    previousValue: 38,
    unit: "min",
    target: 60,
    trend: "up",
    icon: Zap,
    color: "bg-orange-100 text-orange-600",
  },
];
