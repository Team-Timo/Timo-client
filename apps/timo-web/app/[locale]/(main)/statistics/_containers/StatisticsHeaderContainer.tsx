"use client";

import { useLocale } from "next-intl";

import { Header } from "@/components/layout/header/Header";
import { NavigationSidebarToggle } from "@/components/layout/sidebar/navigation/NavigationSidebarToggle";

interface StatisticsHeaderContainerProps {
  currentMonth: Date;
  onChangeMonth: (updater: (prev: Date) => Date) => void;
}

const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

export const StatisticsHeaderContainer = ({
  currentMonth,
  onChangeMonth,
}: StatisticsHeaderContainerProps) => {
  const locale = useLocale();
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(currentMonth);

  const handlePrev = () => onChangeMonth((prev) => addMonths(prev, -1));
  const handleNext = () => onChangeMonth((prev) => addMonths(prev, 1));

  return (
    <Header
      className="shrink-0 px-3 py-1.5 md:px-5 md:py-3 [&>div:first-child]:flex-1 md:[&>div:first-child]:flex-none"
      left={
        <>
          <NavigationSidebarToggle />
          <div className="ml-auto md:ml-0">
            <Header.WeeklyNav
              onPrev={handlePrev}
              onNext={handleNext}
              label={monthLabel}
            />
          </div>
        </>
      }
    />
  );
};
