import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { MobileHeader } from '@/components/ui/mobile-header';

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MobileHeader title="Profile" />

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* Profile Content - Placeholder */}
        <div className="flex h-96 items-center justify-center">
          <p className="text-center text-[#717680]">
            Profile functionality coming soon...
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="profile" />
    </div>
  );
}
