'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { UserProfile } from '@/lib/types';

interface ProfileHeaderProps {
  userProfile: UserProfile;
}

export default function ProfileHeader({ userProfile }: ProfileHeaderProps) {
  return (
    <div className="w-full">
      {/* Main Profile Section */}
      <div className="flex items-start gap-5">
        <div className="relative flex-shrink-0">
          <Avatar className="h-20 w-20 border-3 border-white shadow-lg ring-2 ring-gray-100">
            <AvatarImage className="object-cover" src={userProfile.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-[#FD853A] to-[#E8743A] font-bold text-white text-xl">
              {userProfile.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="-bottom-1 -right-1 absolute flex h-6 w-6 items-center justify-center rounded-full border-3 border-white bg-emerald-500 shadow-md">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          {/* User Info */}
          <div className="space-y-1">
            <h1 className="font-bold text-2xl text-gray-900 tracking-tight">
              {userProfile.name}
            </h1>
            <p className="text-base text-gray-600">{userProfile.email}</p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-[#FD853A]" />
                <span>Browsing as guest</span>
              </div>
              <span>•</span>
              <span>Joined {userProfile.joinDate}</span>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge className="border-0 bg-gradient-to-r from-[#FD853A] to-[#E8743A] px-3 py-1.5 font-semibold text-white shadow-sm">
              Guest Mode
            </Badge>
            <Badge
              className="border border-gray-200 bg-gray-50 px-3 py-1.5 font-medium text-gray-700 shadow-sm"
              variant="outline"
            >
              {userProfile.activityLevel.replace('-', ' ')}
            </Badge>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <Button
          className="w-full bg-gradient-to-r from-[#FD853A] to-[#E8743A] px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-200 hover:from-[#E8743A] hover:to-[#D6633A] hover:shadow-lg"
          size="default"
        >
          Sign In to Unlock Features
        </Button>
      </div>
    </div>
  );
}
