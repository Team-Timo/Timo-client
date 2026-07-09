import {
  ChevronLeftIcon,
  ChevronSmallRightIcon,
  ChevronSmallRightWhiteIcon,
} from "@repo/timo-design-system/icons";
import { cn } from "@repo/timo-design-system/utils";

export interface OnboardingButtonProps {
  variant: "next" | "prev" | "start";
  label: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const OnboardingButton = ({
  variant,
  label,
  isActive = false,
  disabled = false,
  onClick,
}: OnboardingButtonProps) => {
  if (variant === "prev") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="hover:bg-timo-gray-500 bg-timo-gray-200 flex items-center justify-center gap-2 rounded-[4px] px-4 py-2 transition-colors duration-200 ease-in-out"
      >
        <ChevronLeftIcon width={18} height={18} />
        <span className="typo-headline-m-16 text-timo-gray-900">{label}</span>
      </button>
    );
  }

  if (variant === "start") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="bg-timo-blue-300 flex items-center justify-center gap-2 rounded-[4px] px-4 py-2"
      >
        <span className="typo-headline-m-16 text-white">{label}</span>
      </button>
    );
  }

  const isDisabled = disabled || !isActive;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "flex items-center justify-center gap-2 rounded-[4px] px-4 py-2",
        isActive ? "bg-timo-blue-300" : "bg-timo-gray-200",
      )}
    >
      <span
        className={cn(
          "typo-headline-m-16",
          isActive ? "text-white" : "text-timo-gray-700",
        )}
      >
        {label}
      </span>
      {isActive ? <ChevronSmallRightWhiteIcon /> : <ChevronSmallRightIcon />}
    </button>
  );
};
