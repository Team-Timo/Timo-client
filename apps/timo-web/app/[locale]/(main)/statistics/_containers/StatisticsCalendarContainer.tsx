"use client";

import { StatisticsCalendar } from "@/app/[locale]/(main)/statistics/_components/StatisticsCalendar";
import { useStatisticsCalendarQuery } from "@/app/[locale]/(main)/statistics/_queries/use-statistics-query";
import { formatDateKey } from "@/utils/date/date";

interface StatisticsCalendarContainerProps {
  currentMonth: Date;
  displayDate: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export const StatisticsCalendarContainer = ({
  currentMonth,
  displayDate,
  selectedDate,
  onSelectDate,
}: StatisticsCalendarContainerProps) => {
  const yearMonth = formatDateKey(currentMonth).slice(0, 7);
  const calendarQuery = useStatisticsCalendarQuery(yearMonth);
  const calendarData = calendarQuery.data?.data;

  if (calendarQuery.isPending || calendarQuery.isError || !calendarData) {
    return null;
  }

  return (
    <StatisticsCalendar
      currentMonth={currentMonth}
      displayDate={displayDate}
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
      calendarData={calendarData}
    />
  );
};
