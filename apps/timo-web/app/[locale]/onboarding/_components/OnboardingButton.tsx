import {
  ChevronSmallLeftIcon,
  ChevronSmallRightDisableIcon,
  ChevronSmallRightWhiteIcon,
} from "@repo/timo-design-system/icons";
import { Button } from "@repo/timo-design-system/ui";

interface OnboardingButtonProps {
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
      <Button
        variant="secondary"
        appearance="fill"
        size="m"
        icon={<ChevronSmallLeftIcon />}
        className="w-auto px-2"
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }

  const isDisabled = disabled || !isActive;

  if (variant === "start") {
    return (
      <Button
        variant="primary"
        appearance="fill"
        size="m"
        className="w-auto px-4"
        disabled={isDisabled}
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      variant={isDisabled ? "secondary" : "primary"}
      appearance="fill"
      size="m"
      icon={
        isDisabled ? (
          <ChevronSmallRightDisableIcon />
        ) : (
          <ChevronSmallRightWhiteIcon />
        )
      }
      iconPosition="right"
      className="w-auto px-2"
      disabled={isDisabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
