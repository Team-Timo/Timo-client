import { ChevronLeftIcon, ChevronRightIcon } from "../../../icons";
import { cn } from "../../../lib";

import type { ReactNode } from "react";

export type ChevronButtonVariantTypes = "left" | "right";

const CHEVRON_BUTTON_ICON: Record<ChevronButtonVariantTypes, ReactNode> = {
  left: <ChevronLeftIcon />,
  right: <ChevronRightIcon />,
};

const CHEVRON_BUTTON_ARIA_LABEL: Record<ChevronButtonVariantTypes, string> = {
  left: "이전",
  right: "다음",
};

export interface ChevronButtonProps {
  variant: ChevronButtonVariantTypes;
  onClick?: () => void;
  className?: string;
}

export const ChevronButton = ({
  variant,
  onClick,
  className,
}: ChevronButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={CHEVRON_BUTTON_ARIA_LABEL[variant]}
    className={cn(
      "border-timo-gray-500 flex size-8 items-center justify-center rounded-[4px] border bg-white",
      className,
    )}
  >
    {CHEVRON_BUTTON_ICON[variant]}
  </button>
);
