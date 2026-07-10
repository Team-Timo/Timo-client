"use client";

import { useState } from "react";

import { StatisticsCalendar } from "@/app/[locale]/(main)/statistics/_components/StatisticsCalendar";
import { StatisticsHeaderContainer } from "@/app/[locale]/(main)/statistics/_containers/StatisticsHeaderContainer";
import { MOCK_STATISTICS_CALENDAR } from "@/app/[locale]/(main)/statistics/_mocks/statisticsCalendar";

export default function StatisticsPage() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  return (
    <>
      <StatisticsHeaderContainer
        currentMonth={currentMonth}
        onChangeMonth={setCurrentMonth}
      />
      <StatisticsCalendar
        currentMonth={currentMonth}
        calendarData={MOCK_STATISTICS_CALENDAR}
      />
    </>
  );
}
