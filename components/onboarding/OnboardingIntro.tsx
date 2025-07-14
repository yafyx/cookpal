interface OnboardingIntroProps {
  onSkip?: () => void;
}

export default function OnboardingIntro({ onSkip }: OnboardingIntroProps) {
  return (
    <div
      className="relative box-border flex min-h-screen w-full flex-col content-stretch items-start justify-start bg-[position:0%_0%,_50%_50%] p-0 [background-size:auto,_cover]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(245, 196, 30, 0.91) 0%, rgba(245, 196, 30, 0.91) 100%), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><rect width="400" height="600" fill="%23f5c41e"/><circle cx="100" cy="150" r="30" fill="%23f0b000" opacity="0.3"/><circle cx="300" cy="100" r="40" fill="%23f0b000" opacity="0.2"/><circle cx="350" cy="300" r="25" fill="%23f0b000" opacity="0.4"/><circle cx="50" cy="400" r="35" fill="%23f0b000" opacity="0.3"/><text x="200" y="500" text-anchor="middle" fill="%23666" font-family="Arial" font-size="12" opacity="0.3">Cooking Background</text></svg>')`,
      }}
    >
      <div className="relative box-border flex min-h-screen w-full shrink-0 grow basis-0 flex-col content-stretch items-center justify-between px-4 py-6">
        {/* Skip Button */}
        <div className="flex w-full justify-end">
          <button
            className="relative box-border flex shrink-0 flex-row content-stretch items-center justify-center gap-2 rounded-lg bg-[#181d27] px-5 py-2 transition-all duration-200 hover:bg-[#282d37]"
            onClick={onSkip}
            type="button"
          >
            <div className="flex flex-col justify-center text-nowrap text-left font-['Inter'] font-semibold text-[#fdfdfd] text-[16px] not-italic leading-[0]">
              <p className="block whitespace-pre leading-[24px]">Skip</p>
            </div>
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Main Content */}
        <div className="relative box-border flex w-full max-w-md flex-col content-stretch items-start justify-end gap-8 p-0 text-left text-[#181d27] not-italic leading-[0]">
          {/* Main Heading */}
          <div className="relative flex w-full shrink-0 flex-col justify-center font-['Inter'] font-semibold text-[36px] tracking-[-0.792px]">
            <h1 className="block leading-[44px]">
              Step-by-step with us in your kitchen
            </h1>
          </div>

          {/* Description Text */}
          <div className="relative flex w-full shrink-0 flex-col justify-center font-['Inter'] font-medium text-[0px]">
            <p className="mb-[18px] block text-[18px] leading-[28px]">
              CookPal is a cooking platform that combines technology with
              high-quality culinary content — Chefs guide you through
              step-by-step video recipes that make cooking efficient, creative,
              and inspiring.
            </p>
            <p className="block font-semibold text-[20px] leading-[30px]">
              It&apos;s time to cook, pal.
            </p>
          </div>

          {/* Privacy Policy and Terms */}
          <div className="relative flex w-full shrink-0 flex-col justify-center font-['Inter'] font-normal text-[0px]">
            <p className="text-[12px] leading-[18px]">
              <span>By continuing you agree to our </span>
              <span className="font-semibold underline">Privacy Policy</span>
              <span> and </span>
              <span className="font-semibold underline">Terms of use</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
