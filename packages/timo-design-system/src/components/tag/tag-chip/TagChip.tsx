import { DeleteIcon } from "../../../icons";
import { cn } from "../../../lib";

import type { ReactNode } from "react";

export interface TagChipProps {
  children: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
  className?: string;
}

export const TagChip = ({
  children,
  onRemove,
  removeLabel,
  className,
}: TagChipProps) => {
  const chipClassName = cn(
    "typo-body-m-12 bg-timo-gray-300 text-timo-gray-900 flex h-7.5 shrink-0 items-center justify-center gap-1.5 rounded-[4px] px-3",
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

  return (
    <div className={chipClassName}>
      <span className="whitespace-nowrap">{children}</span>
    </div>
  );
};
