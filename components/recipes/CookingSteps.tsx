interface CookingStep {
  id: string;
  step: number;
  instruction: string;
  duration?: string;
}

interface CookingStepsProps {
  steps: CookingStep[];
}

export function CookingSteps({ steps }: CookingStepsProps) {
  return (
    <div>
      <h2 className="mb-4 font-semibold text-[#000000] text-lg leading-7">
        Instructions
      </h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div className="flex gap-3" key={step.id}>
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#fd853a]">
              <span className="font-semibold text-white text-xs">
                {step.step}
              </span>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-normal text-[#181d27] text-sm leading-5">
                {step.instruction}
              </p>
              {step.duration && (
                <span className="font-normal text-[#717680] text-xs">
                  {step.duration}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
