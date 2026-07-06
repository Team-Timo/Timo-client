import { SidebarButton } from "@components/button/sidebar-button/SidebarButton";
import { TodayButton } from "@components/button/today-button/TodayButton";
import { WeeklyButton } from "@components/button/weekly-button/WeeklyButton";
import { DropdownView } from "@components/dropdown-view/DropdownView";
import { cn } from "@lib";

import type { ReactNode } from "react";

export interface HeaderProps {
  left: ReactNode;
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
      <WeeklyButton direction="left" onClick={onPrev} />
      {label && (
        <span className="typo-headline-m-14 text-timo-gray-900 flex h-8 items-center rounded-[4px] bg-white px-2">
          {label}
        </span>
      )}
      <WeeklyButton direction="right" onClick={onNext} />
    </div>
  );
};

export const Header = Object.assign(HeaderRoot, {
  SidebarButton,
  TodayButton,
  WeeklyNav: HeaderWeeklyNav,
  ViewDropdown: DropdownView,
});
