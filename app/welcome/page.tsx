'use client';

import { OnboardingIntro } from '@/components/onboarding';
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel';
import { BlurFade } from '@/components/ui/blur-fade';
import { useState } from 'react';

type WelcomeScreen = 'intro' | 'steps';

export default function WelcomePage() {
  const [currentScreen, setCurrentScreen] = useState<WelcomeScreen>('intro');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSkip = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen('steps');
      setIsTransitioning(false);
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
        <OnboardingCarousel />
      </BlurFade>
    </div>
  );
}
