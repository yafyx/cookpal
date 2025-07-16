'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInventory } from '@/hooks/use-storage';
import type { Ingredient, Recipe } from '@/lib/types';
import { Edit2, Package, Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
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

interface IngredientFormData {
  name: string;
  quantity: string;
  image: string;
}

interface IngredientItemProps {
  ingredient: Ingredient;
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (id: string) => void;
}

function IngredientItem({ ingredient, onEdit, onDelete }: IngredientItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-lg border border-[#e9eaeb] bg-white">
          <Image
            alt={ingredient.name}
            className="h-full w-full object-cover"
            height={40}
            src={ingredient.image || '/cookpal.svg'}
            width={40}
          />
        </div>
        <div>
          <span className="font-medium text-[#181d27] text-sm">
            {ingredient.name}
          </span>
          <p className="text-[#717680] text-xs">{ingredient.quantity}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          className="h-8 w-8 p-0"
          onClick={() => onEdit(ingredient)}
          size="sm"
          variant="ghost"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
          onClick={() => onDelete(ingredient.id)}
          size="sm"
          variant="ghost"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

interface InventoryItemSelectorProps {
  inventoryItem: Ingredient;
  onSelect: (ingredient: IngredientFormData) => void;
}

function InventoryItemSelector({
  inventoryItem,
  onSelect,
}: InventoryItemSelectorProps) {
  const [quantity, setQuantity] = useState('');

  const handleSelect = () => {
    if (quantity.trim()) {
      onSelect({
        name: inventoryItem.name,
        quantity: quantity.trim(),
        image: inventoryItem.image,
      });
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#e9eaeb] bg-white p-3">
      <div className="h-10 w-10 overflow-hidden rounded-lg border border-[#e9eaeb] bg-white">
        <Image
          alt={inventoryItem.name}
          className="h-full w-full object-cover"
          height={40}
          src={inventoryItem.image || '/cookpal.svg'}
          width={40}
        />
      </div>
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-medium text-[#181d27] text-sm">
            {inventoryItem.name}
          </span>
          <div className="flex items-center gap-1">
            <Package className="h-3 w-3 text-gray-500" />
            <span className="text-gray-600 text-xs">
              {inventoryItem.quantity}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Input
            className="h-8 flex-1 text-sm"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 2 pieces"
            value={quantity}
          />
          <Button
            className="h-8 px-3"
            disabled={!quantity.trim()}
            onClick={handleSelect}
            size="sm"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

interface AddIngredientFormProps {
  onAdd: (ingredient: IngredientFormData) => void;
  editingIngredient?: Ingredient;
  onCancel: () => void;
}

function AddIngredientForm({
  onAdd,
  editingIngredient,
  onCancel,
}: AddIngredientFormProps) {
  const [mode, setMode] = useState<'inventory' | 'manual'>('inventory');
  const [name, setName] = useState(editingIngredient?.name || '');
  const [quantity, setQuantity] = useState(editingIngredient?.quantity || '');
  const [image, setImage] = useState(editingIngredient?.image || '');
  const { ingredients: inventoryItems } = useInventory();

  const handleSubmit = () => {
    if (name.trim() && quantity.trim()) {
      onAdd({
        name: name.trim(),
        quantity: quantity.trim(),
        image: image.trim() || '/cookpal.svg',
      });
      setName('');
      setQuantity('');
      setImage('');
    }
  };

  const handleInventorySelect = (ingredient: IngredientFormData) => {
    onAdd(ingredient);
  };

  return (
    <div className="space-y-4 rounded-lg bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-[#414651] text-sm">
          {editingIngredient ? 'Edit Ingredient' : 'Add Ingredient'}
        </h4>
        <Button
          className="h-6 w-6 p-0"
          onClick={onCancel}
          size="sm"
          variant="ghost"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {!editingIngredient && (
        <div className="flex rounded-lg bg-white p-1">
          <Button
            className="h-8 flex-1"
            onClick={() => setMode('inventory')}
            size="sm"
            variant={mode === 'inventory' ? 'default' : 'ghost'}
          >
            From Inventory
          </Button>
          <Button
            className="h-8 flex-1"
            onClick={() => setMode('manual')}
            size="sm"
            variant={mode === 'manual' ? 'default' : 'ghost'}
          >
            Add New
          </Button>
        </div>
      )}

      {mode === 'inventory' && !editingIngredient && (
        <div className="max-h-60 space-y-2 overflow-y-auto">
          {inventoryItems.length > 0 ? (
            inventoryItems.map((item) => (
              <InventoryItemSelector
                inventoryItem={item}
                key={item.id}
                onSelect={handleInventorySelect}
              />
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500 text-sm">
                No ingredients in inventory
              </p>
              <Button
                className="mt-2"
                onClick={() => setMode('manual')}
                size="sm"
                variant="outline"
              >
                Add manually instead
              </Button>
            </div>
          )}
        </div>
      )}

      {(mode === 'manual' || editingIngredient) && (
        <div className="space-y-3">
          <div>
            <label
              className="mb-1 block text-[#414651] text-sm"
              htmlFor="ingredient-name"
            >
              Name
            </label>
            <Input
              className="h-10"
              id="ingredient-name"
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Tomato"
              value={name}
            />
          </div>

          <div>
            <label
              className="mb-1 block text-[#414651] text-sm"
              htmlFor="ingredient-quantity"
            >
              Quantity
            </label>
            <Input
              className="h-10"
              id="ingredient-quantity"
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 2 pieces"
              value={quantity}
            />
          </div>

          <div>
            <label
              className="mb-1 block text-[#414651] text-sm"
              htmlFor="ingredient-image"
            >
              Image URL (optional)
            </label>
            <Input
              className="h-10"
              id="ingredient-image"
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              value={image}
            />
          </div>

          <div className="flex gap-2">
            <Button
              className="h-10 flex-1"
              disabled={!(name.trim() && quantity.trim())}
              onClick={handleSubmit}
            >
              {editingIngredient ? 'Update' : 'Add'}
            </Button>
            <Button
              className="h-10 flex-1"
              onClick={onCancel}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
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
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe.ingredients || []
  );
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<
    Ingredient | undefined
  >();
  const [open, setOpen] = useState(false);

  const handleAddIngredient = (ingredientData: IngredientFormData) => {
    if (editingIngredient) {
      // Update existing ingredient
      setIngredients((prev) =>
        prev.map((ing) =>
          ing.id === editingIngredient.id ? { ...ing, ...ingredientData } : ing
        )
      );
      setEditingIngredient(undefined);
    } else {
      // Add new ingredient
      const newIngredient: Ingredient = {
        id: `ingredient-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...ingredientData,
      };
      setIngredients((prev) => [...prev, newIngredient]);
    }
    setShowIngredientForm(false);
  };

  const handleEditIngredient = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setShowIngredientForm(true);
  };

  const handleDeleteIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

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
        ingredients,
      });
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setShowIngredientForm(false);
    setEditingIngredient(undefined);
    // Reset form when closing
    setName(recipe.name);
    setCreator(recipe.creator);
    setDescription(recipe.description);
    setImage(recipe.image);
    setEnergy(recipe.nutrition.energy);
    setCarbs(recipe.nutrition.carbs);
    setProteins(recipe.nutrition.proteins);
    setFats(recipe.nutrition.fats);
    setIngredients(recipe.ingredients || []);
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
                    Update your recipe details including name, description,
                    ingredients, and nutritional information.
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

                  {/* Ingredients Section */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-[#414651] text-base leading-6">
                        Ingredients
                      </h3>
                      <Button
                        className="h-8 px-3"
                        onClick={() => setShowIngredientForm(true)}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add
                      </Button>
                    </div>

                    {showIngredientForm && (
                      <AddIngredientForm
                        editingIngredient={editingIngredient}
                        onAdd={handleAddIngredient}
                        onCancel={() => {
                          setShowIngredientForm(false);
                          setEditingIngredient(undefined);
                        }}
                      />
                    )}

                    <div className="space-y-2">
                      {ingredients.length > 0 ? (
                        ingredients.map((ingredient) => (
                          <IngredientItem
                            ingredient={ingredient}
                            key={ingredient.id}
                            onDelete={handleDeleteIngredient}
                            onEdit={handleEditIngredient}
                          />
                        ))
                      ) : (
                        <p className="py-4 text-center text-[#a4a7ae] text-sm">
                          No ingredients added yet
                        </p>
                      )}
                    </div>
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
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<
    Ingredient | undefined
  >();
  const [open, setOpen] = useState(false);

  const handleAddIngredient = (ingredientData: IngredientFormData) => {
    if (editingIngredient) {
      // Update existing ingredient
      setIngredients((prev) =>
        prev.map((ing) =>
          ing.id === editingIngredient.id ? { ...ing, ...ingredientData } : ing
        )
      );
      setEditingIngredient(undefined);
    } else {
      // Add new ingredient
      const newIngredient: Ingredient = {
        id: `ingredient-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...ingredientData,
      };
      setIngredients((prev) => [...prev, newIngredient]);
    }
    setShowIngredientForm(false);
  };

  const handleEditIngredient = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setShowIngredientForm(true);
  };

  const handleDeleteIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const handleSubmit = () => {
    if (name.trim() && creator.trim() && description.trim()) {
      onAddRecipe({
        name: name.trim(),
        creator: creator.trim(),
        description: description.trim(),
        image: image.trim() || '/cookpal.svg', // Default image
        nutrition: {
          energy: energy.trim() || '0 kcal',
          carbs: carbs.trim() || '0g',
          proteins: proteins.trim() || '0g',
          fats: fats.trim() || '0g',
        },
        ingredients,
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
      setIngredients([]);
      setShowIngredientForm(false);
      setEditingIngredient(undefined);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setShowIngredientForm(false);
    setEditingIngredient(undefined);
    // Reset form when closing
    setName('');
    setCreator('');
    setDescription('');
    setImage('');
    setEnergy('');
    setCarbs('');
    setProteins('');
    setFats('');
    setIngredients([]);
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
                    Create a new recipe with name, description, ingredients, and
                    nutritional information.
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

                  {/* Ingredients Section */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-[#414651] text-base leading-6">
                        Ingredients
                      </h3>
                      <Button
                        className="h-8 px-3"
                        onClick={() => setShowIngredientForm(true)}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add
                      </Button>
                    </div>

                    {showIngredientForm && (
                      <AddIngredientForm
                        editingIngredient={editingIngredient}
                        onAdd={handleAddIngredient}
                        onCancel={() => {
                          setShowIngredientForm(false);
                          setEditingIngredient(undefined);
                        }}
                      />
                    )}

                    <div className="space-y-2">
                      {ingredients.length > 0 ? (
                        ingredients.map((ingredient) => (
                          <IngredientItem
                            ingredient={ingredient}
                            key={ingredient.id}
                            onDelete={handleDeleteIngredient}
                            onEdit={handleEditIngredient}
                          />
                        ))
                      ) : (
                        <p className="py-4 text-center text-[#a4a7ae] text-sm">
                          No ingredients added yet
                        </p>
                      )}
                    </div>
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
