"use client";

import {
  DropdownView,
  SidebarButton,
  TodayButton,
  ChevronButton,
} from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

import type { ReactNode } from "react";

export interface HeaderProps {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}

const HeaderRoot = ({ left, right, className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "border-timo-gray-500 flex w-full items-center justify-between rounded-tl-lg border-b bg-white px-5 py-3",
        className,
      )}
    >
      <div className="flex items-center gap-3">{left}</div>
      {right}
    </header>
  );
};

export interface HeaderWeeklyNavProps {
  onPrev: () => void;
  onNext: () => void;
  label?: string;
}

const HeaderWeeklyNav = ({ onPrev, onNext, label }: HeaderWeeklyNavProps) => {
  return (
    <div className="flex items-center gap-2">
      <ChevronButton variant="left" onClick={onPrev} />
      {label && (
        <span className="typo-headline-m-14 text-timo-gray-900 flex h-8 items-center rounded-[4px] bg-white px-2">
          {label}
        </span>
      )}
      <ChevronButton variant="right" onClick={onNext} />
    </div>
  );
};

export const Header = Object.assign(HeaderRoot, {
  SidebarButton,
  TodayButton,
  WeeklyNav: HeaderWeeklyNav,
  ViewDropdown: DropdownView,
}) as typeof HeaderRoot & {
  SidebarButton: typeof SidebarButton;
  TodayButton: typeof TodayButton;
  WeeklyNav: typeof HeaderWeeklyNav;
  ViewDropdown: typeof DropdownView;
};
