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
import type { Recipe } from '@/lib/types';
import { getFallbackImageUrl, isEmoji } from '@/lib/utils';
import { Edit, Timer, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { EditRecipeDrawer } from './AddRecipeDrawer';

interface RecipeItemProps {
  recipe: Recipe;
  onUpdate?: (id: string, updates: Partial<Omit<Recipe, 'id'>>) => void;
  onDelete?: (id: string) => void;
  variant?: 'list' | 'card';
}

export default function RecipeItem({
  recipe,
  onUpdate,
  onDelete,
  variant = 'list',
}: RecipeItemProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const imageIsEmoji = isEmoji(recipe.image);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(recipe.id);
      setDeleteDialogOpen(false);
    }
  };

  if (variant === 'card') {
    return (
      <div className="group relative h-[449px] w-[330px] flex-shrink-0 overflow-hidden rounded-3xl">
        <Link
          className="absolute inset-0 flex flex-col justify-end p-4 text-white"
          href={`/recipe/${recipe.id}`}
          style={{
            backgroundImage: imageIsEmoji
              ? 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), linear-gradient(#f3f4f6, #f3f4f6)'
              : `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), url('${recipe.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {imageIsEmoji && (
            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              {recipe.image}
            </div>
          )}
          <h3 className="mb-3 font-semibold text-[24px] leading-8 tracking-[-0.528px]">
            {recipe.name}
          </h3>
          <p className="mb-3 line-clamp-2 text-[14px] leading-5 opacity-90">
            {recipe.description}
          </p>
          <div className="mb-3 flex items-center gap-1">
            <Timer className="h-[18px] w-[18px]" />
            <span className="text-[12px] leading-[18px]">30m</span>
          </div>
        </Link>

        {/* Action buttons - only show on hover */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          {onUpdate && (
            <EditRecipeDrawer
              onUpdateRecipe={onUpdate}
              recipe={recipe}
              trigger={
                <Button
                  className="h-8 w-8 bg-white/90 hover:bg-white"
                  size="sm"
                  variant="secondary"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              }
            />
          )}
          {onDelete && (
            <Dialog onOpenChange={setDeleteDialogOpen} open={deleteDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="h-8 w-8 bg-red-500/90 hover:bg-red-500"
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Recipe</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete "{recipe.name}"? This action
                    cannot be undone.
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
      </div>
    );
  }

  return (
    <div className="group flex items-center justify-between py-3">
      <Link
        className="flex flex-1 items-center gap-3"
        href={`/recipe/${recipe.id}`}
      >
        <div className="h-16 w-16 overflow-hidden rounded-lg border border-[#e9eaeb] bg-white">
          {imageIsEmoji ? (
            <div className="flex h-full w-full items-center justify-center text-3xl">
              {recipe.image}
            </div>
          ) : (
            <Image
              alt={recipe.name}
              className="h-full w-full object-cover"
              height={64}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImageUrl('🍽️');
              }}
              src={recipe.image}
              width={64}
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#181d27] text-[16px] leading-6">
            {recipe.name}
          </h3>
          <p className="line-clamp-2 text-[#717680] text-[14px] leading-5">
            {recipe.description}
          </p>
          <div className="mt-1 flex items-center gap-4">
            <span className="text-[#a4a7ae] text-[12px] leading-4">
              by {recipe.creator}
            </span>
            <div className="flex items-center gap-1">
              <Timer className="h-3 w-3 text-[#a4a7ae]" />
              <span className="text-[#a4a7ae] text-[12px] leading-4">30m</span>
            </div>
          </div>
        </div>
      </Link>
      {(onUpdate || onDelete) && (
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {onUpdate && (
            <EditRecipeDrawer
              onUpdateRecipe={onUpdate}
              recipe={recipe}
              trigger={
                <Button className="h-8 w-8 p-0" size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
              }
            />
          )}
          {onDelete && (
            <Dialog onOpenChange={setDeleteDialogOpen} open={deleteDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  size="sm"
                  variant="ghost"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Recipe</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete "{recipe.name}"? This action
                    cannot be undone.
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
  );
}
