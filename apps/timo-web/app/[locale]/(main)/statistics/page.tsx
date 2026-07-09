"use client";

import { useState } from "react";

import { StatisticsCalendar } from "@/app/[locale]/(main)/statistics/_components/StatisticsCalendar";
import { StatisticsHeaderContainer } from "@/app/[locale]/(main)/statistics/_containers/StatisticsHeaderContainer";

export default function StatisticsPage() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  return (
    <>
      <StatisticsHeaderContainer
        currentMonth={currentMonth}
        onChangeMonth={setCurrentMonth}
      />
      <StatisticsCalendar currentMonth={currentMonth} />
    </>
  );
}
