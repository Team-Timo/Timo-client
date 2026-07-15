import { cn } from "../../../lib";

import type { MouseEventHandler, PointerEventHandler, ReactNode } from "react";

export type PlayButtonVariant = "play" | "stop";
export type PlayButtonSize = "sm" | "lg";

export interface PlayButtonProps {
  variant: PlayButtonVariant;
  size?: PlayButtonSize;
  disabled?: boolean;
  /** 다른 항목에 활성 타이머가 있어 이 버튼을 시각적으로 낮춰야 할 때 false로 준다 (클릭은 계속 가능) */
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onPointerDown?: PointerEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  ariaLabel?: string;
}

const VARIANT_LABEL: Record<PlayButtonVariant, string> = {
  play: "재생",
  stop: "정지",
};

const SIZE_CLASS: Record<PlayButtonSize, string> = {
  sm: "size-6",
  lg: "size-10",
};

export const PlayButton = ({
  variant,
  size = "sm",
  disabled = false,
  active = true,
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
        (disabled ? `${VARIANT_LABEL[variant]} 불가` : VARIANT_LABEL[variant])
      }
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full",
        SIZE_CLASS[size],
        disabled
          ? "bg-timo-gray-500 cursor-not-allowed"
          : active
            ? "bg-timo-blue-50"
            : "bg-timo-gray-500",
      )}
    >
      {children}
    </button>
  );
};
