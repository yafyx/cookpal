'use client';

import { Timer } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface RecipeCardProps {
  id?: string;
  title: string;
  duration: string;
  backgroundImage: string;
}

export default function RecipeCard({
  id = '1',
  title,
  duration,
  backgroundImage,
}: RecipeCardProps) {
  return (
    <Link
      className="relative h-[449px] w-[380px] flex-shrink-0 snap-start overflow-hidden rounded-3xl"
      href={`/recipe/${id}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
        <h3 className="mb-3 font-semibold text-[24px] leading-8 tracking-[-0.528px]">
          {title}
        </h3>

        <div className="mb-3 flex items-center gap-1">
          <Timer className="h-[18px] w-[18px]" />
          <span className="text-[12px] leading-[18px]">{duration}</span>
        </div>

        <div className="flex gap-2">
          <Button
            className="rounded-lg border border-[#e9eaeb] bg-[#fdfdfd] px-8 py-0.5 font-semibold text-[#181d27] text-[16px] leading-6 hover:border-[#e9eaeb] hover:bg-[#fdfdfd] hover:text-[#181d27]"
            onClick={(e) => e.preventDefault()}
            size="sm"
          >
            <svg
              aria-label="Plan"
              fill="none"
              height="18"
              role="img"
              viewBox="0 0 18 18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 9H14.25M9 3.75V14.25"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Plan
          </Button>
          <Button
            className="rounded-lg bg-[rgba(253,253,253,0.3)] px-8 py-0.5 font-semibold text-[#fdfdfd] text-[16px] leading-6 backdrop-blur-[2px] hover:bg-[rgba(253,253,253,0.3)] hover:text-[#fdfdfd]"
            onClick={(e) => e.preventDefault()}
            size="sm"
            variant="ghost"
          >
            <svg
              aria-label="Remix"
              fill="none"
              height="18"
              role="img"
              viewBox="0 0 18 18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.121 11.121L15.75 15.75M15.75 15.75V12M15.75 15.75H12M15.75 2.25L9 9L6 6L1.5 10.5M15.75 2.25V6M15.75 2.25H12"
                stroke="#FDFDFD"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Remix
          </Button>
        </div>
      </div>
    </Link>
  );
}
