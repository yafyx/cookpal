import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileHeader } from '@/components/ui/mobile-header';
import { ArrowUp, History } from 'lucide-react';

export default function AssistantPage() {
  const suggestionPills = [
    "Check what's missing in your fridge",
    'Set your health goal to personalize your meal plan',
  ];

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
      <div className="flex flex-1 flex-col justify-between p-4 pb-24">
        {/* Main Content Area - Empty for now, will fill with chat messages */}
        <div className="flex-1" />

        {/* Bottom Section with Suggestions and Input */}
        <div className="flex flex-col gap-2">
          {/* Suggestion Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestionPills.map((suggestion) => (
              <Button
                className="h-auto flex-shrink-0 whitespace-nowrap rounded-full border-[#e9eaeb] bg-[#fdfdfd] px-4 py-2 font-normal text-[#717680] text-sm hover:bg-gray-50"
                key={suggestion}
                variant="outline"
              >
                {suggestion}
              </Button>
            ))}
          </div>

          {/* Input Field */}
          <div className="relative">
            <Input
              className="w-full rounded-[20px] border-[#e9eaeb] bg-white px-3 py-3 pr-12 text-sm placeholder:text-[#717680] focus:border-[#fd853a] focus:ring-1 focus:ring-[#fd853a]"
              placeholder="Ask anything..."
            />
            <Button
              className="-translate-y-1/2 absolute top-1/2 right-3 h-[30px] w-[30px] rounded-full bg-[#fd853a] hover:bg-[#fd853a]/90"
              size="icon"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="assistant" />
    </div>
  );
}
