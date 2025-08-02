'use client';

import {
  Bell,
  ChevronRight,
  Shield,
  TrendingUp,
  Trophy,
  User,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AccountSettings() {
  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center bg-gray-100">
            <User className="h-6 w-6 text-gray-700" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xl">
              Account & Settings
            </h3>
            <p className="mt-1 text-gray-600 text-sm">
              Manage your preferences
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        <div className="flex cursor-pointer items-center justify-between border-gray-200 border-b p-6 hover:bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-[#FD853A]">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-base text-gray-900">
                Achievements
              </p>
              <p className="text-gray-600 text-sm">
                View your progress & milestones
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>

        <div className="flex cursor-pointer items-center justify-between border-gray-200 border-b p-6 hover:bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-[#FD853A]">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-base text-gray-900">
                Notifications
              </p>
              <p className="text-gray-600 text-sm">
                Meal reminders & health alerts
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>

        <div className="flex cursor-pointer items-center justify-between border-gray-200 border-b p-6 hover:bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-[#FD853A]">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-base text-gray-900">
                Progress Tracking
              </p>
              <p className="text-gray-600 text-sm">Health metrics & trends</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>

        <div className="flex cursor-pointer items-center justify-between p-6 hover:bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-[#FD853A]">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-base text-gray-900">
                Privacy & Security
              </p>
              <p className="text-gray-600 text-sm">
                Manage your data & permissions
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
}
