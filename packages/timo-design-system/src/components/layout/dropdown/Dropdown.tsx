import { cn } from "@lib";

import type { ReactNode } from "react";

export interface DropdownProps {
  children: ReactNode;
  className?: string;
}

const DropdownRoot = ({ children, className }: DropdownProps) => {
  return (
    <div
      className={cn(
        "rounded-4 flex flex-col items-start bg-white p-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export interface DropdownItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const DropdownItem = ({ children, className, onClick }: DropdownItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-4 flex w-full items-center transition-colors duration-200 ease-in-out",
        className,
      )}
    >
      {children}
    </button>
  );
};

export const Dropdown = Object.assign(DropdownRoot, { Item: DropdownItem });
