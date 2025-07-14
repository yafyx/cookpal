import { useState } from 'react';
import StepIndicator from './StepIndicator';

interface OnboardingStepsProps {
  currentStep: number;
  onNext: () => void;
  onSkip?: () => void;
}

export default function OnboardingSteps({
  currentStep,
  onNext,
  onSkip,
}: OnboardingStepsProps) {
  // State for step 4 cravings selection
  const [selectedCravings, setSelectedCravings] = useState<string[]>(['Pedas']);

  const toggleCraving = (craving: string) => {
    setSelectedCravings((prev: string[]) =>
      prev.includes(craving)
        ? prev.filter((c: string) => c !== craving)
        : [...prev, craving]
    );
  };
  // Step 1: Welcome to CookPal
  const renderStep1 = () => (
    <div className="relative box-border flex size-full flex-col content-stretch items-center gap-8 px-4 py-6">
      {/* Logo Section */}
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
                fill="#f5c41e"
              />
            </svg>
          </div>

          {/* CookPal Text */}
          <div className="relative h-[12.456px] w-[62.565px] shrink-0">
            <div className="absolute top-0 right-0 bottom-0 left-0">
              <span className="font-semibold text-[#f5c41e] text-lg">
                CookPal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chef Illustration */}
      <div className="relative min-h-px w-[210px] min-w-px shrink-0 grow basis-0 overflow-clip">
        <div className="relative flex h-full items-center justify-center">
          {/* Chef Character SVG */}
          <svg
            aria-label="Friendly chef character"
            className="block max-w-none"
            fill="none"
            height="219"
            role="img"
            viewBox="0 0 188 219"
            width="188"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Chef Hat */}
            <path
              d="M94 30C104 30 112 38 112 48C112 42 118 37 125 37C132 37 138 42 138 48C138 55 133 61 127 62V75H61V62C55 61 50 55 50 48C50 42 56 37 63 37C70 37 76 42 76 48C76 38 84 30 94 30Z"
              fill="#f5f0e8"
            />
            {/* Face */}
            <circle cx="94" cy="110" fill="#d4a574" r="35" />
            {/* Eyes */}
            <circle cx="85" cy="105" fill="#000" r="3" />
            <circle cx="103" cy="105" fill="#000" r="3" />
            {/* Mustache */}
            <path
              d="M80 118C85 115 90 115 94 117C98 115 103 115 108 118C103 122 98 120 94 120C90 120 85 122 80 118Z"
              fill="#8B4513"
            />
            {/* Mouth */}
            <path
              d="M89 125C91 128 97 128 99 125"
              fill="none"
              stroke="#000"
              strokeWidth="2"
            />
            {/* Chef Coat */}
            <rect fill="#1a1a1a" height="74" rx="8" width="68" x="60" y="145" />
            {/* Red Neckerchief */}
            <path d="M94 145L85 155L94 165L103 155Z" fill="#dc2626" />
            {/* Arms */}
            <circle cx="45" cy="170" fill="#d4a574" r="12" />
            <circle cx="143" cy="170" fill="#d4a574" r="12" />
            {/* Left Hand (waving) */}
            <path
              d="M35 165L30 160L32 158L37 163L42 158L44 160L39 165L44 170L42 172L37 167L32 172L30 170L35 165Z"
              fill="#d4a574"
            />
            {/* Right Hand */}
            <circle cx="153" cy="175" fill="#d4a574" r="8" />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-start gap-[120px] p-0">
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

        {/* Bottom Section with Indicators and Next Button */}
        <div className="relative box-border flex w-full shrink-0 flex-row content-stretch items-center justify-between p-0">
          <StepIndicator currentStep={currentStep} totalSteps={4} />

          <button
            className="relative box-border flex shrink-0 flex-row content-stretch items-center justify-center gap-2 rounded-lg bg-[#181d27] px-5 py-2 transition-all duration-200 hover:bg-[#282d37]"
            onClick={onNext}
            type="button"
          >
            <div className="flex flex-col justify-center text-nowrap text-left font-['Inter'] font-semibold text-[#fdfdfd] text-[16px] not-italic leading-[0]">
              <p className="block whitespace-pre leading-[24px]">Next</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  // Step 2: Cook with What You Have
  const renderStep2 = () => (
    <div className="relative box-border flex size-full flex-col content-stretch items-center gap-10 px-10 py-6">
      {/* Illustration Section */}
      <div className="relative min-h-px w-[211px] min-w-px shrink-0 grow basis-0 overflow-clip">
        <div className="relative flex h-full items-center justify-center">
          {/* Vegetables and Fruits Bowl Illustration */}
          <svg
            aria-label="Bowl of fresh vegetables and fruits"
            className="block max-w-none"
            fill="none"
            height="139"
            role="img"
            viewBox="0 0 211 139"
            width="211"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bowl */}
            <ellipse cx="105.5" cy="90" fill="#2d3748" rx="60" ry="35" />
            <ellipse cx="105.5" cy="85" fill="#4a5568" rx="58" ry="33" />

            {/* Lettuce/Leafy Greens */}
            <path
              d="M170 45C175 40 180 45 175 50C180 55 175 60 170 55C165 60 160 55 165 50C160 45 165 40 170 45Z"
              fill="#68d391"
            />
            <path
              d="M175 50C180 45 185 50 180 55C185 60 180 65 175 60C170 65 165 60 170 55C165 50 170 45 175 50Z"
              fill="#48bb78"
            />
            <path
              d="M165 50C170 45 175 50 170 55C175 60 170 65 165 60C160 65 155 60 160 55C155 50 160 45 165 50Z"
              fill="#38a169"
            />

            {/* Carrot */}
            <path
              d="M140 65L135 85C135 87 137 89 139 89L141 89C143 89 145 87 145 85L150 65"
              fill="#ed8936"
            />
            <path
              d="M140 65L142 62L144 60L146 62L148 60L150 65"
              fill="none"
              stroke="#68d391"
              strokeWidth="2"
            />

            {/* Tomato */}
            <circle cx="120" cy="75" fill="#f56565" r="12" />
            <path
              d="M115 68C117 66 119 66 121 68C123 66 125 66 127 68"
              fill="none"
              stroke="#68d391"
              strokeWidth="2"
            />

            {/* Purple Eggplant */}
            <ellipse cx="95" cy="80" fill="#805ad5" rx="8" ry="15" />
            <path
              d="M95 65C97 63 99 65 97 67C99 69 97 71 95 69C93 71 91 69 93 67C91 65 93 63 95 65Z"
              fill="#68d391"
            />

            {/* Green Bell Pepper */}
            <path
              d="M80 70C75 70 75 75 75 80C75 85 80 90 85 90C90 90 95 85 95 80C95 75 95 70 90 70L85 70L80 70Z"
              fill="#48bb78"
            />
            <rect fill="#68d391" height="3" width="6" x="82" y="67" />

            {/* Broccoli */}
            <circle cx="65" cy="75" fill="#38a169" r="6" />
            <circle cx="70" cy="70" fill="#48bb78" r="5" />
            <circle cx="60" cy="70" fill="#48bb78" r="5" />
            <rect fill="#68d391" height="8" width="2" x="64" y="81" />

            {/* Red Apple */}
            <circle cx="130" cy="90" fill="#f56565" r="10" />
            <path
              d="M128 82C130 80 132 82 130 84"
              fill="none"
              stroke="#68d391"
              strokeWidth="2"
            />

            {/* Banana */}
            <path
              d="M50 95C45 95 40 100 40 105C40 110 45 115 50 115C55 115 65 110 70 105C75 100 70 95 65 95L50 95Z"
              fill="#ecc94b"
            />

            {/* Orange/Citrus */}
            <circle cx="160" cy="85" fill="#ed8936" r="9" />

            {/* Grapes */}
            <circle cx="180" cy="75" fill="#805ad5" r="4" />
            <circle cx="178" cy="82" fill="#9f7aea" r="4" />
            <circle cx="182" cy="82" fill="#9f7aea" r="4" />
            <circle cx="180" cy="89" fill="#805ad5" r="4" />

            {/* Watermelon slice */}
            <path
              d="M30 100C20 95 15 105 20 115C25 120 35 115 40 110C45 105 40 95 30 100Z"
              fill="#f56565"
            />
            <path
              d="M30 100C25 102 22 108 25 112C28 115 35 112 38 108C40 104 37 100 30 100Z"
              fill="#68d391"
            />
            <circle cx="32" cy="105" fill="#2d3748" r="1" />
            <circle cx="35" cy="108" fill="#2d3748" r="1" />

            {/* Mushrooms */}
            <ellipse cx="190" cy="95" fill="#a0aec0" rx="6" ry="4" />
            <rect fill="#e2e8f0" height="6" width="6" x="187" y="95" />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-start gap-[120px] p-0">
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

        {/* Bottom Section with Indicators and Next Button */}
        <div className="relative box-border flex w-full shrink-0 flex-row content-stretch items-center justify-between p-0">
          <StepIndicator currentStep={currentStep} totalSteps={4} />

          <button
            className="relative box-border flex shrink-0 flex-row content-stretch items-center justify-center gap-2 rounded-lg bg-[#181d27] px-5 py-2 transition-all duration-200 hover:bg-[#282d37]"
            onClick={onNext}
            type="button"
          >
            <div className="flex flex-col justify-center text-nowrap text-left font-['Inter'] font-semibold text-[#fdfdfd] text-[16px] not-italic leading-[0]">
              <p className="block whitespace-pre leading-[24px]">Next</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  // Step 3: Match Your Lifestyle
  const renderStep3 = () => (
    <div className="relative box-border flex size-full flex-col content-stretch items-center gap-10 px-10 py-6">
      {/* Illustration Section */}
      <div className="relative min-h-px w-[143px] min-w-px shrink-0 grow basis-0 overflow-clip">
        <div className="relative flex h-full items-center justify-center">
          {/* Fitness Person Illustration */}
          <svg
            aria-label="Person exercising with dumbbells"
            className="block max-w-none"
            fill="none"
            height="155"
            role="img"
            viewBox="0 0 143 155"
            width="143"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Body/Torso */}
            <rect fill="#2d3748" height="70" rx="8" width="53" x="45" y="85" />

            {/* Head */}
            <circle cx="71.5" cy="55" fill="#fbb6a3" r="20" />

            {/* Hair */}
            <path
              d="M51 45C51 35 60 30 71.5 30C83 30 92 35 92 45C92 40 88 35 83 37C80 35 75 35 71.5 37C68 35 63 35 60 37C55 35 51 40 51 45Z"
              fill="#8B4513"
            />

            {/* Mustache */}
            <path
              d="M64 65C67 63 70 63 71.5 64C73 63 76 63 79 65C76 68 73 67 71.5 67C70 67 67 68 64 65Z"
              fill="#8B4513"
            />

            {/* Eyes */}
            <circle cx="66" cy="52" fill="#000" r="2" />
            <circle cx="77" cy="52" fill="#000" r="2" />

            {/* Smile */}
            <path
              d="M66 60C68 62 71 62 73 62C75 62 78 62 80 60"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="1.5"
            />

            {/* Left Arm */}
            <rect
              fill="#fbb6a3"
              height="35"
              rx="6"
              transform="rotate(-25 31 87.5)"
              width="12"
              x="25"
              y="70"
            />

            {/* Right Arm */}
            <rect
              fill="#fbb6a3"
              height="35"
              rx="6"
              transform="rotate(25 112 87.5)"
              width="12"
              x="106"
              y="70"
            />

            {/* Left Hand/Dumbbell */}
            <g transform="rotate(-25 31 87.5)">
              <circle cx="31" cy="60" fill="#fbb6a3" r="8" />
              {/* Dumbbell */}
              <rect fill="#4a5568" height="20" width="6" x="28" y="45" />
              <rect fill="#4a5568" height="4" width="12" x="25" y="43" />
              <rect fill="#4a5568" height="4" width="12" x="25" y="61" />
            </g>

            {/* Right Hand */}
            <g transform="rotate(25 112 87.5)">
              <circle cx="112" cy="60" fill="#fbb6a3" r="8" />
            </g>

            {/* Legs */}
            <rect fill="#fbb6a3" height="0" rx="6" width="12" x="52" y="155" />
            <rect fill="#fbb6a3" height="0" rx="6" width="12" x="79" y="155" />

            {/* T-shirt sleeves */}
            <rect fill="#2d3748" height="20" rx="7" width="15" x="35" y="85" />
            <rect fill="#2d3748" height="20" rx="7" width="15" x="93" y="85" />

            {/* Motion lines around dumbbell */}
            <path
              d="M15 50L20 48M15 55L20 53M15 60L20 58"
              stroke="#9ca3af"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M125 48L130 50M125 53L130 55M125 58L130 60"
              stroke="#9ca3af"
              strokeLinecap="round"
              strokeWidth="2"
            />

            {/* Sweat drops */}
            <circle cx="85" cy="45" fill="#60a5fa" r="1.5" />
            <circle cx="88" cy="48" fill="#60a5fa" r="1" />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-start gap-[120px] p-0">
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

        {/* Bottom Section with Indicators and Next Button */}
        <div className="relative box-border flex w-full shrink-0 flex-row content-stretch items-center justify-between p-0">
          <StepIndicator currentStep={currentStep} totalSteps={4} />

          <button
            className="relative box-border flex shrink-0 flex-row content-stretch items-center justify-center gap-2 rounded-lg bg-[#181d27] px-5 py-2 transition-all duration-200 hover:bg-[#282d37]"
            onClick={onNext}
            type="button"
          >
            <div className="flex flex-col justify-center text-nowrap text-left font-['Inter'] font-semibold text-[#fdfdfd] text-[16px] not-italic leading-[0]">
              <p className="block whitespace-pre leading-[24px]">Next</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  // Step 4: What Are You Craving Today?
  const renderStep4 = () => {
    const cravingOptions = [
      { id: 'Crunchy', label: 'Crunchy' },
      { id: 'Creamy', label: 'Creamy' },
      { id: 'Pedas', label: 'Pedas' },
    ];

    return (
      <div className="relative box-border flex size-full flex-col content-stretch items-center gap-8 px-10 py-6">
        {/* Content Section */}
        <div className="relative min-h-px w-full min-w-px shrink-0 grow basis-0">
          <div className="relative flex h-full flex-col items-center justify-end">
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
          </div>
        </div>

        {/* Options Section */}
        <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-[120px] p-0">
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

          {/* Bottom Section with Indicators and Next Button */}
          <div className="relative box-border flex w-full shrink-0 flex-row content-stretch items-center justify-between p-0">
            <StepIndicator currentStep={currentStep} totalSteps={4} />

            <button
              className="relative box-border flex shrink-0 flex-row content-stretch items-center justify-center gap-2 rounded-lg bg-[#181d27] px-5 py-2 transition-all duration-200 hover:bg-[#282d37]"
              onClick={onSkip}
              type="button"
            >
              <div className="flex flex-col justify-center text-nowrap text-left font-['Inter'] font-semibold text-[#fdfdfd] text-[16px] not-italic leading-[0]">
                <p className="block whitespace-pre leading-[24px]">Complete</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative box-border flex size-full min-h-screen flex-col-reverse content-stretch items-center justify-center bg-[#ffffff] p-0">
      <div className="relative order-1 min-h-px w-full min-w-px shrink-0 grow basis-0">
        <div className="relative flex size-full flex-col items-center">
          {currentStep === 0 && renderStep1()}
          {currentStep === 1 && renderStep2()}
          {currentStep === 2 && renderStep3()}
          {currentStep === 3 && renderStep4()}
        </div>
      </div>
    </div>
  );
}
