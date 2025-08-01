'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { Loader2, MailIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Screen = 'splash' | 'auth';

// Logo component to reuse
const CookPalLogo = ({
  className = 'h-[60px] w-[82px]',
  currentScreen,
}: {
  className?: string;
  currentScreen: Screen;
}) => (
  <div className={`relative ${className} shrink-0`}>
    <Image
      alt="CookPal logo"
      className="block size-full max-w-none"
      fill
      src="/cookpal.svg"
      style={{
        filter: currentScreen === 'splash' ? 'none' : 'brightness(0) invert(1)',
      }}
    />
  </div>
);

export default function OnboardingScreen() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [_logoVisible, setLogoVisible] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMailLoading, setIsMailLoading] = useState(false);
  const router = useRouter();

  // Auto transition from splash to auth screen
  useEffect(() => {
    // Fade in logo after component mounts
    const fadeInTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 300);

    // Start transition after showing splash
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScreen('auth');
        // Reset transition state after screen change
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 800); // Transition duration
    }, 2000); // Show splash for 2 seconds

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(timer);
    };
  }, []);

  const handleGoogleAuthClick = () => {
    setIsGoogleLoading(true);
    // Simulate authentication process
    setTimeout(() => {
      setIsGoogleLoading(false);
      // Add transition before redirect
      setIsTransitioning(true);
      setTimeout(() => {
        router.push('/welcome');
      }, 300);
    }, 1500); // 1.5 second delay
  };

  const handleMailAuthClick = () => {
    setIsMailLoading(true);
    // Simulate authentication process
    setTimeout(() => {
      setIsMailLoading(false);
      // Add transition before redirect
      setIsTransitioning(true);
      setTimeout(() => {
        router.push('/welcome');
      }, 300);
    }, 1500); // 1.5 second delay
  };

  // Splash Screen
  if (currentScreen === 'splash') {
    return (
      <div
        className={`relative flex size-full min-h-screen items-center justify-center bg-white transition-opacity duration-800 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className={`transition-opacity duration-600 ease-in-out ${
            _logoVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CookPalLogo
            className="h-[120px] w-[164px]"
            currentScreen={currentScreen}
          />
        </div>
      </div>
    );
  }

  // Main Auth Screen
  return (
    <div
      className={`relative box-border flex size-full min-h-screen flex-col-reverse content-stretch items-center justify-end transition-all duration-1000 ease-in-out ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      } bg-[position:0%_0%,_50%_50%] p-0 [background-size:auto,_cover]`}
      style={{
        backgroundImage: `linear-gradient(rgba(245, 202, 30, 0) 51.182%, rgb(245, 202, 30) 127.96%), url('/assets/obg.png')`,
      }}
    >
      <div className="relative order-1 min-h-px w-full min-w-px shrink-0 grow basis-0">
        <div className="relative flex size-full flex-col items-center justify-center">
          <div className="relative box-border flex size-full flex-col content-stretch items-center justify-center gap-8 px-4 py-6">
            <BlurFade delay={isTransitioning ? 0 : 0.1} duration={0.6}>
              <div className="relative box-border flex w-[335px] shrink-0 flex-col content-stretch items-center justify-center gap-4 p-0">
                <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-center p-0">
                  <CookPalLogo currentScreen={currentScreen} />
                </div>
              </div>
            </BlurFade>

            <div className="min-h-px w-full min-w-px shrink-0 grow basis-0" />

            <BlurFade delay={isTransitioning ? 0.1 : 0.3} duration={0.6}>
              <div className="relative box-border flex shrink-0 flex-col content-stretch items-start justify-start gap-3 p-0">
                <div className="relative box-border flex w-[335px] shrink-0 flex-col content-stretch items-start justify-start gap-4 p-0">
                  {/* Continue with Google Button */}
                  <button
                    className="relative w-full shrink-0 rounded-lg bg-[#181d27] transition-all duration-200 hover:bg-[#282d37] disabled:cursor-not-allowed"
                    disabled={isGoogleLoading}
                    onClick={handleGoogleAuthClick}
                    type="button"
                  >
                    <div className="relative flex size-full flex-row items-center justify-center">
                      <div className="relative box-border flex w-full flex-row content-stretch items-center justify-center gap-2 px-5 py-2">
                        {isGoogleLoading ? (
                          <Loader2 className="h-[18px] w-[18px] animate-spin text-[#fdfdfd]" />
                        ) : (
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
                        )}
                        <div className="relative flex shrink-0 flex-col justify-center text-center font-['Inter'] font-semibold text-[#fdfdfd] text-[18px] not-italic leading-[0]">
                          <p className="block whitespace-pre leading-[28px]">
                            Continue with Google
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Continue with Mail Button */}
                  <button
                    className="relative w-full shrink-0 rounded-lg border border-[#e9eaeb] bg-[#fdfdfd] transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed"
                    disabled={isMailLoading}
                    onClick={handleMailAuthClick}
                    type="button"
                  >
                    <div className="relative flex size-full flex-row items-center justify-center">
                      <div className="relative box-border flex w-full flex-row content-stretch items-center justify-center gap-2 px-5 py-2">
                        {isMailLoading ? (
                          <Loader2 className="h-[18px] w-[18px] animate-spin text-[#181d27]" />
                        ) : (
                          <div className="relative flex size-[18px] shrink-0 items-center justify-center overflow-clip">
                            <MailIcon className="h-[18px] w-[18px] text-[#181d27]" />
                          </div>
                        )}
                        <div className="relative flex shrink-0 flex-col justify-center text-center font-['Inter'] font-semibold text-[#181d27] text-[18px] not-italic leading-[0]">
                          <p className="block whitespace-pre leading-[28px]">
                            Continue with Mail
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Privacy Policy and Terms */}
                <BlurFade delay={isTransitioning ? 0.2 : 0.5} duration={0.6}>
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
                </BlurFade>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </div>
  );
}
