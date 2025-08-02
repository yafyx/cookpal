'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import StepIndicator from './StepIndicator';

export default function OnboardingCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [selectedCravings, setSelectedCravings] = useState<string[]>(['Pedas']);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleNext = () => {
    if (current < 6) {
      api?.scrollNext();
    } else {
      router.push('/dashboard');
    }
  };

  const toggleCraving = (craving: string) => {
    setSelectedCravings((prev: string[]) =>
      prev.includes(craving)
        ? prev.filter((c: string) => c !== craving)
        : [...prev, craving]
    );
  };

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies((prev: string[]) =>
      prev.includes(allergy)
        ? prev.filter((a: string) => a !== allergy)
        : [...prev, allergy]
    );
  };

  const allergyOptions = [
    'Diary',
    'Eggs',
    'Tree nuts',
    'Peanuts',
    'Fish',
    'Gluten',
    'Mustard',
    '...',
  ];

  return (
    <div className="relative box-border size-full min-h-screen bg-[#ffffff]">
      <Carousel
        className="h-screen"
        opts={{
          align: 'start',
        }}
        setApi={setApi}
      >
        <CarouselContent className="h-full">
          <CarouselItem className="flex h-full items-center justify-center">
            <div className="relative box-border flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-6">
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

              <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-start gap-2 p-0 text-center not-italic leading-[0]">
                <div className="relative w-[297px] shrink-0 font-['Inter'] font-semibold text-[#181d27] text-[30px] tracking-[-0.66px]">
                  <p className="block leading-[38px]">Welcome to CookPal</p>
                </div>
                <div className="relative w-[275px] shrink-0 font-['Inter'] font-normal text-[#535862] text-[14px]">
                  <p className="block leading-[20px]">
                    Healthy cooking made easy! CookPal helps you plan meals
                    using the ingredients you have – tailored to your nutrition,
                    mood, and lifestyle goals.
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="flex h-full items-center justify-center">
            <div className="relative box-border flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-6">
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

              <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-start gap-2 p-0 text-center not-italic leading-[0]">
                <div className="relative w-[297px] shrink-0 font-['Inter'] font-semibold text-[#181d27] text-[24px] tracking-[-0.528px]">
                  <p className="block leading-[32px]">
                    Cook with What You Have
                  </p>
                </div>
                <div className="relative w-[275px] shrink-0 font-['Inter'] font-normal text-[#535862] text-[14px]">
                  <p className="block leading-[20px]">
                    Enter the ingredients you have. CookPal will recommend
                    healthy recipes you can make without needing to shop for
                    more.
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="flex h-full items-center justify-center">
            <div className="relative box-border flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-6">
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

              <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-start gap-2 p-0 text-center not-italic leading-[0]">
                <div className="relative w-[239px] shrink-0 font-['Inter'] font-semibold text-[#181d27] text-[24px] tracking-[-0.528px]">
                  <p className="block leading-[32px]">Match Your Lifestyle</p>
                </div>
                <div className="relative w-[275px] shrink-0 font-['Inter'] font-normal text-[#535862] text-[14px]">
                  <p className="block leading-[20px]">
                    Choose your goal: diet, muscle gain, budget-friendly, or
                    mindful eating. CookPal will tailor the menu and nutrition
                    to fit your goals.
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="flex h-full items-center justify-center">
            <div className="relative box-border flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-6">
              <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-start gap-2 p-0 text-center not-italic leading-[0]">
                <div className="relative w-[297px] shrink-0 font-['Inter'] font-semibold text-[#181d27] text-[24px] tracking-[-0.528px]">
                  <p className="block leading-[32px]">
                    Do you have any allergies?
                  </p>
                </div>
                <div className="relative w-[275px] shrink-0 font-['Inter'] font-normal text-[#535862] text-[14px]">
                  <p className="block leading-[20px]">
                    Let us know if you have any food allergies. So we can
                    customize your meal plans
                  </p>
                </div>
              </div>

              <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-2 overflow-clip p-0">
                <div className="grid w-full max-w-[280px] grid-cols-3 gap-2">
                  {allergyOptions.map((allergy) => (
                    <div
                      className="relative min-w-[85px] shrink-0 rounded-xl"
                      key={allergy}
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 rounded-xl border border-solid ${
                          selectedAllergies.includes(allergy)
                            ? 'border-[#ff6b35] bg-[#ff6b35]'
                            : 'border-[#e9eaeb] bg-[#ffffff]'
                        }`}
                      />
                      <button
                        className="relative box-border flex w-full min-w-inherit flex-row content-stretch items-center justify-center gap-2 overflow-clip px-3 py-2"
                        onClick={() => toggleAllergy(allergy)}
                        type="button"
                      >
                        <div className="min-h-px min-w-px shrink-0 grow basis-0 text-center font-['Inter'] font-medium text-[14px] not-italic leading-[0]">
                          <p
                            className={`block leading-[20px] ${
                              selectedAllergies.includes(allergy)
                                ? 'text-[#ffffff]'
                                : 'text-[#414651]'
                            }`}
                          >
                            {allergy}
                          </p>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="flex h-full items-center justify-center">
            <div className="relative box-border flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-6">
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

              <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-2 overflow-clip p-0">
                {[
                  { id: 'Crunchy', label: 'Crunchy' },
                  { id: 'Creamy', label: 'Creamy' },
                  { id: 'Pedas', label: 'Pedas' },
                ].map((option) => (
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
            </div>
          </CarouselItem>
          <CarouselItem className="flex h-full items-center justify-center">
            <div className="relative box-border flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-6">
              <div className="relative h-[155px] w-[143px] shrink-0 overflow-clip">
                <div className="relative flex h-full items-center justify-center">
                  <svg
                    className="h-full w-full text-[#ff6b35]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Health integration icon</title>
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 9H14V4H5V21H19V9Z" />
                    <path d="M16 14H8V12H16V14ZM16 18H8V16H16V18ZM12 10H8V8H12V10Z" />
                  </svg>
                </div>
              </div>

              <div className="relative box-border flex shrink-0 flex-col content-stretch items-center justify-start gap-2 p-0 text-center not-italic leading-[0]">
                <div className="relative w-[297px] shrink-0 font-['Inter'] font-semibold text-[#181d27] text-[24px] tracking-[-0.528px]">
                  <p className="block leading-[32px]">Health App Integration</p>
                </div>
                <div className="relative w-[275px] shrink-0 font-['Inter'] font-normal text-[#535862] text-[14px]">
                  <p className="block leading-[20px]">
                    Syncs with Google Fit and Apple Health so the app knows if
                    you just worked out — and suggests meals to match your
                    activity level.
                  </p>
                </div>
              </div>

              <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-4 overflow-clip p-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-[#f8f9fa] px-3 py-2">
                    <svg
                      className="h-5 w-5 text-[#4285f4]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Google Fit icon</title>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span className="font-['Inter'] font-medium text-[#181d27] text-[14px]">
                      Google Fit
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[#f8f9fa] px-3 py-2">
                    <svg
                      className="h-5 w-5 text-[#007aff]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Apple Health icon</title>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span className="font-['Inter'] font-medium text-[#181d27] text-[14px]">
                      Apple Health
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-['Inter'] font-medium text-[#ff6b35] text-[12px]">
                    Smart meal suggestions based on your workout intensity
                  </p>
                </div>
                <div className="text-center">
                  <p className="max-w-[250px] font-['Inter'] font-normal text-[#535862] text-[11px]">
                    Connect to Google Fit and Apple Health to get personalized
                    meal recommendations based on your activity level and
                    fitness goals.
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="absolute right-0 bottom-0 left-0 z-20 bg-[#ffffff]">
        <div className="flex items-center justify-between px-4 py-6">
          <StepIndicator currentStep={current - 1} totalSteps={6} />

          <button
            className="flex items-center justify-center gap-2 rounded-lg bg-[#181d27] px-5 py-2 hover:bg-[#282d37]"
            onClick={handleNext}
            type="button"
          >
            <span className="font-['Inter'] font-semibold text-[#fdfdfd] text-[16px] leading-[24px]">
              {current === 5 ? 'Complete' : 'Next'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
