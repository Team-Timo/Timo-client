import { cn } from "@lib";
import { ReactNode } from "react";

export type PlayButtonVariant = "play" | "stop";
export type PlayButtonSize = "sm" | "lg";

export interface PlayButtonProps {
  variant: PlayButtonVariant;
  size?: PlayButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const VARIANT_CLASS: Record<PlayButtonVariant, string> = {
  play: "cursor-pointer bg-timo-blue-50",
  stop: "cursor-pointer bg-timo-blue-50",
};

const SIZE_CLASS: Record<PlayButtonSize, string> = {
  sm: "size-6",
  lg: "size-10",
};

const VARIANT_LABEL: Record<PlayButtonVariant, string> = {
  play: "재생",
  stop: "정지",
};

export const PlayButton = ({
  variant,
  size = "sm",
  disabled = false,
  onClick,
  children,
}: PlayButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={
        disabled ? `${VARIANT_LABEL[variant]} 불가` : VARIANT_LABEL[variant]
      }
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        SIZE_CLASS[size],
        disabled
          ? "bg-timo-gray-500 cursor-not-allowed"
          : VARIANT_CLASS[variant],
      )}
    >
      {children}
    </button>
  );
};
