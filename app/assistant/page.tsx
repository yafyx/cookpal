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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Helper function to get tool call message
const getToolCallMessage = (name: string) => {
  const toolMessages = {
    getInventory: 'Checking your inventory...',
    getRecipes: 'Loading recipes...',
    getRecipeById: 'Getting recipe details...',
    checkCanMakeRecipe: 'Checking if you can make this recipe...',
    findRecipesByIngredients: 'Finding recipes with your ingredients...',
    getIngredientById: 'Getting ingredient details...',
  };
  return toolMessages[name as keyof typeof toolMessages] || 'Processing...';
};

// Component for rendering tool loading state
const ToolLoadingState = ({ toolName }: { toolName: string }) => {
  return (
    <div className="mb-2 rounded-lg bg-blue-50 p-3">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
        <span className="text-blue-700 text-sm">
          {getToolCallMessage(toolName)}
        </span>
      </div>
    </div>
  );
};

// Component for rendering tool error state
const ToolErrorState = ({ error }: { error: string }) => (
  <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3">
    <div className="flex items-center gap-2">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <span className="text-red-800 text-sm">{error}</span>
    </div>
  </div>
);

// Component for rendering inventory results
const InventoryResult = ({ inventory }: { inventory: Ingredient[] }) => (
  <div className="mb-3 space-y-2">
    <div className="flex flex-wrap gap-2">
      {inventory.slice(0, 6).map((ingredient: Ingredient) => (
        <ChatIngredientCard ingredient={ingredient} key={ingredient.id} />
      ))}
    </div>
  </div>
);

// Component for rendering recipe results
const RecipeResult = ({ recipes }: { recipes: Recipe[] }) => (
  <div className="mb-3 space-y-2">
    <div className="flex flex-wrap gap-2">
      {recipes.slice(0, 4).map((recipe: Recipe) => (
        <ChatRecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  </div>
);

// Component for rendering single recipe result
const SingleRecipeResult = ({ recipe }: { recipe: Recipe }) => (
  <div className="mb-3 space-y-2">
    <ChatRecipeCard recipe={recipe} />
  </div>
);

// Component for rendering single ingredient result
const SingleIngredientResult = ({ ingredient }: { ingredient: Ingredient }) => (
  <div className="mb-3 space-y-2">
    <ChatIngredientCard ingredient={ingredient} />
  </div>
);

// Component for rendering can make recipe result
const CanMakeResult = ({ canMake }: { canMake: boolean }) => (
  <div className="mb-3 space-y-2">
    <div
      className={`flex items-center gap-2 rounded-lg p-3 ${
        canMake
          ? 'border border-green-200 bg-green-50'
          : 'border border-orange-200 bg-orange-50'
      }`}
    >
      {canMake ? (
        <CheckCircle className="h-4 w-4 text-green-600" />
      ) : (
        <AlertCircle className="h-4 w-4 text-orange-600" />
      )}
      <span
        className={`font-medium text-sm ${
          canMake ? 'text-green-800' : 'text-orange-800'
        }`}
      >
        {canMake ? 'You can make this recipe!' : 'Missing ingredients'}
      </span>
    </div>
  </div>
);

// Type for tool result
interface ToolResult {
  error?: string;
  inventory?: Ingredient[];
  recipes?: Recipe[];
  recipe?: Recipe;
  ingredient?: Ingredient;
  canMake?: boolean;
}

// Component for rendering tool result state
const ToolResultState = ({ result }: { result: ToolResult }) => {
  if (result.error) {
    return <ToolErrorState error={result.error} />;
  }

  if (result.inventory) {
    return <InventoryResult inventory={result.inventory} />;
  }

  if (result.recipes) {
    return <RecipeResult recipes={result.recipes} />;
  }

  if (result.recipe) {
    return <SingleRecipeResult recipe={result.recipe} />;
  }

  if (result.ingredient) {
    return <SingleIngredientResult ingredient={result.ingredient} />;
  }

  if (result.canMake !== undefined) {
    return <CanMakeResult canMake={result.canMake} />;
  }

  return null;
};

export default function AssistantPage() {
  const [input, setInput] = useState('');
  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  // Auto-scroll when new messages come in
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

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

  const renderToolInvocation = (toolInvocation: ToolInvocation) => {
    if (toolInvocation.state === 'call') {
      return <ToolLoadingState toolName={toolInvocation.toolName} />;
    }

    if (toolInvocation.state === 'result') {
      return <ToolResultState result={toolInvocation.result} />;
    }

    return null;
  };

  const renderMessage = (message: Message) => {
    if (message.role === 'user') {
      return (
        <div className="slide-in-from-bottom-2 flex animate-in justify-end duration-300">
          <div className="max-w-[80%] rounded-2xl bg-[#fd853a] px-4 py-3 text-white">
            <p className="whitespace-pre-wrap text-sm">{message.content}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="slide-in-from-bottom-2 flex animate-in justify-start duration-300">
        <div className="max-w-[85%] rounded-2xl bg-gray-50 px-4 py-3 text-gray-900">
          {/* Render tool invocations */}
          {message.toolInvocations?.map((toolInvocation) => (
            <div key={toolInvocation.toolCallId}>
              {renderToolInvocation(toolInvocation)}
            </div>
          ))}

          {/* Render message content with markdown support */}
          {message.content && (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="mb-2 text-sm last:mb-0">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-2 ml-4 list-disc text-sm">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-2 ml-4 list-decimal text-sm">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  code: ({ children }) => (
                    <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="mb-2 overflow-x-auto rounded-md bg-gray-100 p-2 text-xs">
                      {children}
                    </pre>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-2 font-semibold text-sm">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="mb-2 font-semibold text-sm">{children}</h4>
                  ),
                }}
                remarkPlugins={[remarkGfm]}
              >
                {message.content}
              </ReactMarkdown>
            </div>
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
      <div className="relative flex flex-1 flex-col">
        {/* Messages Area */}
        <div
          className="flex-1 space-y-4 overflow-y-auto p-4 pb-32"
          ref={messagesContainerRef}
        >
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
            <div className="slide-in-from-bottom-2 flex animate-in justify-start duration-300">
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

        {/* Floating Bottom Section with Suggestions and Input */}
        <div className="fixed right-0 bottom-0 left-0 border-gray-100 border-t bg-white p-4 pb-24">
          <div className="mx-auto max-w-md space-y-3">
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
                className="w-full rounded-[24px] border-[#e9eaeb] bg-white px-4 py-3 pr-12 text-sm shadow-lg transition-all placeholder:text-[#717680] focus:border-[#fd853a] focus:ring-2 focus:ring-[#fd853a]/20"
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
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="assistant" />
    </div>
  );
}
