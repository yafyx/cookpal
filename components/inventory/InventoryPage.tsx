import { Button } from '@/components/ui/button';
import type { Ingredient } from '@/lib/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import BottomNavigation from '../dashboard/BottomNavigation';
import InventoryList from './InventoryList';

interface InventoryPageProps {
  ingredients: Ingredient[];
}

export default function InventoryPage({ ingredients }: InventoryPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Main Content */}
      <div className="relative flex-1 px-4 py-6">
        {/* Header */}
        <h1 className="mb-6 font-semibold text-2xl text-[#181d27] tracking-[-0.528px]">
          Inventory
        </h1>

        {/* Inventory List */}
        <div className="pb-20">
          <InventoryList ingredients={ingredients} />
        </div>

        {/* Gradient overlay for smooth transition to bottom */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[250px] bg-gradient-to-b from-transparent to-white" />

        {/* Floating Add Button - fixed but constrained to mobile container */}
        <div className="-translate-x-1/2 fixed bottom-[150px] left-1/2 z-10 w-full max-w-md">
          <Link className="absolute right-4" href="/inventory/add">
            <Button
              className="h-auto rounded-lg bg-[#181d27] px-5 py-2 font-semibold text-[#fdfdfd] text-base shadow-[4px_4px_8.7px_0px_rgba(0,0,0,0.12)] hover:bg-[#181d27]/90"
              size="default"
            >
              <Plus className="mr-2 h-[18px] w-[18px]" />
              Add
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
