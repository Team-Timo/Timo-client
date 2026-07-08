"use client";

import { useState } from "react";

import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";

const MONTH_LABEL_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
});

const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

export const StatisticsHeaderContainer = () => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const { isOpen, toggle } = useNavigationSidebar();

  const handlePrev = () => setCurrentMonth((prev) => addMonths(prev, -1));
  const handleNext = () => setCurrentMonth((prev) => addMonths(prev, 1));

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
