import { cn } from "../../../lib";

import type { MouseEventHandler, PointerEventHandler, ReactNode } from "react";


export type PlayButtonVariant = "play" | "stop";
export type PlayButtonSize = "sm" | "lg";

export interface PlayButtonProps {
  variant: PlayButtonVariant;
  size?: PlayButtonSize;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onPointerDown?: PointerEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  ariaLabel?: string;
}

const VARIANT_MAP: Record<
  PlayButtonVariant,
  { className: string; label: string }
> = {
  play: { className: "cursor-pointer bg-timo-blue-50", label: "재생" },
  stop: { className: "cursor-pointer bg-timo-blue-50", label: "정지" },
};

const SIZE_CLASS: Record<PlayButtonSize, string> = {
  sm: "size-6",
  lg: "size-10",
};

export const PlayButton = ({
  variant,
  size = "sm",
  disabled = false,
  onClick,
  onPointerDown,
  children,
  ariaLabel,
}: PlayButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={onPointerDown}
      disabled={disabled}
      aria-label={
        ariaLabel ??
        (disabled
          ? `${VARIANT_MAP[variant].label} 불가`
          : VARIANT_MAP[variant].label)
      }
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        SIZE_CLASS[size],
        disabled
          ? "bg-timo-gray-500 cursor-not-allowed"
          : VARIANT_MAP[variant].className,
      )}
    >
      {children}
    </button>
  );
};
