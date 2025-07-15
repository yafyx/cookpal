'use client';

import { ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';

interface MobileHeaderProps {
  title?: string;
  logo?: React.ReactNode;
  subtitle?: string;
  showBackButton?: boolean;
  backHref?: string;
  onBackClick?: () => void;
  showSearch?: boolean;
  onSearchClick?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function MobileHeader({
  title,
  logo,
  subtitle,
  showBackButton = false,
  backHref = '/',
  onBackClick,
  showSearch = false,
  onSearchClick,
  rightAction,
  className = '',
}: MobileHeaderProps) {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-10 flex items-center justify-between border-gray-200 bg-white p-4 md:static md:z-auto ${className}`}
      >
        {/* Left side - Back button or App name */}
        <div className="flex items-center">
          {showBackButton ? (
            onBackClick ? (
              <Button
                className="mr-2 h-8 w-8"
                onClick={handleBackClick}
                size="icon"
                variant="ghost"
              >
                <ArrowLeft className="h-5 w-5 text-[#414651]" />
              </Button>
            ) : (
              <Link href={backHref}>
                <Button className="mr-2 h-8 w-8" size="icon" variant="ghost">
                  <ArrowLeft className="h-5 w-5 text-[#414651]" />
                </Button>
              </Link>
            )
          ) : null}

          <div>
            {logo ? (
              <div className="flex items-center">{logo}</div>
            ) : (
              <h1 className="font-bold text-[#181d27] text-3xl">{title}</h1>
            )}
            {subtitle && <p className="text-[#414651] text-sm">{subtitle}</p>}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {showSearch && (
            <Button
              className="h-8 w-8"
              onClick={onSearchClick}
              size="icon"
              variant="ghost"
            >
              <Search className="h-5 w-5 text-[#414651]" />
            </Button>
          )}
          {rightAction}
        </div>
      </header>
      
      {/* Spacer div to prevent content from being hidden behind fixed header on mobile */}
      <div className="h-[72px] md:h-0 flex-shrink-0" />
    </>
  );
}
