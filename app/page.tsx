'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { Loader2, MailIcon } from 'lucide-react';
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
    <svg
      aria-label="CookPal logo"
      className="block size-full max-w-none"
      fill="none"
      viewBox="0 0 169 124"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>CookPal Logo</title>
      <path
        d="M95.8304 41.9194C99.3651 41.1144 102.474 39.0234 104.552 36.0531C108.464 30.5551 113.642 26.0797 119.648 23.0053C125.552 19.8914 131.033 15.9602 137.402 13.748C138.773 13.2783 140.22 12.2685 141.159 14.3726C141.995 16.2513 141.159 17.5712 139.628 18.4636C135.438 20.9247 131.174 23.2778 126.947 25.6826C124.533 27.054 122.128 28.4443 119.718 29.8251C111.165 34.7239 107.037 42.2904 105.567 51.9001C104.698 57.649 99.32 68.9119 93.2517 70.6591C93.2517 70.6591 94.3086 67.6438 94.2851 66.4977C94.2616 65.3517 93.9704 63.7971 92.9043 63.1114C91.8381 62.4256 89.6165 64.2104 88.6771 65.2296C87.7378 66.2488 84.7789 69.9264 82.5291 68.9119C80.7819 68.1228 80.2275 64.6848 79.1801 62.3693C78.5507 60.9931 78.0576 59.4432 76.2446 59.3164C74.4316 59.1895 73.76 60.7254 73.0555 62.0452C71.6135 64.8116 70.0542 67.5217 68.7485 70.3539C67.9688 72.0306 67.0625 72.1574 65.5736 71.4012C63.2017 70.1988 54.2027 64.9666 51.7462 66.6481C49.2898 68.3295 58.7445 79.4609 59.5336 79.7756C56.2458 82.2133 51.0792 81.9972 48.9515 81.4383C42.066 79.6394 35.5234 74.689 31.2775 69.0387C30.0674 67.3481 29.0216 65.5457 28.1542 63.6562C26.7452 60.8005 27.6844 59.3774 30.6152 58.64C41.0468 56.0239 51.4549 53.3279 61.8677 50.6554C73.1823 47.7481 84.4829 44.8032 95.8021 41.9335"
        fill={currentScreen === 'splash' ? '#F5C41E' : 'white'}
      />
      <path
        d="M89.9964 12.9876C89.5552 11.1229 88.6218 9.41077 87.2934 8.02974C85.9651 6.6487 84.2905 5.64938 82.4443 5.13603C80.5982 4.62268 78.648 4.61407 76.7974 5.11115C74.9468 5.60822 73.2636 6.59274 71.9231 7.96202C70.7899 5.31309 68.7567 3.15016 66.1828 1.85555C63.6089 0.560943 60.6602 0.218071 57.8579 0.887579C55.0556 1.55709 52.5803 3.19582 50.8696 5.51409C49.1589 7.83236 48.3229 10.6808 48.5095 13.5559C46.94 13.0006 45.2628 12.8188 43.6109 13.025C41.9589 13.2312 40.3777 13.8198 38.9929 14.7439C37.6082 15.668 36.458 16.9022 35.6336 18.3486C34.8093 19.795 34.3335 21.4136 34.2441 23.076C34.1546 24.7383 34.4539 26.3987 35.1183 27.9252C35.7827 29.4516 36.7939 30.8021 38.0715 31.8695C39.3491 32.9368 40.8581 33.6916 42.4784 34.0738C44.0987 34.4561 45.7857 34.4554 47.4057 34.0716L49.4676 42.7888C49.5262 43.034 49.6406 43.2623 49.8018 43.456C49.963 43.6498 50.1665 43.8038 50.3969 43.906C50.6273 44.0082 50.8783 44.056 51.1301 44.0455C51.3819 44.035 51.6278 43.9666 51.8488 43.8456C61.2178 38.7396 71.7848 36.2402 82.4485 36.6078C82.7006 36.6165 82.9515 36.5671 83.1814 36.4633C83.4114 36.3596 83.6144 36.2043 83.7747 36.0095C83.935 35.8147 84.0483 35.5855 84.1059 35.3399C84.1634 35.0942 84.1637 34.8387 84.1066 34.5929L82.0446 25.8756C84.8081 25.2209 87.1984 23.4953 88.6896 21.0784C90.1808 18.6614 90.6508 15.7511 89.9964 12.9876Z"
        fill={currentScreen === 'splash' ? '#F5C41E' : 'white'}
      />
      <path
        d="M169 122.507C168.637 122.573 168.091 122.655 167.365 122.754C166.671 122.886 165.961 122.953 165.234 122.953C164.507 122.953 163.846 122.903 163.252 122.804C162.69 122.705 162.211 122.507 161.815 122.209C161.418 121.912 161.104 121.515 160.873 121.02C160.675 120.491 160.576 119.814 160.576 118.988V90.2469C160.939 90.1808 161.468 90.0982 162.161 89.9991C162.888 89.8669 163.615 89.8009 164.342 89.8009C165.069 89.8009 165.713 89.8504 166.274 89.9495C166.869 90.0486 167.365 90.2469 167.761 90.5442C168.158 90.8415 168.455 91.2545 168.653 91.783C168.884 92.2786 169 92.9393 169 93.7652V122.507Z"
        fill={currentScreen === 'splash' ? '#F5C41E' : 'white'}
      />
      <path
        d="M145.24 117.192C145.802 117.192 146.413 117.143 147.074 117.044C147.767 116.911 148.279 116.746 148.61 116.548V112.584L145.042 112.881C144.117 112.947 143.357 113.145 142.762 113.476C142.168 113.806 141.87 114.302 141.87 114.962C141.87 115.623 142.118 116.168 142.614 116.598C143.142 116.994 144.018 117.192 145.24 117.192ZM144.844 97.7174C146.628 97.7174 148.246 97.8991 149.7 98.2625C151.186 98.6259 152.442 99.1875 153.466 99.9474C154.523 100.674 155.333 101.616 155.894 102.772C156.456 103.895 156.737 105.233 156.737 106.786V117.886C156.737 118.745 156.489 119.455 155.993 120.017C155.531 120.545 154.969 121.008 154.308 121.404C152.161 122.693 149.138 123.337 145.24 123.337C143.489 123.337 141.903 123.172 140.483 122.841C139.095 122.511 137.889 122.015 136.865 121.355C135.874 120.694 135.098 119.852 134.536 118.827C134.008 117.803 133.743 116.614 133.743 115.26C133.743 112.98 134.421 111.229 135.775 110.007C137.13 108.785 139.227 108.025 142.069 107.727L148.56 107.034V106.687C148.56 105.729 148.131 105.051 147.272 104.655C146.446 104.226 145.24 104.011 143.654 104.011C142.399 104.011 141.177 104.143 139.987 104.407C138.798 104.672 137.724 105.002 136.766 105.398C136.337 105.101 135.973 104.655 135.676 104.06C135.379 103.433 135.23 102.788 135.23 102.128C135.23 101.269 135.428 100.592 135.825 100.096C136.254 99.5675 136.898 99.1215 137.757 98.7581C138.715 98.3947 139.839 98.1304 141.127 97.9652C142.448 97.8 143.687 97.7174 144.844 97.7174Z"
        fill={currentScreen === 'splash' ? '#F5C41E' : 'white'}
      />
      <path
        d="M120.032 106.451C121.419 106.451 122.477 106.137 123.203 105.51C123.963 104.849 124.343 103.858 124.343 102.537C124.343 101.281 123.947 100.323 123.154 99.6624C122.394 98.9687 121.271 98.6218 119.784 98.6218C119.256 98.6218 118.81 98.6383 118.446 98.6713C118.116 98.6713 117.769 98.7044 117.406 98.7704V106.451H120.032ZM117.455 122.358C117.092 122.457 116.514 122.556 115.721 122.655C114.961 122.755 114.201 122.804 113.441 122.804C112.681 122.804 112.004 122.738 111.409 122.606C110.848 122.507 110.369 122.309 109.972 122.011C109.576 121.714 109.279 121.301 109.08 120.772C108.882 120.244 108.783 119.55 108.783 118.691V95.3512C108.783 94.6574 108.965 94.1289 109.328 93.7655C109.725 93.369 110.253 93.0552 110.914 92.8239C112.037 92.4275 113.309 92.1467 114.73 91.9815C116.183 91.7833 117.637 91.6842 119.09 91.6842C123.649 91.6842 127.135 92.6588 129.546 94.6079C131.958 96.557 133.164 99.1999 133.164 102.537C133.164 104.155 132.899 105.625 132.371 106.947C131.875 108.235 131.115 109.358 130.091 110.317C129.1 111.242 127.828 111.968 126.276 112.497C124.756 112.992 122.989 113.24 120.973 113.24H117.455V122.358Z"
        fill={currentScreen === 'splash' ? '#F5C41E' : 'white'}
      />
      <path
        d="M105.674 118.195C105.508 119.748 105.046 120.937 104.286 121.763C103.559 122.589 102.486 123.002 101.065 123.002C100.008 123.002 99.0664 122.754 98.2405 122.259C97.4146 121.73 96.5226 120.855 95.5645 119.632L90.6587 113.488V122.507C90.2953 122.573 89.7502 122.655 89.0234 122.754C88.3297 122.886 87.6194 122.953 86.8926 122.953C86.1658 122.953 85.5051 122.903 84.9104 122.804C84.3488 122.705 83.8698 122.507 83.4734 122.209C83.0769 121.912 82.7631 121.515 82.5318 121.02C82.3336 120.491 82.2345 119.814 82.2345 118.988V90.2964C82.5979 90.1973 83.1265 90.0982 83.8202 89.9991C84.547 89.8669 85.2738 89.8009 86.0006 89.8009C86.7274 89.8009 87.3716 89.8504 87.9332 89.9495C88.5279 90.0486 89.0234 90.2469 89.4198 90.5442C89.8163 90.8415 90.1136 91.2545 90.3118 91.783C90.5431 92.2786 90.6587 92.9393 90.6587 93.7652V106.847L99.182 98.126C100.9 98.126 102.271 98.5059 103.295 99.2657C104.352 100.026 104.881 100.984 104.881 102.14C104.881 102.635 104.798 103.098 104.633 103.527C104.468 103.924 104.203 104.337 103.84 104.766C103.51 105.196 103.064 105.658 102.502 106.154C101.974 106.616 101.346 107.161 100.619 107.789L97.7449 110.267L105.674 118.195Z"
        fill={currentScreen === 'splash' ? '#F5C41E' : 'white'}
      />
      <path
        d="M79.5128 110.514C79.5128 112.562 79.199 114.396 78.5713 116.014C77.9436 117.6 77.0516 118.938 75.8954 120.028C74.7722 121.118 73.4177 121.944 71.832 122.506C70.2462 123.068 68.4788 123.348 66.5297 123.348C64.5805 123.348 62.8131 123.051 61.2274 122.456C59.6417 121.862 58.2707 121.019 57.1144 119.929C55.9912 118.806 55.1157 117.451 54.488 115.866C53.8603 114.28 53.5465 112.496 53.5465 110.514C53.5465 108.565 53.8603 106.797 54.488 105.212C55.1157 103.626 55.9912 102.288 57.1144 101.198C58.2707 100.075 59.6417 99.2156 61.2274 98.6209C62.8131 98.0263 64.5805 97.729 66.5297 97.729C68.4788 97.729 70.2462 98.0428 71.832 98.6705C73.4177 99.2652 74.7722 100.124 75.8954 101.247C77.0516 102.338 77.9436 103.675 78.5713 105.261C79.199 106.847 79.5128 108.598 79.5128 110.514ZM62.1689 110.514C62.1689 112.529 62.5488 114.082 63.3087 115.172C64.1015 116.229 65.1917 116.758 66.5792 116.758C67.9667 116.758 69.0239 116.213 69.7507 115.122C70.5105 114.032 70.8904 112.496 70.8904 110.514C70.8904 108.532 70.5105 107.012 69.7507 105.955C68.9909 104.865 67.9172 104.32 66.5297 104.32C65.1422 104.32 64.0685 104.865 63.3087 105.955C62.5488 107.012 62.1689 108.532 62.1689 110.514Z"
        fill={currentScreen === 'splash' ? '#F5C41E' : 'white'}
      />
      <path
        d="M51.9631 110.514C51.9631 112.562 51.6492 114.396 51.0215 116.014C50.3938 117.6 49.5019 118.938 48.3456 120.028C47.2224 121.118 45.8679 121.944 44.2822 122.506C42.6965 123.068 40.929 123.348 38.9799 123.348C37.0308 123.348 35.2633 123.051 33.6776 122.456C32.0919 121.862 30.7209 121.019 29.5646 119.929C28.4414 118.806 27.5659 117.451 26.9383 115.866C26.3106 114.28 25.9967 112.496 25.9967 110.514C25.9967 108.565 26.3106 106.797 26.9383 105.212C27.5659 103.626 28.4414 102.288 29.5646 101.198C30.7209 100.075 32.0919 99.2156 33.6776 98.6209C35.2633 98.0263 37.0308 97.729 38.9799 97.729C40.929 97.729 42.6965 98.0428 44.2822 98.6705C45.8679 99.2652 47.2224 100.124 48.3456 101.247C49.5019 102.338 50.3938 103.675 51.0215 105.261C51.6492 106.847 51.9631 108.598 51.9631 110.514ZM34.6191 110.514C34.6191 112.529 34.9991 114.082 35.7589 115.172C36.5517 116.229 37.6419 116.758 39.0295 116.758C40.417 116.758 41.4741 116.213 42.2009 115.122C42.9607 114.032 43.3407 112.496 43.3407 110.514C43.3407 108.532 42.9607 107.012 42.2009 105.955C41.4411 104.865 40.3674 104.32 38.9799 104.32C37.5924 104.32 36.5187 104.865 35.7589 105.955C34.9991 107.012 34.6191 108.532 34.6191 110.514Z"
        fill={currentScreen === 'splash' ? '#F5C41E' : 'white'}
      />
      <path
        d="M16.7988 98.5706C14.2551 98.5706 12.3059 99.3469 10.9514 100.9C9.59697 102.452 8.91973 104.649 8.91973 107.49C8.91973 110.364 9.66304 112.578 11.1497 114.131C12.6693 115.683 14.701 116.46 17.2448 116.46C18.5993 116.46 19.739 116.278 20.664 115.914C21.6221 115.551 22.5306 115.138 23.3895 114.676C23.9511 115.138 24.3806 115.7 24.6779 116.36C25.0083 116.988 25.1735 117.731 25.1735 118.59C25.1735 119.945 24.4136 121.101 22.894 122.059C21.4074 122.984 19.1279 123.447 16.0555 123.447C13.8421 123.447 11.7608 123.133 9.8117 122.505C7.86258 121.877 6.16122 120.919 4.70764 119.631C3.25405 118.31 2.09779 116.658 1.23885 114.676C0.41295 112.66 0 110.265 0 107.49C0 104.913 0.396433 102.651 1.1893 100.701C2.0152 98.7192 3.12191 97.0509 4.50942 95.6964C5.92997 94.3419 7.58177 93.3178 9.46483 92.6241C11.3479 91.9303 13.3631 91.5834 15.5104 91.5834C18.5497 91.5834 20.8953 92.079 22.5471 93.0701C24.2319 94.0611 25.0744 95.333 25.0744 96.8857C25.0744 97.7447 24.8596 98.488 24.4302 99.1157C24.0007 99.7433 23.5051 100.239 22.9435 100.602C22.0846 100.041 21.1596 99.5616 20.1685 99.1652C19.2105 98.7688 18.0872 98.5706 16.7988 98.5706Z"
        fill={currentScreen === 'splash' ? '#F5C41E' : 'white'}
      />
    </svg>
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
