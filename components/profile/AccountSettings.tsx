"use client";

import {
  Bell,
  ChevronRight,
  Shield,
  TrendingUp,
  Trophy,
  User,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountSettings() {
  return (
    <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-md">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 shadow-lg">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xl tracking-tight">
              Account & Settings
            </h3>
            <p className="font-medium text-gray-500 text-sm mt-1">
              Manage your preferences
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="group flex cursor-pointer items-center justify-between rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-orange-200 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 shadow-md group-hover:shadow-lg transition-all duration-300">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-base">
                Achievements
              </p>
              <p className="text-gray-500 text-sm">
                View your progress & milestones
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
        </div>

        <div className="group flex cursor-pointer items-center justify-between rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 shadow-md group-hover:shadow-lg transition-all duration-300">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-base">
                Notifications
              </p>
              <p className="text-gray-500 text-sm">
                Meal reminders & health alerts
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
        </div>

        <div className="group flex cursor-pointer items-center justify-between rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-green-200 hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-500 shadow-md group-hover:shadow-lg transition-all duration-300">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-base">
                Progress Tracking
              </p>
              <p className="text-gray-500 text-sm">Health metrics & trends</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
        </div>

        <div className="group flex cursor-pointer items-center justify-between rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-purple-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/50 hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-500 shadow-md group-hover:shadow-lg transition-all duration-300">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-base">
                Privacy & Security
              </p>
              <p className="text-gray-500 text-sm">
                Manage your data & permissions
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
        </div>
      </CardContent>
    </Card>
  );
}
