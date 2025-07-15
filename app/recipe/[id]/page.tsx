'use client';

import { RecipeDetails } from '@/components/recipe/RecipeDetails';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { Button } from '@/components/ui/button';
import { useRecipes } from '@/hooks/use-storage';
import type { Recipe } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function FloatingBackButton() {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-20 pointer-events-none">
      {/* Floating Back Button */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        <Link href="/recipes">
          <Button
            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-200"
            size="icon"
            variant="ghost"
          >
            <ArrowLeft className="h-5 w-5 text-[#414651]" />
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default function RecipePage({ params }: PageProps) {
  const { getRecipeById } = useRecipes();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;

        // Fetch the recipe from storage
        const storedRecipe = getRecipeById(id);
        setRecipe(storedRecipe);
      } catch (error) {
        console.error('Error loading recipe:', error);
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [params, getRecipeById]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <FloatingBackButton />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading recipe...</p>
        </div>
        <BottomNavigation activeTab="kitchen" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <FloatingBackButton />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Recipe not found</p>
            <Link href="/recipes">
              <Button>Back to Recipes</Button>
            </Link>
          </div>
        </div>
        <BottomNavigation activeTab="kitchen" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <FloatingBackButton />
      <div className="flex-1 overflow-auto">
        <RecipeDetails recipe={recipe} />
      </div>
      <BottomNavigation activeTab="kitchen" />
    </div>
  );
}
