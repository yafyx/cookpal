import BottomNavigation from '@/components/ui/bottom-navigation';
import { Button } from '@/components/ui/button';
import { MobileHeader } from '@/components/ui/mobile-header';
import { ChevronRight, Plus, Timer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock inventory data
const mockInventory = [
  {
    id: '1',
    name: 'Lettuce',
    quantity: 2,
    image: 'https://via.placeholder.com/40x40/4ade80/ffffff?text=🥬',
  },
  {
    id: '2',
    name: 'Red Onion',
    quantity: 2,
    image: 'https://via.placeholder.com/40x40/ef4444/ffffff?text=🧅',
  },
  {
    id: '3',
    name: 'Tomato',
    quantity: 2,
    image: 'https://via.placeholder.com/40x40/ef4444/ffffff?text=🍅',
  },
  {
    id: '4',
    name: 'Cucumber',
    quantity: 12,
    image: 'https://via.placeholder.com/40x40/22c55e/ffffff?text=🥒',
  },
  {
    id: '5',
    name: 'Avocado',
    quantity: 2,
    image: 'https://via.placeholder.com/40x40/84cc16/ffffff?text=🥑',
  },
  {
    id: '6',
    name: 'Chili Pepper',
    quantity: 4,
    image: 'https://via.placeholder.com/40x40/dc2626/ffffff?text=🌶️',
  },
  {
    id: '7',
    name: 'Bay Leaf',
    quantity: 4,
    image: 'https://via.placeholder.com/40x40/65a30d/ffffff?text=🌿',
  },
  {
    id: '8',
    name: 'Turmeric',
    quantity: 4,
    image: 'https://via.placeholder.com/40x40/eab308/ffffff?text=🧂',
  },
  {
    id: '9',
    name: 'Potato Bun',
    quantity: 4,
    image: 'https://via.placeholder.com/40x40/d97706/ffffff?text=🍞',
  },
  {
    id: '10',
    name: 'Cheddar Cheese',
    quantity: 4,
    image: 'https://via.placeholder.com/40x40/fbbf24/ffffff?text=🧀',
  },
  {
    id: '11',
    name: 'Brisket',
    quantity: 4,
    image: 'https://via.placeholder.com/40x40/7c2d12/ffffff?text=🥩',
  },
];

// Mock recipe data
const mockRecipes = [
  {
    id: '1',
    title: 'Kangkung',
    duration: '30m',
    backgroundImage:
      'https://via.placeholder.com/330x449/22c55e/ffffff?text=🥬+Kangkung',
  },
  {
    id: '2',
    title: 'Beef Burger',
    duration: '30m',
    backgroundImage:
      'https://via.placeholder.com/330x449/d97706/ffffff?text=🍔+Burger',
  },
];

export default function KitchenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MobileHeader
        rightAction={
          <Link
            className="flex items-center gap-2 rounded-lg bg-[#181d27] px-3 py-2 text-white shadow-lg"
            href="/inventory/add"
          >
            <Plus className="h-[18px] w-[18px]" />
            <span className="font-semibold text-[16px]">Add</span>
          </Link>
        }
        title="Kitchen"
      />
      <div className="flex-1 overflow-auto pb-20">
        <div className="px-4 pt-4 pb-4">
          {/* Recipes Section */}
          <div className="mb-4">
            <h2 className="mb-3 font-semibold text-[#000000] text-[18px] leading-7">
              Recipes
            </h2>

            {/* Horizontal Scrollable Recipe Cards */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {mockRecipes.map((recipe) => (
                <Link
                  className="relative h-[449px] w-[330px] flex-shrink-0 overflow-hidden rounded-3xl"
                  href={`/recipe/${recipe.id}`}
                  key={recipe.id}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), url('${recipe.backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                    <h3 className="mb-3 font-semibold text-[24px] leading-8 tracking-[-0.528px]">
                      {recipe.title}
                    </h3>

                    <div className="mb-3 flex items-center gap-1">
                      <Timer className="h-[18px] w-[18px]" />
                      <span className="text-[12px] leading-[18px]">
                        {recipe.duration}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="rounded-lg border border-[#e9eaeb] bg-[#fdfdfd] px-5 py-1 font-semibold text-[#181d27] text-[16px] leading-6"
                        size="sm"
                      >
                        <Plus className="mr-2 h-[18px] w-[18px]" />
                        Plan
                      </Button>
                      <Button
                        className="rounded-lg bg-[rgba(253,253,253,0.3)] px-5 py-1 font-semibold text-[#fdfdfd] text-[16px] leading-6 backdrop-blur-[2px]"
                        size="sm"
                        variant="ghost"
                      >
                        <Plus className="mr-2 h-[18px] w-[18px]" />
                        Remix
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Inventory Section */}
          <div className="px-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-[#000000] text-[18px] leading-7">
                Inventory
              </h2>
              <Link
                className="flex items-center gap-1 font-medium text-[#717680] text-[14px] leading-5 transition-colors hover:text-[#181d27]"
                href="/inventory"
              >
                See more
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Inventory List */}
            <div className="flex h-[285px] flex-col gap-3 overflow-y-auto">
              {mockInventory.map((item) => (
                <div
                  className="flex items-center justify-between"
                  key={item.id}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 overflow-hidden rounded-lg border border-[#e9eaeb] bg-white">
                      <Image
                        alt={item.name}
                        className="h-full w-full object-cover"
                        height={40}
                        src={item.image}
                        width={40}
                      />
                    </div>
                    <span className="font-normal text-[#181d27] text-[14px] leading-5">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-normal text-[#717680] text-[14px] leading-5">
                    {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation activeTab="kitchen" />
    </div>
  );
}
