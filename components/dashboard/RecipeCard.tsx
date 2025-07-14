'use client';

import { Button } from '@/components/ui/button';
import { Plus, Timer } from 'lucide-react';
import Link from 'next/link';

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
      className="relative h-[449px] w-[330px] flex-shrink-0 overflow-hidden rounded-3xl"
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
            className="rounded-lg border border-[#e9eaeb] bg-[#fdfdfd] px-5 py-1 font-semibold text-[#181d27] text-[16px] leading-6"
            onClick={(e) => e.preventDefault()}
            size="sm"
          >
            <Plus className="mr-2 h-[18px] w-[18px]" />
            Plan
          </Button>
          <Button
            className="rounded-lg bg-[rgba(253,253,253,0.3)] px-5 py-1 font-semibold text-[#fdfdfd] text-[16px] leading-6 backdrop-blur-[2px]"
            onClick={(e) => e.preventDefault()}
            size="sm"
            variant="ghost"
          >
            <Plus className="mr-2 h-[18px] w-[18px]" />
            Remix
          </Button>
        </div>
      </div>
    </Link>
  );
}
