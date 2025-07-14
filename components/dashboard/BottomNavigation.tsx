import { Calendar, ChefHat, Home, Sparkles, User } from 'lucide-react';
import Link from 'next/link';

interface BottomNavigationProps {
  activeTab?: 'home' | 'recipes' | 'assistant' | 'calendar' | 'profile';
}

export default function BottomNavigation({
  activeTab = 'home',
}: BottomNavigationProps) {
  const navItems = [
    {
      icon: Home,
      label: 'Home',
      active: activeTab === 'home',
      href: '/dashboard',
    },
    {
      icon: ChefHat,
      label: 'Recipes',
      active: activeTab === 'recipes',
      href: '/recipes',
    },
    {
      icon: Sparkles,
      label: '',
      active: activeTab === 'assistant',
      special: true,
      href: '/assistant',
    },
    {
      icon: Calendar,
      label: 'Calendar',
      active: activeTab === 'calendar',
      href: '/calendar',
    },
    {
      icon: User,
      label: 'Profile',
      active: activeTab === 'profile',
      href: '/profile',
    },
  ];

  return (
    <div className="-translate-x-1/2 fixed bottom-0 left-1/2 z-50 h-[90px] w-full max-w-md border-t bg-white shadow-lg">
      <div className="flex h-[58px] items-center justify-between px-4 pt-2">
        {navItems.map((item) => (
          <Link
            className="flex h-full flex-1 flex-col items-center justify-center"
            href={item.href}
            key={item.label || 'assistant'}
          >
            {item.special ? (
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  item.active ? 'bg-[#fd853a]' : 'bg-gray-200'
                }`}
              >
                <item.icon
                  className={`h-6 w-6 ${item.active ? 'text-white' : 'text-gray-600'}`}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 p-1">
                <item.icon
                  className={`h-6 w-6 ${item.active ? 'text-[#fd853a]' : 'text-[#181d27]'}`}
                />
                <span
                  className={`text-xs ${item.active ? 'text-[#fd853a]' : 'text-[#181d27]'}`}
                >
                  {item.label}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
