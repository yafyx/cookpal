import { InventoryPage } from '@/components/inventory';
import type { Ingredient } from '@/lib/types';

// Sample inventory data - in a real app this would come from an API or database
const sampleInventory: Ingredient[] = [
  {
    id: '1',
    name: 'Lettuce',
    quantity: '2',
    image:
      'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: '2',
    name: 'Red Onion',
    quantity: '2',
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: '3',
    name: 'Tomato',
    quantity: '2',
    image:
      'https://images.unsplash.com/photo-1546470427-e5dc1b40d2c6?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: '4',
    name: 'Cucumber',
    quantity: '12',
    image:
      'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: '5',
    name: 'Avocado',
    quantity: '2',
    image:
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: '6',
    name: 'Chili Pepper',
    quantity: '4',
    image:
      'https://images.unsplash.com/photo-1583251779603-b6dea70fb1ee?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: '7',
    name: 'Bay Leaf',
    quantity: '4',
    image:
      'https://images.unsplash.com/photo-1544376664-80b17f09d399?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: '8',
    name: 'Turmeric',
    quantity: '4',
    image:
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: '9',
    name: 'Potato Bun',
    quantity: '4',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: '10',
    name: 'Cheddar Cheese',
    quantity: '4',
    image:
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: '11',
    name: 'Brisket',
    quantity: '4',
    image:
      'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=100&h=100&fit=crop&crop=center',
  },
];

export default function Inventory() {
  return <InventoryPage ingredients={sampleInventory} />;
}
