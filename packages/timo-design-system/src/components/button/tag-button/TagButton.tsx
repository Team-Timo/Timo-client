import { DeleteIcon } from "../../../icons";
import { cn } from "../../../lib";

import type { ReactNode } from "react";

export type TagButtonVariant = "gray" | "blue";

const TAG_BUTTON_VARIANT: Record<TagButtonVariant, string> = {
  gray: "bg-timo-gray-300 text-timo-gray-900",
  blue: "bg-timo-blue-300 text-white",
};

export interface TagButtonProps {
  children: ReactNode;
  variant?: TagButtonVariant;
  icon?: ReactNode;
  onClick?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
  className?: string;
}

export const TagButton = ({
  children,
  variant = "gray",
  icon,
  onClick,
  onRemove,
  removeLabel,
  className,
}: TagButtonProps) => {
  const chipClassName = cn(
    "typo-body-m-12 flex h-7.5 shrink-0 items-center justify-center gap-1.5 rounded-[4px] px-3",
    TAG_BUTTON_VARIANT[variant],
    className,
  );

  if (onRemove) {
    return (
      <div className={chipClassName}>
        <span className="whitespace-nowrap">{children}</span>
        <button type="button" onClick={onRemove} aria-label={removeLabel}>
          <DeleteIcon width={16} height={16} />
        </button>
      </div>
    );
  }

  if (!onClick) {
    return (
      <div className={chipClassName}>
        <span className="whitespace-nowrap">{children}</span>
        {icon}
      </div>
    );
  }

  return (
    <button type="button" onClick={onClick} className={chipClassName}>
      <span className="whitespace-nowrap">{children}</span>
      {icon}
    </button>
  );
};
