import { Button } from '@/components/ui/button';
import { MobileHeader } from '@/components/ui/mobile-header';
import type { Ingredient } from '@/lib/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import BottomNavigation from '../ui/bottom-navigation';
import InventoryList from './InventoryList';

interface InventoryPageProps {
  ingredients: Ingredient[];
}

export default function InventoryPage({ ingredients }: InventoryPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MobileHeader
        rightAction={
          <Link href="/inventory/add">
            <Button
              className="h-auto rounded-lg bg-[#181d27] px-5 py-2 font-semibold text-[#fdfdfd] text-base shadow-[4px_4px_8.7px_0px_rgba(0,0,0,0.12)] hover:bg-[#181d27]/90"
              size="default"
            >
              <Plus className="mr-2 h-[18px] w-[18px]" />
              Add
            </Button>
          </Link>
        }
        title="Inventory"
      />

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* Inventory List */}
        <div className="pb-20">
          <InventoryList ingredients={ingredients} />
        </div>

        {/* Gradient overlay for smooth transition to bottom */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[250px] bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
