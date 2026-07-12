"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

import { StatisticsCalendar } from "@/app/[locale]/(main)/statistics/_components/StatisticsCalendar";
import { StatisticsSidePanel } from "@/app/[locale]/(main)/statistics/_components/StatisticsSidePanel";
import { StatisticsHeaderContainer } from "@/app/[locale]/(main)/statistics/_containers/StatisticsHeaderContainer";
import {
  MOCK_STATISTICS_CALENDAR,
  MOCK_STATISTICS_DAY_DETAILS,
  MOCK_STATISTICS_MONTH_SUMMARY,
} from "@/app/[locale]/(main)/statistics/_mocks/statistics-calendar";
import { formatStatisticsSidePanelDate } from "@/app/[locale]/(main)/statistics/_utils/format-statistics-date";
import { formatDateKey } from "@/app/[locale]/(main)/statistics/_utils/statistics-calendar";

type StatisticsPanelMode = "month" | "day";

export const StatisticsContainer = () => {
  const locale = useLocale();
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(
    () => new Date(MOCK_STATISTICS_CALENDAR.today),
  );
  const [panelMode, setPanelMode] = useState<StatisticsPanelMode>("month");
  const selectedDateKey = formatDateKey(selectedDate);
  const selectedDetailBase = MOCK_STATISTICS_DAY_DETAILS[selectedDateKey] ?? {
    date: selectedDateKey,
    totalRecordMinutes: 0,
    todos: [],
  };
  const selectedDetail = {
    ...selectedDetailBase,
    date: formatStatisticsSidePanelDate(selectedDate, locale),
  };
  
  const handleChangeMonth: typeof setCurrentMonth = (value) => {
    setCurrentMonth(value);
    setPanelMode("month");
  };
  
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setPanelMode("day");
  };

  return (
    <div className="flex h-full flex-col">
      <StatisticsHeaderContainer
        currentMonth={currentMonth}
        onChangeMonth={handleChangeMonth}
      />
      <div className="flex min-h-0 flex-1">
        <StatisticsCalendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          calendarData={MOCK_STATISTICS_CALENDAR}
        />
        {panelMode === "month" ? (
          <StatisticsSidePanel
            variant="month"
            summary={MOCK_STATISTICS_MONTH_SUMMARY}
          />
        ) : (
          <StatisticsSidePanel variant="day" detail={selectedDetail} />
        )}
      </div>
    </div>
  );
};
