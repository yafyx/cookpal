interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, index) => index);

  return (
    <div className="relative box-border flex shrink-0 flex-row content-stretch items-start justify-start gap-2 p-0">
      {steps.map((index) => (
        <div
          className={`size-1.5 shrink-0 rounded ${
            index === currentStep ? 'bg-[#414651]' : 'bg-[#e9eaeb]'
          }`}
          key={index}
        />
      ))}
    </div>
  );
}
