import { cn } from "@lib";
import { ReactNode } from "react";

export type PlayButtonVariant = "play" | "stop" | "disabled";
export type PlayButtonSize = "sm" | "lg";

export interface PlayButtonProps {
  variant: PlayButtonVariant;
  size?: PlayButtonSize;
  onClick?: () => void;
  children?: ReactNode;
}

const VARIANT_CLASS: Record<PlayButtonVariant, string> = {
  play: "cursor-pointer bg-timo-blue-50",
  stop: "cursor-pointer bg-timo-blue-50",
  disabled: "cursor-not-allowed bg-timo-gray-500",
};

const SIZE_CLASS: Record<PlayButtonSize, string> = {
  sm: "size-6",
  lg: "size-10",
};

const ARIA_LABEL_MAP: Record<PlayButtonVariant, string> = {
  play: "재생",
  stop: "정지",
  disabled: "재생 불가",
};

export const PlayButton = ({
  variant,
  size = "sm",
  onClick,
  children,
}: PlayButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={variant === "disabled"}
      aria-label={ARIA_LABEL_MAP[variant]}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        SIZE_CLASS[size],
        VARIANT_CLASS[variant],
      )}
    >
      {children}
    </button>
  );
};
