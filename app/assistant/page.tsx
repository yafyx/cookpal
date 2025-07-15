'use client';

import BottomNavigation from '@/components/ui/bottom-navigation';
import { Button } from '@/components/ui/button';
import ChatIngredientCard from '@/components/ui/chat-ingredient-card';
import ChatRecipeCard from '@/components/ui/chat-recipe-card';
import { Input } from '@/components/ui/input';
import { MobileHeader } from '@/components/ui/mobile-header';
import type { Ingredient, Recipe } from '@/lib/types';
import { useChat } from '@ai-sdk/react';
import type { Message, ToolInvocation } from 'ai';
import { AlertCircle, ArrowUp, CheckCircle, History } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function AssistantPage() {
  const [input, setInput] = useState('');
  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const suggestionPills = [
    "Check what's missing in your fridge",
    'Set your health goal to personalize your meal plan',
    'What can I make with my current ingredients?',
    'Show me a healthy recipe for dinner',
  ];

  const handleSuggestionClick = (suggestion: string) => {
    append({ role: 'user', content: suggestion });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }
    append({
      role: 'user',
      content: input,
    });
    setInput('');
  };

  const getToolCallMessage = (toolName: string) => {
    const toolMessages = {
      getInventory: 'Checking your inventory...',
      getRecipes: 'Loading recipes...',
      getRecipeById: 'Getting recipe details...',
      checkCanMakeRecipe: 'Checking if you can make this recipe...',
      findRecipesByIngredients: 'Finding recipes with your ingredients...',
      getIngredientById: 'Getting ingredient details...',
    };
    return (
      toolMessages[toolName as keyof typeof toolMessages] || 'Processing...'
    );
  };

  const renderToolInvocation = (toolInvocation: ToolInvocation) => {
    if (toolInvocation.state === 'call') {
      return (
        <div className="mb-2 rounded-lg bg-blue-50 p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            <span className="text-blue-700 text-sm">
              {getToolCallMessage(toolInvocation.toolName)}
            </span>
          </div>
        </div>
      );
    }

    if (toolInvocation.state === 'result') {
      const result = toolInvocation.result;

      if (result.error) {
        return (
          <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-800 text-sm">{result.error}</span>
            </div>
          </div>
        );
      }

      // Simple rendering based on result type
      if (result.inventory) {
        return (
          <div className="mb-3 space-y-2">
            <div className="flex flex-wrap gap-2">
              {result.inventory.slice(0, 6).map((ingredient: Ingredient) => (
                <ChatIngredientCard
                  ingredient={ingredient}
                  key={ingredient.id}
                />
              ))}
            </div>
          </div>
        );
      }

      if (result.recipes) {
        return (
          <div className="mb-3 space-y-2">
            <div className="flex flex-wrap gap-2">
              {result.recipes.slice(0, 4).map((recipe: Recipe) => (
                <ChatRecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        );
      }

      if (result.recipe) {
        return (
          <div className="mb-3 space-y-2">
            <ChatRecipeCard recipe={result.recipe} />
          </div>
        );
      }

      if (result.ingredient) {
        return (
          <div className="mb-3 space-y-2">
            <ChatIngredientCard ingredient={result.ingredient} />
          </div>
        );
      }

      if (result.canMake !== undefined) {
        return (
          <div className="mb-3 space-y-2">
            <div
              className={`flex items-center gap-2 rounded-lg p-3 ${
                result.canMake
                  ? 'border border-green-200 bg-green-50'
                  : 'border border-orange-200 bg-orange-50'
              }`}
            >
              {result.canMake ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-orange-600" />
              )}
              <span
                className={`font-medium text-sm ${
                  result.canMake ? 'text-green-800' : 'text-orange-800'
                }`}
              >
                {result.canMake
                  ? 'You can make this recipe!'
                  : 'Missing ingredients'}
              </span>
            </div>
          </div>
        );
      }
    }

    return null;
  };

  const renderMessage = (message: Message) => {
    if (message.role === 'user') {
      return (
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl bg-[#fd853a] px-4 py-3 text-white">
            <p className="whitespace-pre-wrap text-sm">{message.content}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-2xl bg-gray-50 px-4 py-3 text-gray-900">
          {/* Render tool invocations */}
          {message.toolInvocations?.map((toolInvocation) => (
            <div key={toolInvocation.toolCallId}>
              {renderToolInvocation(toolInvocation)}
            </div>
          ))}

          {/* Render message content */}
          {message.content && (
            <p className="whitespace-pre-wrap text-sm">{message.content}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MobileHeader
        rightAction={
          <Button className="h-8 w-8" size="icon" variant="ghost">
            <History className="h-5 w-5 text-[#414651]" />
          </Button>
        }
        title="Instant Cooking Help"
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col p-4 pb-24">
        {/* Messages Area */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-8 rounded-full bg-[#fd853a]/10 p-4">
                <svg
                  className="h-8 w-8 text-[#fd853a]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Cooking Assistant Icon</title>
                  <path
                    d="M8 12h8m-4-4v8m-6 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">
                Hi! I'm your cooking assistant
              </h3>
              <p className="max-w-xs text-gray-500 text-sm">
                I can help you with recipes, check your inventory, and suggest
                meals based on what you have.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id}>{renderMessage(message)}</div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl bg-gray-50 px-4 py-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-[#fd853a]" />
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-[#fd853a]"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-[#fd853a]"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Section with Suggestions and Input */}
        <div className="mt-4 flex flex-col gap-3">
          {/* Suggestion Pills - only show when no messages */}
          {messages.length === 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {suggestionPills.map((suggestion) => (
                <Button
                  className="h-auto flex-shrink-0 whitespace-nowrap rounded-full border-[#e9eaeb] bg-[#fdfdfd] px-4 py-3 font-normal text-[#717680] text-sm transition-colors hover:bg-gray-50"
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  variant="outline"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}

          {/* Input Field */}
          <form className="relative" onSubmit={handleFormSubmit}>
            <Input
              className="w-full rounded-[24px] border-[#e9eaeb] bg-white px-4 py-3 pr-12 text-sm transition-all placeholder:text-[#717680] focus:border-[#fd853a] focus:ring-2 focus:ring-[#fd853a]/20"
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about cooking..."
              value={input}
            />
            <Button
              className="-translate-y-1/2 absolute top-1/2 right-3 h-[32px] w-[32px] rounded-full bg-[#fd853a] transition-all hover:bg-[#fd853a]/90 disabled:opacity-50"
              disabled={isLoading || !input.trim()}
              size="icon"
              type="submit"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="assistant" />
    </div>
  );
}
