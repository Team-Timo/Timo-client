import { ChevronLeftIcon, ChevronRightIcon } from "../../../icons";
import { cn } from "../../../lib";

import type { ReactNode } from "react";

export type WeeklyButtonVariantTypes = "left" | "right";

const WEEKLY_BUTTON_ICON: Record<WeeklyButtonVariantTypes, ReactNode> = {
  left: <ChevronLeftIcon />,
  right: <ChevronRightIcon />,
};

const WEEKLY_BUTTON_ARIA_LABEL: Record<WeeklyButtonVariantTypes, string> = {
  left: "이전",
  right: "다음",
};

export interface WeeklyButtonProps {
  variant: WeeklyButtonVariantTypes;
  onClick?: () => void;
  className?: string;
}

export const WeeklyButton = ({
  variant,
  onClick,
  className,
}: WeeklyButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={WEEKLY_BUTTON_ARIA_LABEL[variant]}
    className={cn(
      "border-timo-gray-500 flex size-8 items-center justify-center rounded-[4px] border bg-white",
      className,
    )}
  >
    {WEEKLY_BUTTON_ICON[variant]}
  </button>
);
