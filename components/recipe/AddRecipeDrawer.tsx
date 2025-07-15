'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Recipe } from '@/lib/types';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Drawer } from 'vaul';

interface AddRecipeDrawerProps {
  onAddRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  trigger: React.ReactNode;
}

interface EditRecipeDrawerProps {
  recipe: Recipe;
  onUpdateRecipe: (id: string, updates: Partial<Omit<Recipe, 'id'>>) => void;
  trigger: React.ReactNode;
}

export function EditRecipeDrawer({
  recipe,
  onUpdateRecipe,
  trigger,
}: EditRecipeDrawerProps) {
  const [name, setName] = useState(recipe.name);
  const [creator, setCreator] = useState(recipe.creator);
  const [description, setDescription] = useState(recipe.description);
  const [image, setImage] = useState(recipe.image);
  const [energy, setEnergy] = useState(recipe.nutrition.energy);
  const [carbs, setCarbs] = useState(recipe.nutrition.carbs);
  const [proteins, setProteins] = useState(recipe.nutrition.proteins);
  const [fats, setFats] = useState(recipe.nutrition.fats);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (name.trim() && creator.trim() && description.trim()) {
      onUpdateRecipe(recipe.id, {
        name: name.trim(),
        creator: creator.trim(),
        description: description.trim(),
        image: image.trim() || recipe.image,
        nutrition: {
          energy: energy.trim() || recipe.nutrition.energy,
          carbs: carbs.trim() || recipe.nutrition.carbs,
          proteins: proteins.trim() || recipe.nutrition.proteins,
          fats: fats.trim() || recipe.nutrition.fats,
        },
      });
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setName(recipe.name);
    setCreator(recipe.creator);
    setDescription(recipe.description);
    setImage(recipe.image);
    setEnergy(recipe.nutrition.energy);
    setCarbs(recipe.nutrition.carbs);
    setProteins(recipe.nutrition.proteins);
    setFats(recipe.nutrition.fats);
  };

  return (
    <Drawer.Root onOpenChange={setOpen} open={open}>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
          <Drawer.Content className="flex h-[90vh] max-h-[90vh] w-full max-w-md flex-col rounded-t-[20px] bg-white shadow-xl">
            <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-gray-300" />

            <header className="sticky top-0 z-10 flex items-center justify-between border-gray-200 border-b bg-white p-4">
              <div className="flex items-center">
                <h1 className="font-bold text-[#181d27] text-lg">
                  Edit Recipe
                </h1>
              </div>
              <Button
                className="h-8 w-8"
                onClick={handleClose}
                size="icon"
                variant="ghost"
              >
                <X className="h-5 w-5 text-[#414651]" />
              </Button>
            </header>

            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
                <div className="flex flex-col gap-2">
                  <p className="text-[#a4a7ae] text-sm leading-5">
                    Update your recipe details including name, description, and
                    nutritional information.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-base leading-6"
                      htmlFor="edit-recipe-name"
                    >
                      Recipe Name
                    </label>
                    <Input
                      className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                      id="edit-recipe-name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter recipe name"
                      value={name}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-base leading-6"
                      htmlFor="edit-recipe-creator"
                    >
                      Creator
                    </label>
                    <Input
                      className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                      id="edit-recipe-creator"
                      onChange={(e) => setCreator(e.target.value)}
                      placeholder="Enter creator name"
                      value={creator}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-base leading-6"
                      htmlFor="edit-recipe-description"
                    >
                      Description
                    </label>
                    <textarea
                      className="h-20 resize-none rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                      id="edit-recipe-description"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter recipe description"
                      value={description}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-base leading-6"
                      htmlFor="edit-recipe-image"
                    >
                      Image URL
                    </label>
                    <Input
                      className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                      id="edit-recipe-image"
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Enter image URL"
                      value={image}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-[#414651] text-base leading-6">
                      Nutrition Information
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-medium text-[#414651] text-sm leading-5"
                          htmlFor="edit-recipe-energy"
                        >
                          Energy
                        </label>
                        <Input
                          className="h-10 rounded-lg border-[#d5d7da] px-3 py-2 text-[#414651] text-sm leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                          id="edit-recipe-energy"
                          onChange={(e) => setEnergy(e.target.value)}
                          placeholder="e.g., 250 kcal"
                          value={energy}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-medium text-[#414651] text-sm leading-5"
                          htmlFor="edit-recipe-carbs"
                        >
                          Carbs
                        </label>
                        <Input
                          className="h-10 rounded-lg border-[#d5d7da] px-3 py-2 text-[#414651] text-sm leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                          id="edit-recipe-carbs"
                          onChange={(e) => setCarbs(e.target.value)}
                          placeholder="e.g., 30g"
                          value={carbs}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-medium text-[#414651] text-sm leading-5"
                          htmlFor="edit-recipe-proteins"
                        >
                          Proteins
                        </label>
                        <Input
                          className="h-10 rounded-lg border-[#d5d7da] px-3 py-2 text-[#414651] text-sm leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                          id="edit-recipe-proteins"
                          onChange={(e) => setProteins(e.target.value)}
                          placeholder="e.g., 15g"
                          value={proteins}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-medium text-[#414651] text-sm leading-5"
                          htmlFor="edit-recipe-fats"
                        >
                          Fats
                        </label>
                        <Input
                          className="h-10 rounded-lg border-[#d5d7da] px-3 py-2 text-[#414651] text-sm leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                          id="edit-recipe-fats"
                          onChange={(e) => setFats(e.target.value)}
                          placeholder="e.g., 8g"
                          value={fats}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-gray-200 border-t bg-white p-4 pb-6">
                <div className="flex gap-3">
                  <Button
                    className="h-11 flex-1 rounded-lg border-[#d5d7da] px-5 py-2.5 font-semibold text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                    onClick={handleClose}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="h-11 flex-1 rounded-lg bg-[#181d27] px-5 py-2.5 font-semibold text-[#fdfdfd] text-base leading-6 shadow-[4px_4px_8.7px_0px_rgba(0,0,0,0.12)] hover:bg-[#181d27]/90"
                    disabled={
                      !(name.trim() && creator.trim() && description.trim())
                    }
                    onClick={handleSubmit}
                  >
                    Update Recipe
                  </Button>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </div>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default function AddRecipeDrawer({
  onAddRecipe,
  trigger,
}: AddRecipeDrawerProps) {
  const [name, setName] = useState('');
  const [creator, setCreator] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [energy, setEnergy] = useState('');
  const [carbs, setCarbs] = useState('');
  const [proteins, setProteins] = useState('');
  const [fats, setFats] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (name.trim() && creator.trim() && description.trim()) {
      onAddRecipe({
        name: name.trim(),
        creator: creator.trim(),
        description: description.trim(),
        image: image.trim() || '/assets/kangkung.png', // Default image
        nutrition: {
          energy: energy.trim() || '0 kcal',
          carbs: carbs.trim() || '0g',
          proteins: proteins.trim() || '0g',
          fats: fats.trim() || '0g',
        },
        ingredients: [], // Start with empty ingredients, can be added later
      });
      // Reset form
      setName('');
      setCreator('');
      setDescription('');
      setImage('');
      setEnergy('');
      setCarbs('');
      setProteins('');
      setFats('');
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setName('');
    setCreator('');
    setDescription('');
    setImage('');
    setEnergy('');
    setCarbs('');
    setProteins('');
    setFats('');
  };

  return (
    <Drawer.Root onOpenChange={setOpen} open={open}>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
          <Drawer.Content className="flex h-[90vh] max-h-[90vh] w-full max-w-md flex-col rounded-t-[20px] bg-white shadow-xl">
            <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-gray-300" />

            <header className="sticky top-0 z-10 flex items-center justify-between border-gray-200 border-b bg-white p-4">
              <div className="flex items-center">
                <h1 className="font-bold text-[#181d27] text-lg">Add Recipe</h1>
              </div>
              <Button
                className="h-8 w-8"
                onClick={handleClose}
                size="icon"
                variant="ghost"
              >
                <X className="h-5 w-5 text-[#414651]" />
              </Button>
            </header>

            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
                <div className="flex flex-col gap-2">
                  <p className="text-[#a4a7ae] text-sm leading-5">
                    Create a new recipe with name, description, and nutritional
                    information.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-base leading-6"
                      htmlFor="recipe-name"
                    >
                      Recipe Name
                    </label>
                    <Input
                      className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                      id="recipe-name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter recipe name"
                      value={name}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-base leading-6"
                      htmlFor="recipe-creator"
                    >
                      Creator
                    </label>
                    <Input
                      className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                      id="recipe-creator"
                      onChange={(e) => setCreator(e.target.value)}
                      placeholder="Enter creator name"
                      value={creator}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-base leading-6"
                      htmlFor="recipe-description"
                    >
                      Description
                    </label>
                    <textarea
                      className="h-20 resize-none rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                      id="recipe-description"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter recipe description"
                      value={description}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-base leading-6"
                      htmlFor="recipe-image"
                    >
                      Image URL (optional)
                    </label>
                    <Input
                      className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                      id="recipe-image"
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Enter image URL"
                      value={image}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-[#414651] text-base leading-6">
                      Nutrition Information (optional)
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-medium text-[#414651] text-sm leading-5"
                          htmlFor="recipe-energy"
                        >
                          Energy
                        </label>
                        <Input
                          className="h-10 rounded-lg border-[#d5d7da] px-3 py-2 text-[#414651] text-sm leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                          id="recipe-energy"
                          onChange={(e) => setEnergy(e.target.value)}
                          placeholder="e.g., 250 kcal"
                          value={energy}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-medium text-[#414651] text-sm leading-5"
                          htmlFor="recipe-carbs"
                        >
                          Carbs
                        </label>
                        <Input
                          className="h-10 rounded-lg border-[#d5d7da] px-3 py-2 text-[#414651] text-sm leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                          id="recipe-carbs"
                          onChange={(e) => setCarbs(e.target.value)}
                          placeholder="e.g., 30g"
                          value={carbs}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-medium text-[#414651] text-sm leading-5"
                          htmlFor="recipe-proteins"
                        >
                          Proteins
                        </label>
                        <Input
                          className="h-10 rounded-lg border-[#d5d7da] px-3 py-2 text-[#414651] text-sm leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                          id="recipe-proteins"
                          onChange={(e) => setProteins(e.target.value)}
                          placeholder="e.g., 15g"
                          value={proteins}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-medium text-[#414651] text-sm leading-5"
                          htmlFor="recipe-fats"
                        >
                          Fats
                        </label>
                        <Input
                          className="h-10 rounded-lg border-[#d5d7da] px-3 py-2 text-[#414651] text-sm leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                          id="recipe-fats"
                          onChange={(e) => setFats(e.target.value)}
                          placeholder="e.g., 8g"
                          value={fats}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-gray-200 border-t bg-white p-4 pb-6">
                <div className="flex gap-3">
                  <Button
                    className="h-11 flex-1 rounded-lg border-[#d5d7da] px-5 py-2.5 font-semibold text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                    onClick={handleClose}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="h-11 flex-1 rounded-lg bg-[#181d27] px-5 py-2.5 font-semibold text-[#fdfdfd] text-base leading-6 shadow-[4px_4px_8.7px_0px_rgba(0,0,0,0.12)] hover:bg-[#181d27]/90"
                    disabled={
                      !(name.trim() && creator.trim() && description.trim())
                    }
                    onClick={handleSubmit}
                  >
                    Add Recipe
                  </Button>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </div>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
