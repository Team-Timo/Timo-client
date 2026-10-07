import { cn } from "../../../lib";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export type PillButtonVariant = "gray" | "gray-dark" | "blue";

const PILL_BUTTON_VARIANT: Record<PillButtonVariant, string> = {
  gray: "bg-timo-gray-300 text-timo-gray-900",
  "gray-dark": "bg-timo-gray-700 text-white",
  blue: "bg-timo-blue-300 text-white",
};

export interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: PillButtonVariant;
  icon?: ReactNode;
  onClick: () => void;
}

export const PillButton = ({
  children,
  variant = "gray",
  icon,
  onClick,
  type = "button",
  className,
  ...rest
}: PillButtonProps) => {
  const chipClassName = cn(
    "typo-body-m-12 flex h-7.5 shrink-0 items-center justify-center gap-1.5 rounded-[4px] px-3",
    PILL_BUTTON_VARIANT[variant],
    className,
  );

  return (
    <button type={type} onClick={onClick} className={chipClassName} {...rest}>
      <span className="whitespace-nowrap">{children}</span>
      {icon}
    </button>
  );
};
