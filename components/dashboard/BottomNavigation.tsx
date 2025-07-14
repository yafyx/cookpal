import { Sparkles, User } from 'lucide-react';
import Link from 'next/link';

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
      <title>Calendar</title>
      <path
        d="M8.09998 2V6M16.1 2V6M3.09998 10H21.1M5.09998 4H19.1C20.2045 4 21.1 4.89543 21.1 6V20C21.1 21.1046 20.2045 22 19.1 22H5.09998C3.99541 22 3.09998 21.1046 3.09998 20V6C3.09998 4.89543 3.99541 4 5.09998 4Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

interface BottomNavigationProps {
  activeTab?: 'home' | 'kitchen' | 'assistant' | 'calendar' | 'profile';
}

export default function BottomNavigation({
  activeTab = 'home',
}: BottomNavigationProps) {
  const navItems = [
    {
      icon: HomeIcon,
      label: 'Home',
      active: activeTab === 'home',
      href: '/dashboard',
    },
    {
      icon: KitchenIcon,
      label: 'Kitchen',
      active: activeTab === 'kitchen',
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
      icon: CalendarIcon,
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
    <div className="-translate-x-1/2 fixed bottom-0 left-1/2 z-50 w-full max-w-md border-t bg-white pb-2 shadow-lg">
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
                  item.active ? 'bg-black' : 'bg-gray-200'
                }`}
              >
                <item.icon
                  className={`h-6 w-6 ${item.active ? 'text-white' : 'text-gray-600'}`}
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
        ))}
      </div>
    </div>
  );
}
