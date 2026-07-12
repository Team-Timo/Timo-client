"use client";

import type { Dispatch, SetStateAction } from "react";

import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";

interface StatisticsHeaderContainerProps {
  currentMonth: Date;
  onChangeMonth: Dispatch<SetStateAction<Date>>;
}

const MONTH_LABEL_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
});

const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

export const StatisticsHeaderContainer = ({
  currentMonth,
  onChangeMonth,
}: StatisticsHeaderContainerProps) => {
  const { isOpen, toggle } = useNavigationSidebar();

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
            label={MONTH_LABEL_FORMATTER.format(currentMonth)}
          />
        </>
      }
    />
  );
};
