import { ReactNode } from "react";

import { cn } from "../../lib";

export type PlayButtonVariant = "play" | "stop" | "disabled";

export interface PlayButtonProps {
  variant: PlayButtonVariant;
  onClick?: () => void;
  children?: ReactNode;
}

const VARIANT_MAP: Record<PlayButtonVariant, { className: string }> = {
  play: { className: "cursor-pointer bg-timo-blue-50" },
  stop: { className: "cursor-pointer bg-timo-blue-50" },
  disabled: { className: "bg-timo-gray-500" },
};

const ARIA_LABEL_MAP: Record<PlayButtonVariant, string> = {
  play: "재생",
  stop: "정지",
  disabled: "재생 불가",
};

export const PlayButton = ({ variant, onClick, children }: PlayButtonProps) => {
  const { className } = VARIANT_MAP[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={variant === "disabled"}
      aria-label={ARIA_LABEL_MAP[variant]}
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-full",
        className,
      )}
    >
      {children}
    </button>
  );
};
