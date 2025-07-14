'use client';

import { CalendarPage } from '@/components/calendar';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { MobileHeader } from '@/components/ui/mobile-header';

export default function Calendar() {
  return (
    <div className="flex min-h-screen flex-col">
      <MobileHeader title="Calendar" />
      <CalendarPage />
      {/* Bottom Navigation */}
      <BottomNavigation activeTab="calendar" />
    </div>
  );
}
