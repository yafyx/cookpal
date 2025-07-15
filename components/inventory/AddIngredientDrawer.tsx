'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Ingredient } from '@/lib/types';
import { Minus, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Drawer } from 'vaul';

interface AddIngredientDrawerProps {
  onAddIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
  trigger: React.ReactNode;
}

interface EditIngredientDrawerProps {
  ingredient: Ingredient;
  onUpdateIngredient: (id: string, updates: Partial<Omit<Ingredient, 'id'>>) => void;
  trigger: React.ReactNode;
}

const units = [
  'kg',
  'grams',
  'lbs',
  'oz',
  'pieces',
  'slices',
  'cups',
  'tbsp',
  'tsp',
  'liters',
  'ml',
];

export function EditIngredientDrawer({
  ingredient,
  onUpdateIngredient,
  trigger,
}: EditIngredientDrawerProps) {
  const [name, setName] = useState(ingredient.name);
  const [unit, setUnit] = useState(ingredient.quantity.replace(/[0-9]/g, '').trim());
  const [quantity, setQuantity] = useState(
    Number.parseInt(ingredient.quantity.replace(/[a-zA-Z]/g, ''), 10) || 1
  );
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (name.trim() && unit) {
      onUpdateIngredient(ingredient.id, {
        name: name.trim(),
        quantity: `${quantity} ${unit}`,
      });
      setOpen(false);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleQuantityChange = (value: string) => {
    const num = Number.parseInt(value, 10) || 1;
    setQuantity(num > 0 ? num : 1);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setName(ingredient.name);
    setUnit(ingredient.quantity.replace(/[0-9]/g, '').trim());
    setQuantity(
      Number.parseInt(ingredient.quantity.replace(/[a-zA-Z]/g, ''), 10) || 1
    );
  };

  return (
    <Drawer.Root onOpenChange={setOpen} open={open}>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        {/* Full viewport overlay */}
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        {/* Drawer content container - respects layout constraints */}
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
          <Drawer.Content className="flex h-[85vh] max-h-[85vh] w-full max-w-md flex-col rounded-t-[20px] bg-white shadow-xl">
            {/* Drag Handle */}
            <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-gray-300" />

            {/* Mobile Header - Following the MobileHeader component pattern */}
            <header className="sticky top-0 z-10 flex items-center justify-between border-gray-200 border-b bg-white p-4">
              <div className="flex items-center">
                <h1 className="font-bold text-[#181d27] text-lg">
                  Edit Ingredient
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

            {/* Content - Following mobile layout patterns */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
                {/* Description */}
                <div className="flex flex-col gap-2">
                  <p className="text-[#a4a7ae] text-sm leading-5">
                    Update the ingredient details including name, unit, and quantity
                    to keep your inventory accurate.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-4">
                  {/* Name Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-lg leading-7"
                      htmlFor="edit-ingredient-name"
                    >
                      Name
                    </label>
                    <Input
                      className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                      id="edit-ingredient-name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter ingredient name"
                      value={name}
                    />
                  </div>

                  {/* Unit Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-lg leading-7"
                      htmlFor="edit-ingredient-unit"
                    >
                      Unit
                    </label>
                    <Select onValueChange={setUnit} value={unit}>
                      <SelectTrigger
                        className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#717680] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                        id="edit-ingredient-unit"
                      >
                        <SelectValue placeholder="Choose unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unitOption) => (
                          <SelectItem key={unitOption} value={unitOption}>
                            {unitOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-lg leading-7"
                      htmlFor="edit-ingredient-quantity"
                    >
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        className="h-11 w-11 rounded-lg border-[#d5d7da] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] hover:bg-gray-50"
                        onClick={decrementQuantity}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-center text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                        id="edit-ingredient-quantity"
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        type="number"
                        value={quantity}
                      />
                      <Button
                        className="h-11 w-11 rounded-lg border-[#d5d7da] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] hover:bg-gray-50"
                        onClick={incrementQuantity}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Footer - Following mobile button patterns */}
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
                    disabled={!(name.trim() && unit)}
                    onClick={handleSubmit}
                  >
                    Update Ingredient
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

export default function AddIngredientDrawer({
  onAddIngredient,
  trigger,
}: AddIngredientDrawerProps) {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (name.trim() && unit) {
      onAddIngredient({
        name: name.trim(),
        quantity: `${quantity} ${unit}`,
        image: '', // Will be set with a default or uploaded image
      });
      // Reset form
      setName('');
      setUnit('');
      setQuantity(1);
      setOpen(false);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleQuantityChange = (value: string) => {
    const num = Number.parseInt(value, 10) || 1;
    setQuantity(num > 0 ? num : 1);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setName('');
    setUnit('');
    setQuantity(1);
  };

  return (
    <Drawer.Root onOpenChange={setOpen} open={open}>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        {/* Full viewport overlay */}
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        {/* Drawer content container - respects layout constraints */}
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
          <Drawer.Content className="flex h-[85vh] max-h-[85vh] w-full max-w-md flex-col rounded-t-[20px] bg-white shadow-xl">
            {/* Drag Handle */}
            <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-gray-300" />

            {/* Mobile Header - Following the MobileHeader component pattern */}
            <header className="sticky top-0 z-10 flex items-center justify-between border-gray-200 border-b bg-white p-4">
              <div className="flex items-center">
                <h1 className="font-bold text-[#181d27] text-lg">
                  Add Ingredient
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

            {/* Content - Following mobile layout patterns */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
                {/* Description */}
                <div className="flex flex-col gap-2">
                  <p className="text-[#a4a7ae] text-sm leading-5">
                    Enter each ingredient used in your inventory, specifying its
                    amount and how it's measured (e.g., Kg, Grams, Slices). This
                    helps ensure accurate stock tracking.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-4">
                  {/* Name Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-lg leading-7"
                      htmlFor="drawer-ingredient-name"
                    >
                      Name
                    </label>
                    <Input
                      className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                      id="drawer-ingredient-name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter ingredient name"
                      value={name}
                    />
                  </div>

                  {/* Unit Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-lg leading-7"
                      htmlFor="drawer-ingredient-unit"
                    >
                      Unit
                    </label>
                    <Select onValueChange={setUnit} value={unit}>
                      <SelectTrigger
                        className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#717680] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                        id="drawer-ingredient-unit"
                      >
                        <SelectValue placeholder="Choose unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unitOption) => (
                          <SelectItem key={unitOption} value={unitOption}>
                            {unitOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-medium text-[#414651] text-lg leading-7"
                      htmlFor="drawer-ingredient-quantity"
                    >
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        className="h-11 w-11 rounded-lg border-[#d5d7da] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] hover:bg-gray-50"
                        onClick={decrementQuantity}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-center text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                        id="drawer-ingredient-quantity"
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        type="number"
                        value={quantity}
                      />
                      <Button
                        className="h-11 w-11 rounded-lg border-[#d5d7da] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] hover:bg-gray-50"
                        onClick={incrementQuantity}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Footer - Following mobile button patterns */}
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
                    disabled={!(name.trim() && unit)}
                    onClick={handleSubmit}
                  >
                    Add Ingredient
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
