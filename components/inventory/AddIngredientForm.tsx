'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileHeader } from '@/components/ui/mobile-header';
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
    <div className="flex min-h-screen flex-col bg-white">
      <MobileHeader
        onBackClick={onClose}
        showBackButton
        title="Add Ingredient"
      />

      <div className="flex flex-1 flex-col gap-6 p-4">
        {/* Description */}
        <div className="flex flex-col gap-2">
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
                id="ingredient-quantity"
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
