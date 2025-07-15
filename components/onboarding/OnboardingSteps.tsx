import Image from 'next/image';
import { useRef, useState } from 'react';
import StepIndicator from './StepIndicator';

interface OnboardingStepsProps {
  currentStep: number;
  onNext: () => void;
  onSkip?: () => void;
  onPrevious?: () => void;
}

export default function OnboardingSteps({
  currentStep,
  onNext,
  onSkip,
  onPrevious,
}: OnboardingStepsProps) {
  // State for step 4 cravings selection
  const [selectedCravings, setSelectedCravings] = useState<string[]>(['Pedas']);
  
  // Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Swipe functionality
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentStep < 3) {
      handleTransition(onNext);
    }
    if (isRightSwipe && currentStep > 0 && onPrevious) {
      handleTransition(onPrevious);
    }
  };

  const handleTransition = (callback: () => void) => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 150);
  };

  const handleNextWithTransition = () => {
    handleTransition(onNext);
  };

  const toggleCraving = (craving: string) => {
    setSelectedCravings((prev: string[]) =>
      prev.includes(craving)
        ? prev.filter((c: string) => c !== craving)
        : [...prev, craving]
    );
  };

  // Step content components (removing navigation from each step)
  const renderStep1Content = () => (
    <>
      {/* Chef Illustration */}
      <div className="relative h-[219px] w-[210px] shrink-0 overflow-clip">
        <div className="relative flex h-full items-center justify-center">
          <Image
            src="/assets/ob1.svg"
            alt="Friendly chef character"
            width={188}
            height={219}
            className="block max-w-none"
            priority
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-start gap-2 p-0 text-center not-italic leading-[0]">
        <div className="relative w-[297px] shrink-0 font-['Inter'] font-semibold text-[#181d27] text-[30px] tracking-[-0.66px]">
          <p className="block leading-[38px]">Welcome to CookPal</p>
        </div>
        <div className="relative w-[275px] shrink-0 font-['Inter'] font-normal text-[#535862] text-[14px]">
          <p className="block leading-[20px]">
            Healthy cooking made easy! CookPal helps you plan meals using the
            ingredients you have – tailored to your nutrition, mood, and
            lifestyle goals.
          </p>
        </div>
      </div>
    </>
  );

  const renderStep2Content = () => (
    <>
      {/* Illustration Section */}
      <div className="relative h-[139px] w-[211px] shrink-0 overflow-clip">
        <div className="relative flex h-full items-center justify-center">
          <Image
            src="/assets/ob2.svg"
            alt="Bowl of fresh vegetables and fruits"
            width={211}
            height={139}
            className="block max-w-none"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-start gap-2 p-0 text-center not-italic leading-[0]">
        <div className="relative w-[297px] shrink-0 font-['Inter'] font-semibold text-[#181d27] text-[24px] tracking-[-0.528px]">
          <p className="block leading-[32px]">Cook with What You Have</p>
        </div>
        <div className="relative w-[275px] shrink-0 font-['Inter'] font-normal text-[#535862] text-[14px]">
          <p className="block leading-[20px]">
            Enter the ingredients you have. CookPal will recommend healthy
            recipes you can make without needing to shop for more.
          </p>
        </div>
      </div>
    </>
  );

  const renderStep3Content = () => (
    <>
      {/* Illustration Section */}
      <div className="relative h-[155px] w-[143px] shrink-0 overflow-clip">
        <div className="relative flex h-full items-center justify-center">
          <Image
            src="/assets/ob3.png"
            alt="Person exercising with dumbbells"
            width={143}
            height={155}
            className="block max-w-none"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-start gap-2 p-0 text-center not-italic leading-[0]">
        <div className="relative w-[239px] shrink-0 font-['Inter'] font-semibold text-[#181d27] text-[24px] tracking-[-0.528px]">
          <p className="block leading-[32px]">Match Your Lifestyle</p>
        </div>
        <div className="relative w-[275px] shrink-0 font-['Inter'] font-normal text-[#535862] text-[14px]">
          <p className="block leading-[20px]">
            Choose your goal: diet, muscle gain, budget-friendly, or mindful
            eating. CookPal will tailor the menu and nutrition to fit your
            goals.
          </p>
        </div>
      </div>
    </>
  );

  const renderStep4Content = () => {
    const cravingOptions = [
      { id: 'Crunchy', label: 'Crunchy' },
      { id: 'Creamy', label: 'Creamy' },
      { id: 'Pedas', label: 'Pedas' },
    ];

    return (
      <>
        {/* Text Content */}
        <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-start gap-2 p-0 text-center not-italic leading-[0]">
          <div className="relative w-[197px] shrink-0 font-['Inter'] font-semibold text-[#181d27] text-[24px] tracking-[-0.528px]">
            <p className="block leading-[32px]">
              Lagi Pengen Apa Hari Ini?
            </p>
          </div>
          <div className="relative w-[275px] shrink-0 font-['Inter'] font-normal text-[#535862] text-[14px]">
            <p className="block leading-[20px]">
              Lagi pengen yang crunchy, creamy, atau pedas? CookPal pahami
              mood makanmu dan kasih rekomendasi yang pas!
            </p>
          </div>
        </div>

        {/* Options Section */}
        <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-2 overflow-clip p-0">
          {cravingOptions.map((option) => (
            <div
              className="relative min-w-[185px] shrink-0 rounded-xl bg-[#fdfdfd]"
              key={option.id}
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl border border-[#e9eaeb] border-solid" />
              <button
                className="relative box-border flex w-full min-w-inherit flex-row content-stretch items-center justify-center gap-2 overflow-clip px-4 py-2 transition-all duration-200 hover:bg-gray-50"
                onClick={() => toggleCraving(option.id)}
                type="button"
              >
                <div className="relative box-border flex shrink-0 flex-row content-stretch items-center justify-center p-0">
                  {/* Checkbox */}
                  <div className="relative size-4 shrink-0">
                    {selectedCravings.includes(option.id) ? (
                      <div className="relative size-4 rounded bg-[#f9f5ff]">
                        <div className="pointer-events-none absolute inset-0 rounded border border-[#7f56d9] border-solid shadow-[0px_0px_0px_4px_#f4ebff]" />
                        <div className="absolute inset-[12.5%] overflow-clip">
                          <div className="absolute top-1/4 right-[16.667%] bottom-[29.167%] left-[16.667%]">
                            <svg
                              aria-label="Checkmark"
                              className="absolute top-[-15.151%] right-[-10.416%] bottom-[-15.151%] left-[-10.416%] size-full"
                              fill="none"
                              viewBox="0 0 12 12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>Checkmark</title>
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="#7f56d9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative size-4 rounded bg-[#ffffff]">
                        <div className="pointer-events-none absolute inset-0 rounded border border-[#d5d7da] border-solid" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="min-h-px min-w-px shrink-0 grow basis-0 text-center font-['Inter'] font-semibold text-[#414651] text-[16px] not-italic leading-[0]">
                  <p className="block leading-[24px]">{option.label}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="relative box-border size-full min-h-screen bg-[#ffffff]">
      {/* Touch handler overlay */}
      <div
        className="absolute inset-0 z-10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      
      {/* Main Content Area with Fade Transitions */}
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div
            ref={contentRef}
            className={`relative w-full h-full flex items-center justify-center transition-opacity duration-300 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="relative box-border flex flex-col content-stretch items-center justify-center gap-8 px-4 py-6">
              {currentStep === 0 && renderStep1Content()}
              {currentStep === 1 && renderStep2Content()}
              {currentStep === 2 && renderStep3Content()}
              {currentStep === 3 && renderStep4Content()}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Area - Completely Separate and Static */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#ffffff]">
        <div className="flex items-center justify-between px-4 py-6">
          <StepIndicator currentStep={currentStep} totalSteps={4} />
          
          <button
            className="flex items-center justify-center gap-2 rounded-lg bg-[#181d27] px-5 py-2 hover:bg-[#282d37]"
            onClick={currentStep === 3 ? onSkip : handleNextWithTransition}
            type="button"
          >
            <span className="font-['Inter'] font-semibold text-[#fdfdfd] text-[16px] leading-[24px]">
              {currentStep === 3 ? 'Complete' : 'Next'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
