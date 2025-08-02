'use client';

import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Custom SVG Components
const HomeIcon = ({ className }: { className?: string }) => {
  const isActive = className?.includes('text-black');
  const fillColor = isActive ? '#000000' : 'none';
  const strokeColor = isActive ? '#000000' : '#181D27';

  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 25 24"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Home</title>
      <path
        d="M9.43478 20.7733V17.7156C9.43478 16.9351 10.0722 16.3023 10.8584 16.3023H13.7326C14.1102 16.3023 14.4723 16.4512 14.7393 16.7163C15.0063 16.9813 15.1563 17.3408 15.1563 17.7156V20.7733C15.1539 21.0978 15.2821 21.4099 15.5124 21.6402C15.7427 21.8705 16.056 22 16.3829 22H18.3438C19.2596 22.0024 20.1388 21.6428 20.7872 21.0008C21.4356 20.3588 21.8 19.487 21.8 18.5778V9.86686C21.8 9.13246 21.4721 8.43584 20.9046 7.96467L14.234 2.67587C13.0737 1.74856 11.4111 1.7785 10.2854 2.74698L3.76701 7.96467C3.17274 8.42195 2.81755 9.12064 2.8 9.86686V18.5689C2.8 20.4639 4.34738 22 6.25617 22H8.17229C8.85123 22 9.403 21.4562 9.40792 20.7822L9.43478 20.7733Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
};

