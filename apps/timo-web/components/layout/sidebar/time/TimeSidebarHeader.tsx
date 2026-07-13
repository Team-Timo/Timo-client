"use client";

import { SidebarButton } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";

import { getDayOfWeekKey } from "@/utils/date/get-day-of-week-key";

export interface TimeSidebarHeaderProps {
  date: Date;
  isOpen?: boolean;
  onToggleCollapse?: () => void;
}

export const TimeSidebarHeader = ({
  date,
  isOpen = true,
  onToggleCollapse,
}: TimeSidebarHeaderProps) => {
  const t = useTranslations("Common");
  const day = date.getDate();

  const weekday = t(`weekday.${getDayOfWeekKey(date)}`);

  return (
    <header className="relative flex items-center px-4.5 pt-3 pb-3">
      <p
        aria-hidden={!isOpen}
        className={cn(
          "flex items-center gap-2 transition-opacity duration-200 ease-in-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <span className="typo-headline-b-30 text-timo-black">{day}</span>
        <span className="typo-body-m-12 text-timo-gray-700">{weekday}</span>
      </p>

      <SidebarButton
        isOpen={isOpen}
        onClick={onToggleCollapse}
        className="absolute top-3 right-4.5"
      />
    </header>
  );
};
