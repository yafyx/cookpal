'use client';

import { OnboardingIntro, OnboardingSteps } from '@/components/onboarding';
import { BlurFade } from '@/components/ui/blur-fade';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type WelcomeScreen = 'intro' | 'steps';

export default function WelcomePage() {
  const [currentScreen, setCurrentScreen] = useState<WelcomeScreen>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  // Fade in effect when component mounts
  useEffect(() => {
    // Small delay to ensure smooth transition from previous page
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen('steps');
      setCurrentStep(0);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 200);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 300);
    }
  };

  const _handlePrevious = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handleOnboardingSkip = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 300);
  };

  if (currentScreen === 'intro') {
    return (
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <BlurFade delay={0.1} duration={0.5}>
          <OnboardingIntro onSkip={handleSkip} />
        </BlurFade>
      </div>
    );
  }

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <BlurFade delay={0.1} duration={0.5}>
        <OnboardingSteps
          currentStep={currentStep}
          onNext={handleNext}
          onPrevious={_handlePrevious}
          onSkip={handleOnboardingSkip}
        />
      </BlurFade>
    </div>
  );
}
