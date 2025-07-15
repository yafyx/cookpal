import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Ingredient } from '@/lib/types';
import { getFallbackImageUrl, isEmoji } from '@/lib/utils';
import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { EditIngredientDrawer } from './AddIngredientDrawer';

interface InventoryItemProps {
  ingredient: Ingredient;
  onUpdate?: (id: string, updates: Partial<Omit<Ingredient, 'id'>>) => void;
  onDelete?: (id: string) => void;
}

export default function InventoryItem({
  ingredient,
  onUpdate,
  onDelete,
}: InventoryItemProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const imageIsEmoji = isEmoji(ingredient.image);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(ingredient.id);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="group flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-[#e9eaeb] bg-white">
          {imageIsEmoji ? (
            <div className="flex h-full w-full items-center justify-center text-2xl">
              {ingredient.image}
            </div>
          ) : (
            <Image
              alt={ingredient.name}
              className="object-cover"
              height={32}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImageUrl('🥘');
              }}
              src={ingredient.image}
              width={32}
            />
          )}
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
          <div className="flex gap-1 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
            {onUpdate && (
              <EditIngredientDrawer
                ingredient={ingredient}
                onUpdateIngredient={onUpdate}
                trigger={
                  <Button className="h-7 w-7 p-0" size="sm" variant="ghost">
                    <Edit className="h-3 w-3" />
                  </Button>
                }
              />
            )}
            {onDelete && (
              <Dialog
                onOpenChange={setDeleteDialogOpen}
                open={deleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                    size="sm"
                    variant="ghost"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Ingredient</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete{' '}
                      <strong>{ingredient.name}</strong>? This action cannot be
                      undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={() => setDeleteDialogOpen(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleDelete} variant="destructive">
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
