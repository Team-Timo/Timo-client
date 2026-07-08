import { cn } from "@repo/timo-design-system/utils";

export interface OnboardingStepButtonProps {
  step: 1 | 2 | 3 | 4;
}

const STEPS = [1, 2, 3, 4] as const;

export const OnboardingStepButton = ({ step }: OnboardingStepButtonProps) => {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((s) => (
        <div
          key={s}
          className={cn(
            "flex size-[19px] items-center justify-center rounded-full",
            s === step ? "bg-timo-blue-300" : "bg-timo-blue-65",
          )}
        >
          <span
            className={cn(
              "typo-caption-r-10",
              s === step ? "text-white" : "text-timo-blue-100",
            )}
          >
            {s}
          </span>
        </div>
      ))}
    </div>
  );
};
