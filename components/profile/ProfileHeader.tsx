'use client';

import { Check, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { UserProfile } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  userProfile: UserProfile;
}

export default function ProfileHeader({ userProfile }: ProfileHeaderProps) {
  return (
    <div className="w-full">
      {/* Main Profile Section */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
        {/* Avatar Section */}
        <div className="relative flex-shrink-0">
          <div className="relative">
            <Avatar className="h-24 w-24 border-3 border-background shadow-lg ring-2 ring-primary/10">
              <AvatarImage className="object-cover" src={userProfile.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 font-bold text-primary-foreground text-xl">
                {userProfile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="-bottom-1 -right-1 absolute flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-emerald-500 shadow-md transition-transform hover:scale-105">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">Online now</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          {/* User Info */}
          <div className="space-y-1.5">
            <h1 className="font-bold font-heading text-2xl text-foreground tracking-tight">
              {userProfile.name}
            </h1>
            <p className="text-base text-muted-foreground">
              {userProfile.email}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span>Browsing as guest</span>
              </div>
              <span className="text-border">•</span>
              <span>Joined {userProfile.joinDate}</span>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-2.5">
            <Badge className="bg-gradient-to-r from-primary to-primary/80 px-2 py-1 font-medium text-primary-foreground text-xs shadow-sm">
              Guest Mode
            </Badge>
            <Badge
              className={cn(
                'border border-border/50 bg-background/50 px-2 py-1 font-medium text-muted-foreground text-xs shadow-sm',
                userProfile.activityLevel.includes('high') &&
                  'border-emerald-200 bg-emerald-50/50 text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-900/10 dark:text-emerald-400',
                userProfile.activityLevel.includes('medium') &&
                  'border-amber-200 bg-amber-50/50 text-amber-700 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-400'
              )}
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
          className="group relative w-full overflow-hidden bg-gradient-to-r from-primary to-primary/90 px-6 py-2.5 font-medium text-primary-foreground shadow-md transition-all duration-300 hover:shadow-lg"
          size="lg"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Sign In to Unlock Features
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="-z-0 absolute inset-0 bg-gradient-to-r from-primary/90 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Button>
      </div>
    </div>
  );
}
