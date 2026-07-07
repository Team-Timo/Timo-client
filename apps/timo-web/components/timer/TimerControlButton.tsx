import { cn } from "@repo/timo-design-system/utils";

import type { MouseEventHandler, ReactNode } from "react";

export type TimerControlButtonVariant = "default" | "active";

export interface TimerControlButtonProps {
  icon: ReactNode;
  activeIcon?: ReactNode;
  label: string;
  variant?: TimerControlButtonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const TimerControlButton = ({
  icon,
  activeIcon,
  label,
  variant = "default",
  onClick,
  disabled = false,
}: TimerControlButtonProps) => {
  const isForcedActive = variant === "active";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group flex size-14.5 items-center justify-center rounded-full",
        isForcedActive
          ? "bg-timo-blue-50"
          : activeIcon
            ? "bg-timo-gray-300 active:bg-timo-blue-50"
            : "bg-timo-gray-300",
      )}
    >
      {isForcedActive || !activeIcon ? (
        icon
      ) : (
        <>
          <span className="group-active:hidden">{icon}</span>
          <span className="hidden group-active:block">{activeIcon}</span>
        </>
      )}
    </button>
  );
};
