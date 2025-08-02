"use client";

import {
  Activity,
  AlertCircle,
  CheckCircle,
  Heart,
  Settings,
  Smartphone,
  TrendingUp,
  Zap,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { HealthAppConnections, HealthData } from "@/lib/types";

// SVG Icons as React Components
const GoogleFitIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    height="24"
    viewBox="0 0 236.2 200"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Google Fit</title>
    <g>
      <path
        d="M22.6,105.8l11.9,11.9l25.7-25.6L48.4,80.2l0,0L43,74.8c-4.3-4.3-6.6-9.9-6.6-16c0-5.3,1.8-10.1,4.9-13.9   l0,0l0,0l0,0l0,0c4.2-5.3,10.6-8.7,17.8-8.7c6.1,0,11.7,2.4,16.1,6.7l5.3,5.1L92.4,60l25.8-25.6l-12-11.9l-5.4-5.2   C90.1,6.6,75.4,0,59.1,0C26.4,0,0,26.4,0,58.9C0,67,1.6,74.7,4.6,81.8c3,7.1,7.3,13.4,12.7,18.7L22.6,105.8"
        fill="#EA4335"
      />
      <polyline
        fill="#FBBC04"
        points="81.5,122.2 118.2,85.7 92.4,60 60.2,92.1 60.2,92.1 34.5,117.7 48.3,131.6 60.2,143.4 72.6,131"
      />
      <polygon
        fill="#34A853"
        points="143.8,175.6 201.8,117.7 176,92.1 118.1,149.9 85.9,117.8 60.2,143.4 92.4,175.6 92.3,175.7    118.1,200 118.1,200 118.1,200 143.9,175.6 143.9,175.6"
      />
      <path
        d="M218.9,100.5c12-12,18.9-30.4,17-49c-2.8-28.2-26.2-49.4-54.6-51.3c-17.9-1.2-34.3,5.5-45.9,17.1L92.4,60   l25.7,25.7l43-42.8c5.2-5.1,12.4-7.5,19.8-6.3c9.6,1.5,17.4,9.4,18.7,19c1,7.2-1.4,14.2-6.5,19.3L176,92.1l25.8,25.6L218.9,100.5z"
        fill="#4285F4"
      />
    </g>
  </svg>
);

const AppleHealthIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    height="24"
    viewBox="0 0 100 100"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Apple Health</title>
    <path
      d="M63.6,5c9,0,13.5,0,18.4,1.5c5.3,1.9,9.5,6.1,11.4,11.4C95,22.8,95,27.4,95,36.4v27.2   c0,9,0,13.5-1.5,18.4c-1.9,5.3-6.1,9.5-11.4,11.4C77.1,95,72.6,95,63.6,95H36.4c-9,0-13.5,0-18.4-1.5C12.6,91.5,8.5,87.4,6.5,82   C5,77.2,5,72.7,5,63.6V36.4c0-9,0-13.5,1.5-18.4C8.5,12.7,12.6,8.5,18,6.6C22.8,5,27.3,5,36.4,5H63.6z"
      fill="#FFFFFF"
    />
    <path
      d="M80.7,32c0-6.8-5.2-12-11.2-12c-4.2,0-7.6,1.4-9.7,4.5c-2.1-3.1-5.5-4.5-9-4.5c-6.8,0-12,5.2-12,12   c0-0.3,0-0.2,0,0c0-0.1,0,0,0,0c0,10.1,9.7,20.3,21,24.7C68.6,53.8,80.7,42.1,80.7,32C80.7,32,80.7,31.9,80.7,32   C80.7,31.8,80.7,31.7,80.7,32z"
      fill="#FF2719"
    />
  </svg>
);

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
    icon: GoogleFitIcon,
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
    icon: AppleHealthIcon,
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const connectedAppsCount =
    Object.values(healthAppsConnected).filter(Boolean).length;
  const hasAnyConnection = connectedAppsCount > 0;

  const handleRefreshData = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Health Apps Integration Card */}
      <Card className="overflow-hidden border-border bg-background shadow-sm">
        <CardHeader className="bg-gradient-to-r from-background to-background/80">
          <CardTitle className="flex items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground">
                Health App Integration
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Connect your fitness apps for personalized insights
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary" variant="outline">
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
                className={`rounded-lg border ${
                  isConnected
                    ? "border-primary/20 bg-primary/5"
                    : "border-border bg-background"
                } p-6 transition-all hover:shadow-sm`}
                key={app.id}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-md ${
                        isConnected ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="mb-1 text-lg font-bold text-foreground">
                        {app.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {app.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {isConnected && (
                      <Badge
                        className="bg-primary/10 px-3 py-1 font-medium text-primary"
                        variant="outline"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Connected
                      </Badge>
                    )}
                    <Button
                      className={
                        isConnected
                          ? "border-border bg-background font-medium text-foreground hover:bg-muted"
                          : "bg-primary font-medium text-primary-foreground hover:bg-primary/90"
                      }
                      onClick={() => onConnectAppAction(app.id)}
                      size="sm"
                      variant={isConnected ? "outline" : "default"}
                    >
                      {isConnected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {app.features.map((feature) => (
                    <Badge
                      className="border-border bg-background px-2 py-1 text-xs font-normal text-muted-foreground"
                      key={feature}
                      variant="outline"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Connection Status Details */}
                {isConnected && (
                  <div className="mt-4 rounded-md border border-border bg-muted/50 p-4">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        Syncing data automatically
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="ml-auto rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              onClick={() =>
                                setShowDetails(
                                  showDetails === app.id ? null : app.id
                                )
                              }
                            >
                              <Settings className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Manage connection settings</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {showDetails === app.id && (
                      <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
                          <span className="font-medium text-muted-foreground">
                            Last sync:
                          </span>
                          <span className="font-medium text-primary">
                            2 minutes ago
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
                          <span className="font-medium text-muted-foreground">
                            Data points:
                          </span>
                          <span className="font-medium text-primary">
                            Steps, Heart Rate, Calories
                          </span>
                        </div>
                        <Button
                          className="mt-3 w-full border-border bg-background text-foreground hover:bg-muted"
                          size="sm"
                          variant="outline"
                        >
                          Open {app.name}
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {!hasAnyConnection && (
            <div className="rounded-lg border border-border bg-muted/30 py-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                No Health Apps Connected
              </h3>
              <p className="mx-auto mb-8 max-w-md text-base text-muted-foreground">
                Connect your health apps to get personalized meal suggestions
                based on your activity and fitness data
              </p>
              <div className="mx-auto max-w-lg p-6">
                <h4 className="mb-4 text-lg font-bold text-foreground">
                  Benefits of connecting:
                </h4>
                <ul className="mx-auto max-w-sm space-y-3 text-left text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Post-workout meal recommendations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Calorie-based portion suggestions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Energy-boosting pre-workout snacks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
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
        <Card className="overflow-hidden border-border bg-background shadow-sm">
          <CardHeader className="bg-gradient-to-r from-background to-background/80">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Today's Health Summary
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time data from your connected apps
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className="bg-primary/10 font-medium text-primary"
                  variant="outline"
                >
                  Live Data
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRefreshData}
                  disabled={isRefreshing}
                  className="h-8 w-8 p-0"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                  <span className="sr-only">Refresh data</span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/30 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    Steps
                  </span>
                </div>
                <p className="mb-2 text-3xl font-bold text-foreground">
                  {healthData.steps.toLocaleString()}
                </p>
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">Goal: 10,000</span>
                  <span className="font-bold">
                    {Math.round((healthData.steps / 10_000) * 100)}%
                  </span>
                </div>
                <Progress
                  value={Math.min((healthData.steps / 10_000) * 100, 100)}
                  className="h-2"
                />
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    Calories
                  </span>
                </div>
                <p className="mb-2 text-3xl font-bold text-foreground">
                  {healthData.caloriesBurned}
                </p>
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">Goal: 500</span>
                  <span className="font-bold">
                    {Math.round((healthData.caloriesBurned / 500) * 100)}%
                  </span>
                </div>
                <Progress
                  value={Math.min((healthData.caloriesBurned / 500) * 100, 100)}
                  className="h-2"
                />
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Heart className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    Heart Rate
                  </span>
                </div>
                <p className="mb-2 text-3xl font-bold text-foreground">
                  {healthData.heartRate}
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  BPM average
                </p>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Activity className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    Active
                  </span>
                </div>
                <p className="mb-2 text-3xl font-bold text-foreground">
                  {healthData.activeMinutes}
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  Minutes today
                </p>
              </div>
            </div>

            {healthData.lastWorkoutTime !== "No data" && (
              <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-5">
                <h4 className="mb-3 font-bold text-foreground">Last Workout</h4>
                <Separator className="mb-3 bg-primary/10" />
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium text-foreground capitalize">
                      {healthData.workoutType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">
                      {healthData.workoutDuration} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-border bg-background p-3 md:col-span-2">
                    <span className="text-muted-foreground">Completed:</span>
                    <span className="font-medium text-foreground">
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
