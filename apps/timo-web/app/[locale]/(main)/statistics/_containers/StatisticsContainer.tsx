"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

import {
  StatisticsSidePanel,
  type StatisticsSidePanelProps,
} from "@/app/[locale]/(main)/statistics/_components/StatisticsSidePanel";
import { StatisticsCalendarContainer } from "@/app/[locale]/(main)/statistics/_containers/StatisticsCalendarContainer";
import { StatisticsHeaderContainer } from "@/app/[locale]/(main)/statistics/_containers/StatisticsHeaderContainer";
import {
  MOCK_STATISTICS_DAY_DETAILS,
  MOCK_STATISTICS_MONTH_SUMMARY,
} from "@/app/[locale]/(main)/statistics/_mocks/statistics-calendar";
import { formatStatisticsSidePanelDate } from "@/app/[locale]/(main)/statistics/_utils/format-statistics-date";
import { formatDateKey } from "@/utils/date";

export const StatisticsContainer = () => {
  const locale = useLocale();
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [sidePanelProps, setSidePanelProps] =
    useState<StatisticsSidePanelProps>({
      variant: "month",
      summary: MOCK_STATISTICS_MONTH_SUMMARY,
    });

  const getStatisticsDayDetail = (date: Date) => {
    const selectedDateKey = formatDateKey(date);
    const selectedDetailBase = MOCK_STATISTICS_DAY_DETAILS[selectedDateKey] ?? {
      date: selectedDateKey,
      totalRecordMinutes: 0,
      todos: [],
    };

    return {
      ...selectedDetailBase,
      date: formatStatisticsSidePanelDate(date, locale),
    };
  };

  const handleChangeMonth = (updater: (prev: Date) => Date) => {
    setCurrentMonth(updater);
    setSidePanelProps({
      variant: "month",
      summary: MOCK_STATISTICS_MONTH_SUMMARY,
    });
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSidePanelProps({
      variant: "day",
      detail: getStatisticsDayDetail(date),
    });
  };

  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <StatisticsHeaderContainer
          currentMonth={currentMonth}
          onChangeMonth={handleChangeMonth}
        />
        <div className="flex min-h-0 flex-1">
          <StatisticsCalendarContainer
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
          />
        </div>
      </div>

      <StatisticsSidePanel {...sidePanelProps} />
    </div>
  );
};
