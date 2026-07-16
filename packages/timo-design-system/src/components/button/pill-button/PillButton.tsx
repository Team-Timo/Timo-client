import { cn } from "../../../lib";

import type { ReactNode } from "react";

export type PillButtonVariant = "gray" | "gray-dark" | "blue";

const PILL_BUTTON_VARIANT: Record<PillButtonVariant, string> = {
  gray: "bg-timo-gray-300 text-timo-gray-900",
  "gray-dark": "bg-timo-gray-700 text-white",
  blue: "bg-timo-blue-300 text-white",
};

export interface PillButtonProps {
  children: ReactNode;
  variant?: PillButtonVariant;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
}

export const PillButton = ({
  children,
  variant = "gray",
  icon,
  onClick,
  className,
}: PillButtonProps) => {
  const chipClassName = cn(
    "typo-body-m-12 flex h-7.5 shrink-0 items-center justify-center gap-1.5 rounded-[4px] px-3",
    PILL_BUTTON_VARIANT[variant],
    className,
  );

  return (
    <button type="button" onClick={onClick} className={chipClassName}>
      <span className="whitespace-nowrap">{children}</span>
      {icon}
    </button>
  );
};
