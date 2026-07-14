"use client";

import { StatisticsCalendar } from "@/app/[locale]/(main)/statistics/_components/StatisticsCalendar";
import { MOCK_STATISTICS_CALENDAR } from "@/app/[locale]/(main)/statistics/_mocks/statistics-calendar";

interface StatisticsCalendarContainerProps {
  currentMonth: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export const StatisticsCalendarContainer = ({
  currentMonth,
  selectedDate,
  onSelectDate,
}: StatisticsCalendarContainerProps) => {
  return (
    <StatisticsCalendar
      currentMonth={currentMonth}
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
      calendarData={MOCK_STATISTICS_CALENDAR}
    />
  );
};
