'use client';

import { OnboardingIntro, OnboardingSteps } from '@/components/onboarding';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Screen = 'auth' | 'intro' | 'steps';

export default function OnboardingScreen() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleAuthClick = () => {
    setCurrentScreen('intro');
  };

  const handleSkip = () => {
    setCurrentScreen('steps');
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding - navigate to dashboard
      router.push('/dashboard');
    }
  };

  const handleOnboardingSkip = () => {
    // Complete onboarding - navigate to dashboard
    router.push('/dashboard');
  };

  if (currentScreen === 'intro') {
    return <OnboardingIntro onSkip={handleSkip} />;
  }

  if (currentScreen === 'steps') {
    return (
      <OnboardingSteps
        currentStep={currentStep}
        onNext={handleNext}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  return (
    <div
      className="relative box-border flex size-full min-h-screen flex-col-reverse content-stretch items-center justify-end bg-[position:0%_0%,_50%_50%] p-0 [background-size:auto,_cover]"
      style={{
        backgroundImage: `linear-gradient(rgba(245, 202, 30, 0) 51.182%, rgb(245, 202, 30) 127.96%), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><rect width="400" height="600" fill="%23f3f4f6"/><text x="200" y="300" text-anchor="middle" fill="%23666" font-family="Arial" font-size="16">Cooking Background</text></svg>')`,
      }}
    >
      <div className="relative order-1 min-h-px w-full min-w-px shrink-0 grow basis-0">
        <div className="relative flex size-full flex-col items-center justify-center">
          <div className="relative box-border flex size-full flex-col content-stretch items-center justify-center gap-3 px-4 py-6">
            <div className="relative box-border flex w-[335px] shrink-0 flex-col content-stretch items-start justify-center gap-2 p-0">
              <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-center gap-[3px] p-0">
                {/* Chef Hat Icon */}
                <div className="relative h-5 w-[28.057px] shrink-0">
                  <svg
                    aria-label="Chef hat icon"
                    className="block size-full max-w-none"
                    fill="none"
                    height="20"
                    role="img"
                    viewBox="0 0 29 20"
                    width="29"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5 2C12.5 2 11 3.5 11 5.5C11 6.5 11.5 7.5 12.5 8L14.5 18L16.5 8C17.5 7.5 18 6.5 18 5.5C18 3.5 16.5 2 14.5 2Z"
                      fill="white"
                    />
                  </svg>
                </div>

                {/* CookPal Text */}
                <div className="relative h-[12.456px] w-[62.565px] shrink-0">
                  <div className="absolute top-0 right-0 bottom-0 left-0">
                    <span className="font-semibold text-lg text-white">
                      CookPal
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-px w-full min-w-px shrink-0 grow basis-0" />

            <div className="relative box-border flex shrink-0 flex-col content-stretch items-start justify-start gap-3 p-0">
              <div className="relative box-border flex w-[335px] shrink-0 flex-col content-stretch items-start justify-start gap-4 p-0">
                {/* Continue with Google Button */}
                <button
                  className="relative w-full shrink-0 rounded-lg bg-[#181d27] transition-all duration-200 hover:bg-[#282d37]"
                  onClick={handleAuthClick}
                  type="button"
                >
                  <div className="relative flex size-full flex-row items-center justify-center">
                    <div className="relative box-border flex w-full flex-row content-stretch items-center justify-center gap-2 px-5 py-2">
                      <div className="relative size-[18px] shrink-0 overflow-clip">
                        <svg
                          aria-label="Google logo"
                          fill="none"
                          height="18"
                          role="img"
                          viewBox="0 0 18 18"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.64 9.2045C17.64 8.5664 17.5827 7.9509 17.4764 7.3636H9V10.8445H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9459 17.64 9.2045Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                            fill="#34A853"
                          />
                          <path
                            d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9S3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9S0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                            fill="#EA4335"
                          />
                        </svg>
                      </div>
                      <div className="relative flex shrink-0 flex-col justify-center text-nowrap text-left font-['Inter'] font-semibold text-[#fdfdfd] text-[18px] not-italic leading-[0]">
                        <p className="block whitespace-pre leading-[28px]">
                          Continue with Google
                        </p>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Continue with Mail Button */}
                <button
                  className="relative w-full shrink-0 rounded-lg bg-[#fdfdfd] transition-all duration-200 hover:bg-gray-50"
                  onClick={handleAuthClick}
                  type="button"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-lg border border-[#e9eaeb] border-solid" />
                  <div className="relative flex size-full flex-row items-center justify-center">
                    <div className="relative box-border flex w-full flex-row content-stretch items-center justify-center gap-2 px-5 py-2">
                      <div className="relative size-[18px] shrink-0 overflow-clip">
                        <svg
                          aria-label="Mail icon"
                          fill="none"
                          height="18"
                          role="img"
                          viewBox="0 0 18 18"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 3H15C15.825 3 16.5 3.675 16.5 4.5V13.5C16.5 14.325 15.825 15 15 15H3C2.175 15 1.5 14.325 1.5 13.5V4.5C1.5 3.675 2.175 3 3 3Z"
                            fill="none"
                            stroke="#181D27"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                          <path
                            d="L1.5 4.5L9 10.5L16.5 4.5"
                            stroke="#181D27"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                      <div className="relative flex shrink-0 flex-col justify-center text-nowrap text-left font-['Inter'] font-semibold text-[#181d27] text-[18px] not-italic leading-[0]">
                        <p className="block whitespace-pre leading-[28px]">
                          Continue with Mail
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Privacy Policy and Terms */}
              <div className="relative box-border flex h-9 w-[335px] shrink-0 flex-row content-stretch items-center justify-center gap-2 p-0">
                <div className="relative flex w-[207px] shrink-0 flex-col justify-center text-center font-['Inter'] font-normal text-[#fdfdfd] text-[0px] not-italic leading-[0]">
                  <p className="text-[12px] leading-[18px]">
                    <span>By continuing you agree to our </span>
                    <span className="font-semibold underline">
                      Privacy Policy
                    </span>
                    <span> and </span>
                    <span className="font-semibold underline">
                      Terms of use
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
