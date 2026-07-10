"use client";

import { useLocale } from "next-intl";

import type { Dispatch, SetStateAction } from "react";

import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";

interface StatisticsHeaderContainerProps {
  currentMonth: Date;
  onChangeMonth: Dispatch<SetStateAction<Date>>;
}

const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

export const StatisticsHeaderContainer = ({
  currentMonth,
  onChangeMonth,
}: StatisticsHeaderContainerProps) => {
  const { isOpen, toggle } = useNavigationSidebar();
  const locale = useLocale();
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(currentMonth);

  const handlePrev = () => onChangeMonth((prev) => addMonths(prev, -1));
  const handleNext = () => onChangeMonth((prev) => addMonths(prev, 1));

  return (
    <Header
      left={
        <>
          <Header.SidebarButton isOpen={isOpen} onClick={toggle} />
          <Header.WeeklyNav
            onPrev={handlePrev}
            onNext={handleNext}
            label={monthLabel}
          />
        </>
      }
    />
  );
};
