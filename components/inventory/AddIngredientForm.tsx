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
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface AddIngredientFormProps {
  onAddIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
  onClose?: () => void;
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

export default function AddIngredientForm({
  onAddIngredient,
  onClose,
}: AddIngredientFormProps) {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = () => {
    if (name.trim() && unit) {
      onAddIngredient({
        name: name.trim(),
        quantity: quantity.toString(),
        image: '', // Will be set with a default or uploaded image
      });
      // Reset form
      setName('');
      setUnit('');
      setQuantity(1);
      if (onClose) {
        onClose();
      }
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleQuantityChange = (value: string) => {
    const num = Number.parseInt(value, 10) || 1;
    setQuantity(num > 0 ? num : 1);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl text-[#000000] leading-8 tracking-[-0.528px]">
          Input Ingredients for Inventory
        </h1>
        <p className="text-[#a4a7ae] text-sm leading-5">
          Enter each ingredient used in your inventory, specifying its amount
          and how it's measured (e.g., Kg, Grams, Slices). This helps ensure
          accurate stock tracking.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label
            className="font-medium text-[#414651] text-lg leading-7"
            htmlFor="ingredient-name"
          >
            Name
          </label>
          <Input
            className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#414651] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
            id="ingredient-name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter ingredient name"
            value={name}
          />
        </div>

        {/* Unit Field */}
        <div className="flex flex-col gap-2">
          <label
            className="font-medium text-[#414651] text-lg leading-7"
            htmlFor="ingredient-unit"
          >
            Unit
          </label>
          <Select onValueChange={setUnit} value={unit}>
            <SelectTrigger
              className="h-11 rounded-lg border-[#d5d7da] px-3.5 py-2.5 text-[#717680] text-base leading-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
              id="ingredient-unit"
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
            htmlFor="ingredient-quantity"
          >
            Quantity
          </label>
          <div className="flex rounded-lg border border-[#d5d7da] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
            {/* Quantity Display */}
            <div className="flex flex-1 items-center border-[#d5d7da] border-r bg-white px-4 py-2">
              <input
                className="w-full border-0 bg-transparent text-[#414651] text-base leading-6 outline-none"
                id="ingredient-quantity"
                min="1"
                onChange={(e) => handleQuantityChange(e.target.value)}
                type="number"
                value={quantity}
              />
            </div>
            {/* Minus Button */}
            <button
              className="flex items-center justify-center border-[#d5d7da] border-r bg-white px-4 py-2 transition-colors hover:bg-gray-50"
              onClick={decrementQuantity}
              type="button"
            >
              <Minus className="h-6 w-6 text-[#717680]" />
            </button>
            {/* Plus Button */}
            <button
              className="flex items-center justify-center bg-white px-3 py-2 transition-colors hover:bg-gray-50"
              onClick={incrementQuantity}
              type="button"
            >
              <Plus className="h-6 w-6 text-[#717680]" />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-end">
          <Button
            className="rounded-lg bg-[#181d27] px-5 py-2 font-semibold text-[#fdfdfd] text-base leading-6 hover:bg-[#181d27]/90"
            disabled={!(name.trim() && unit)}
            onClick={handleSubmit}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
