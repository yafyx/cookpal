'use client';

import BottomNavigation from '@/components/ui/bottom-navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileHeader } from '@/components/ui/mobile-header';
import { useChat } from 'ai/react';
import { ArrowUp, History } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';

export default function AssistantPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
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
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
              <p className="text-sm">
                I can help you with recipes, check your inventory, and suggest
                meals based on what you have.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                key={message.id}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-[#fd853a] text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Section with Suggestions and Input */}
        <div className="mt-4 flex flex-col gap-2">
          {/* Suggestion Pills - only show when no messages */}
          {messages.length === 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {suggestionPills.map((suggestion) => (
                <Button
                  className="h-auto flex-shrink-0 whitespace-nowrap rounded-full border-[#e9eaeb] bg-[#fdfdfd] px-4 py-2 font-normal text-[#717680] text-sm hover:bg-gray-50"
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
          <form className="relative" onSubmit={handleSubmit}>
            <Input
              className="w-full rounded-[20px] border-[#e9eaeb] bg-white px-3 py-3 pr-12 text-sm placeholder:text-[#717680] focus:border-[#fd853a] focus:ring-1 focus:ring-[#fd853a]"
              disabled={isLoading}
              onChange={handleInputChange}
              placeholder="Ask anything..."
              value={input}
            />
            <Button
              className="-translate-y-1/2 absolute top-1/2 right-3 h-[30px] w-[30px] rounded-full bg-[#fd853a] hover:bg-[#fd853a]/90 disabled:opacity-50"
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
