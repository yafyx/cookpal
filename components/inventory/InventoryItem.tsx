import { Button } from '@/components/ui/button';
import type { Ingredient } from '@/lib/types';
import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface InventoryItemProps {
  ingredient: Ingredient;
  onUpdate?: (id: string, updates: Partial<Omit<Ingredient, 'id'>>) => void;
  onDelete?: (id: string) => void;
}

export default function InventoryItem({ 
  ingredient,
  onUpdate,
  onDelete 
}: InventoryItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(ingredient.name);
  const [editQuantity, setEditQuantity] = useState(ingredient.quantity);

  const handleSave = () => {
    if (onUpdate && (editName !== ingredient.name || editQuantity !== ingredient.quantity)) {
      onUpdate(ingredient.id, {
        name: editName,
        quantity: editQuantity,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(ingredient.name);
    setEditQuantity(ingredient.quantity);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete && confirm(`Are you sure you want to delete ${ingredient.name}?`)) {
      onDelete(ingredient.id);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center justify-between py-3 gap-2">
        <div className="flex items-center gap-2 flex-1">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#e9eaeb] bg-white">
            <Image
              alt={ingredient.name}
              className="object-cover"
              height={24}
              src={ingredient.image}
              width={24}
            />
          </div>
          <input
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Ingredient name"
            type="text"
            value={editName}
          />
          <input
            className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
            onChange={(e) => setEditQuantity(e.target.value)}
            placeholder="Quantity"
            type="text"
            value={editQuantity}
          />
        </div>
        <div className="flex gap-1">
          <Button
            className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600"
            onClick={handleSave}
            size="sm"
          >
            ✓
          </Button>
          <Button
            className="h-8 w-8 p-0"
            onClick={handleCancel}
            size="sm"
            variant="outline"
          >
            ✕
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-3 group">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#e9eaeb] bg-white">
          <Image
            alt={ingredient.name}
            className="object-cover"
            height={24}
            src={ingredient.image}
            width={24}
          />
        </div>
        <span className="font-normal text-[#181d27] text-sm">
          {ingredient.name}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-normal text-[#717680] text-sm">
          {ingredient.quantity}
        </span>
        {(onUpdate || onDelete) && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onUpdate && (
              <Button
                className="h-7 w-7 p-0"
                onClick={() => setIsEditing(true)}
                size="sm"
                variant="ghost"
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                onClick={handleDelete}
                size="sm"
                variant="ghost"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
