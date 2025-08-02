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
    <div className="flex items-start space-x-5">
      <div className="group relative">
        <Avatar className="h-24 w-24 ring-4 ring-blue-100/80 ring-offset-4 ring-offset-white transition-all duration-300 group-hover:scale-[1.02] group-hover:ring-blue-200">
          <AvatarImage className="object-cover" src={userProfile.avatar} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 font-bold text-2xl text-white">
            {userProfile.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="-bottom-1 -right-1 absolute flex h-7 w-7 items-center justify-center rounded-full border-3 border-white bg-emerald-500 shadow-lg">
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-4">
          <h2 className="mb-2 font-bold text-2xl text-gray-900 tracking-tight">
            {userProfile.name}
          </h2>
          <p className="mb-1.5 font-medium text-base text-gray-600">
            {userProfile.email}
          </p>
          <p className="text-gray-500 text-sm">
            Browsing as guest • Joined {userProfile.joinDate}
          </p>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge className="border-orange-200/60 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1 font-semibold text-orange-700 shadow-sm">
            🎯 Guest Mode
          </Badge>
          <Badge
            className="border-slate-300 px-3 py-1 font-medium text-slate-700 transition-colors hover:bg-slate-50"
            variant="outline"
          >
            {userProfile.activityLevel.replace('-', ' ')}
          </Badge>
        </div>

        <Button
          className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
          size="sm"
        >
          Sign In to Unlock Features
        </Button>
      </div>
    </div>
  );
}
