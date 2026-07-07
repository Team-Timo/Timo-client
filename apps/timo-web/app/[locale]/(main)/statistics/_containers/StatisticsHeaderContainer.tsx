"use client";

import { useState } from "react";

import { Header } from "@/components/layout/header/Header";

const MONTH_LABEL_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
});

const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

export const StatisticsHeaderContainer = () => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  const handlePrev = () => setCurrentMonth((prev) => addMonths(prev, -1));
  const handleNext = () => setCurrentMonth((prev) => addMonths(prev, 1));

  return (
    <Header
      left={
        <Header.WeeklyNav
          onPrev={handlePrev}
          onNext={handleNext}
          label={MONTH_LABEL_FORMATTER.format(currentMonth)}
        />
      }
    />
  );
};
