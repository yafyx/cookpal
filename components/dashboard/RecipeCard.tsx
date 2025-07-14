'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Plus, Timer } from 'lucide-react';
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
    <Link href={`/recipe/${id}`}>
      <Card className="relative h-[449px] w-full cursor-pointer overflow-hidden border-0 transition-transform hover:scale-[1.02]">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), url('${backgroundImage}')`,
          }}
        />
        <CardContent className="relative flex h-full flex-col justify-end p-4 text-white">
          <div className="space-y-3">
            <h3 className="font-semibold text-2xl leading-8 tracking-[-0.528px]">
              {title}
            </h3>

            <div className="flex items-center gap-1">
              <Timer className="h-[18px] w-[18px]" />
              <span className="font-normal text-xs leading-[18px]">
                {duration}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                className="border border-[#e9eaeb] bg-white/95 px-5 py-1 font-semibold text-[#181d27] text-base leading-6 hover:bg-white"
                onClick={(e) => e.preventDefault()}
                size="sm"
                variant="secondary"
              >
                <Plus className="mr-2 h-[18px] w-[18px]" />
                Plan
              </Button>
              <Button
                className="border-0 bg-white/30 px-5 py-1 font-semibold text-base text-white leading-6 backdrop-blur-sm hover:bg-white/40"
                onClick={(e) => e.preventDefault()}
                size="sm"
                variant="secondary"
              >
                <ChefHat className="mr-2 h-[18px] w-[18px]" />
                Remix
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
