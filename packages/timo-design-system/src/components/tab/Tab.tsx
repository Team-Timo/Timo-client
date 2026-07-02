import { cn } from "@lib";

import type { ReactNode } from "react";

type TabVariant = "default" | "selected";

const TAB_VARIANT_CLASS_NAME: Record<TabVariant, string> = {
  default: "text-timo-gray-800 hover:bg-timo-gray-500",
  selected: "bg-timo-blue-65 text-timo-blue-300",
};

export interface TabProps {
  label: string;
  icon: ReactNode;
  hoverIcon?: ReactNode;
  isSelected?: boolean;
  onClick: () => void;
}

export const Tab = ({
  label,
  icon,
  hoverIcon,
  isSelected = false,
  onClick,
}: TabProps) => {
  const baseButtonClassName =
    "group flex w-45 items-center gap-2 rounded-8 px-3 py-1";

  const variant: TabVariant = isSelected ? "selected" : "default";

  const hasHoverIcon = hoverIcon && !isSelected;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseButtonClassName, TAB_VARIANT_CLASS_NAME[variant])}
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
    </button>
  );
};
