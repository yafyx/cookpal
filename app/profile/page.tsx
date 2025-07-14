import BottomNavigation from '@/components/dashboard/BottomNavigation';

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* Header */}
        <h1 className="mb-6 font-semibold text-2xl text-[#181d27] tracking-[-0.528px]">
          Profile
        </h1>

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
