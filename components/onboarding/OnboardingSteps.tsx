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
    if (!(touchStartX.current && touchEndX.current)) {
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
    if (isTransitioning) {
      return; // Prevent multiple transitions
    }

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
            alt="Friendly chef character"
            className="block max-w-none"
            height={219}
            priority
            src="/assets/ob1.svg"
            width={188}
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
            alt="Bowl of fresh vegetables and fruits"
            className="block max-w-none"
            height={139}
            src="/assets/ob2.svg"
            width={211}
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
            alt="Person exercising with dumbbells"
            className="block max-w-none"
            height={155}
            src="/assets/ob3.png"
            width={143}
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
            <p className="block leading-[32px]">Lagi Pengen Apa Hari Ini?</p>
          </div>
          <div className="relative w-[275px] shrink-0 font-['Inter'] font-normal text-[#535862] text-[14px]">
            <p className="block leading-[20px]">
              Lagi pengen yang crunchy, creamy, atau pedas? CookPal pahami mood
              makanmu dan kasih rekomendasi yang pas!
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
                className="relative box-border flex w-full min-w-inherit flex-row content-stretch items-center justify-center gap-2 overflow-clip px-4 py-2"
                onClick={() => toggleCraving(option.id)}
                type="button"
              >
                <div className="relative box-border flex shrink-0 flex-row content-stretch items-center justify-center p-0">
                  {/* Checkbox */}
                  <div className="relative size-6 shrink-0">
                    {selectedCravings.includes(option.id) ? (
                      <svg
                        fill="none"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Checkmark</title>
                        <g filter="url(#filter0_d_2029_185)">
                          <rect
                            fill="#F9F5FF"
                            height="16"
                            rx="4"
                            width="16"
                            x="4"
                            y="4"
                          />
                          <rect
                            height="15"
                            rx="3.5"
                            stroke="#7F56D9"
                            width="15"
                            x="4.5"
                            y="4.5"
                          />
                          <path
                            d="M16 9L10.5 14.5L8 12"
                            stroke="#7F56D9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.6666"
                          />
                        </g>
                        <defs>
                          <filter
                            colorInterpolationFilters="sRGB"
                            filterUnits="userSpaceOnUse"
                            height="24"
                            id="filter0_d_2029_185"
                            width="24"
                            x="0"
                            y="0"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              result="hardAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            />
                            <feMorphology
                              in="SourceAlpha"
                              operator="dilate"
                              radius="4"
                              result="effect1_dropShadow_2029_185"
                            />
                            <feOffset />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0.956863 0 0 0 0 0.921569 0 0 0 0 1 0 0 0 1 0"
                            />
                            <feBlend
                              in2="BackgroundImageFix"
                              mode="normal"
                              result="effect1_dropShadow_2029_185"
                            />
                            <feBlend
                              in="SourceGraphic"
                              in2="effect1_dropShadow_2029_185"
                              mode="normal"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    ) : (
                      <svg
                        fill="none"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Checkbox</title>
                        <rect
                          fill="#FFFFFF"
                          height="16"
                          rx="4"
                          width="16"
                          x="4"
                          y="4"
                        />
                        <rect
                          height="15"
                          rx="3.5"
                          stroke="#D5D7DA"
                          width="15"
                          x="4.5"
                          y="4.5"
                        />
                      </svg>
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
      {/* Touch handler overlay - only for steps 0-2 where swiping is intended */}
      {currentStep < 3 && (
        <div
          className="absolute inset-0 z-10"
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
        />
      )}

      {/* Main Content Area with Fade Transitions */}
      <div className="relative flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div
            className={`relative flex h-full w-full items-center justify-center transition-opacity duration-300 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            ref={contentRef}
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
      <div className="absolute right-0 bottom-0 left-0 z-20 bg-[#ffffff]">
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
