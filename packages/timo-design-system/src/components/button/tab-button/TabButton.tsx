import { cn } from "../../../lib";

import type { ReactNode } from "react";

type TabButtonVariant = "default" | "selected";

const TAB_BUTTON_VARIANT_CLASS_NAME: Record<TabButtonVariant, string> = {
  default: "text-timo-gray-800 hover:bg-timo-gray-500",
  selected: "bg-timo-blue-65 text-timo-blue-300",
};

export interface TabButtonProps {
  label: string;
  icon: ReactNode;
  hoverIcon?: ReactNode;
  isSelected?: boolean;
}

export const TabButton = ({
  label,
  icon,
  hoverIcon,
  isSelected = false,
}: TabButtonProps) => {
  const baseButtonClassName =
    "group flex w-45 items-center gap-2 rounded-[8px] px-3 py-1";

  const variant: TabButtonVariant = isSelected ? "selected" : "default";

  const hasHoverIcon = hoverIcon && !isSelected;

  return (
    <span
      className={cn(
        baseButtonClassName,
        TAB_BUTTON_VARIANT_CLASS_NAME[variant],
      )}
    >
      {hasHoverIcon ? (
        <>
          <span className="group-hover:hidden">{icon}</span>
          <span className="hidden group-hover:block">{hoverIcon}</span>
        </>
      ) : (
        icon
      )}
      <span>{label}</span>
    </span>
  );
};