const KitchenIcon = ({ className }: { className?: string }) => {
  const isActive = className?.includes('text-black');
  const fillColor = isActive ? '#000000' : 'none';
  const strokeColor = isActive ? '#000000' : '#181D27';

  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 25 24"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Kitchen</title>
      <path
        d="M2.9 12H22.9M20.9 12V20C20.9 20.5305 20.6893 21.0392 20.3142 21.4143C19.9391 21.7893 19.4304 22 18.9 22H6.9C6.36957 22 5.86086 21.7893 5.48579 21.4143C5.11072 21.0392 4.9 20.5305 4.9 20V12M4.9 8.00004L20.9 4.00004M9.76 6.78004L9.31 4.97004C9.24553 4.71527 9.2319 4.4503 9.26989 4.19026C9.30787 3.93022 9.39674 3.68022 9.5314 3.45454C9.66607 3.22887 9.84389 3.03194 10.0547 2.87503C10.2655 2.71811 10.5052 2.60428 10.76 2.54004L12.7 2.06004C12.9554 1.99573 13.2211 1.98251 13.4816 2.02114C13.7422 2.05977 13.9926 2.14949 14.2184 2.28515C14.4441 2.42081 14.6409 2.59974 14.7974 2.81166C14.9538 3.02358 15.0669 3.26431 15.13 3.52004L15.58 5.32004"
        fill={fillColor}
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

const CalendarIcon = ({ className }: { className?: string }) => {
  const isActive = className?.includes('text-black');
  const strokeColor = isActive ? '#000000' : '#181D27';

  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Calendar</title>
      {/* Calendar header - always outlined */}
      <path
        d="M5 4H19C20.1046 4 21 4.89543 21 6V10H3V6C3 4.89543 3.89543 4 5 4Z"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      {/* Calendar body - filled when active */}
      <path
        d="M3 10H21V20C21 21.1046 20.1046 21 19 22H5C3.89543 22 3 21.1046 3 20V10Z"
        fill={isActive ? '#000000' : 'none'}
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      {/* Date posts */}
      <path
        d="M8 2V6M16 2V6"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

const UserIcon = ({ className }: { className?: string }) => {
  const isActive = className?.includes('text-black');
  const fillColor = isActive ? '#000000' : 'none';
  const strokeColor = isActive ? '#000000' : '#181D27';

  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 25 24"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Profile</title>
      <path
        clipRule="evenodd"
        d="M12.6847 15.3462C8.81711 15.3462 5.51425 15.931 5.51425 18.2729C5.51425 20.6148 8.79616 21.2205 12.6847 21.2205C16.5523 21.2205 19.8543 20.6348 19.8543 18.2938C19.8543 15.9529 16.5733 15.3462 12.6847 15.3462Z"
        fill={fillColor}
        fillRule="evenodd"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        clipRule="evenodd"
        d="M12.6847 12.0059C15.2228 12.0059 17.28 9.94779 17.28 7.40969C17.28 4.8716 15.2228 2.81445 12.6847 2.81445C10.1466 2.81445 8.08853 4.8716 8.08853 7.40969C8.07996 9.93922 10.1238 11.9973 12.6523 12.0059H12.6847Z"
        fill={fillColor}
        fillRule="evenodd"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  href: string;
  key: string;
  special?: boolean;
}

interface BottomNavigationProps {
  activeTab?: 'home' | 'kitchen' | 'assistant' | 'calendar' | 'profile';
}

const renderNavItem = (
  item: NavItem,
  isPressed: boolean,
  onPressStart: () => void,
  onPressEnd: () => void
) => {
  const linkClassName = `flex h-full flex-1 flex-col items-center justify-center transition-transform duration-150 ease-out ${
    isPressed ? 'scale-90' : 'scale-100'
  }`;

  return (
    <Link
      className={linkClassName}
      href={item.href}
      key={item.key}
      onMouseDown={onPressStart}
      onMouseLeave={onPressEnd}
      onMouseUp={onPressEnd}
      onTouchEnd={onPressEnd}
      onTouchStart={onPressStart}
    >
      {item.special ? (
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            item.active
              ? 'border-2 border-[#B8441F] bg-[#FD853A]'
              : 'bg-[#FD853A]'
          }`}
        >
          <item.icon
            className={`h-6 w-6 text-white ${item.active ? 'fill-white' : ''}`}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 p-1">
          <item.icon
            className={`h-6 w-6 ${item.active ? 'text-black' : 'text-[#181d27]'}`}
          />
          <span
            className={`text-xs ${item.active ? 'text-black' : 'text-[#181d27]'}`}
          >
            {item.label}
          </span>
        </div>
      )}
    </Link>
  );
};

export default function BottomNavigation({
  activeTab = 'home',
}: BottomNavigationProps) {
  const [pressedItem, setPressedItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      icon: HomeIcon,
      label: 'Home',
      active: activeTab === 'home',
      href: '/dashboard',
      key: 'home',
    },
    {
      icon: KitchenIcon,
      label: 'Kitchen',
      active: activeTab === 'kitchen',
      href: '/recipes',
      key: 'kitchen',
    },
    {
      icon: Sparkles,
      label: '',
      active: activeTab === 'assistant',
      special: true,
      href: '/assistant',
      key: 'assistant',
    },
    {
      icon: CalendarIcon,
      label: 'Calendar',
      active: activeTab === 'calendar',
      href: '/calendar',
      key: 'calendar',
    },
    {
      icon: UserIcon,
      label: 'Profile',
      active: activeTab === 'profile',
      href: '/profile',
      key: 'profile',
    },
  ];

  return (
    <div className="-translate-x-1/2 fixed bottom-0 left-1/2 z-50 w-full max-w-md">
      {/* Gradient overlay at top of bottom navigation - hidden on assistant page */}
      {activeTab !== 'assistant' && (
        <div
          className="pointer-events-none h-12 w-full"
          style={{
            background:
              'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.6) 60%, rgba(255, 255, 255, 0.85) 80%, rgba(255, 255, 255, 1) 100%)',
          }}
        />
      )}
      <div className="bg-white pb-2 shadow-lg">
        <div className="flex h-[58px] items-center justify-between px-4 pt-2">
          {navItems.map((item) =>
            renderNavItem(
              item,
              pressedItem === item.key,
              () => setPressedItem(item.key),
              () => setPressedItem(null)
            )
          )}
        </div>
      </div>
    </div>
  );
}
