"use client";

import { StatisticsCalendar } from "@/app/[locale]/(main)/statistics/_components/StatisticsCalendar";
import { useStatisticsCalendarQuery } from "@/app/[locale]/(main)/statistics/_queries/statistics-queries";
import { formatDateKey } from "@/utils/date";

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
  const yearMonth = formatDateKey(currentMonth).slice(0, 7);
  const calendarQuery = useStatisticsCalendarQuery(yearMonth);
  const calendarData = calendarQuery.data?.data;
  if (!calendarData) return null;

  return (
    <StatisticsCalendar
      currentMonth={currentMonth}
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
      calendarData={calendarData}
    />
  );
};
