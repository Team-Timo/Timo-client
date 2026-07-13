"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

import {
  useGetDaily,
  useGetSummary,
} from "@/api/generated/endpoints/statistics/statistics";
import {
  StatisticsSidePanel,
  type StatisticsSidePanelProps,
} from "@/app/[locale]/(main)/statistics/_components/StatisticsSidePanel";
import { StatisticsCalendarContainer } from "@/app/[locale]/(main)/statistics/_containers/StatisticsCalendarContainer";
import { StatisticsHeaderContainer } from "@/app/[locale]/(main)/statistics/_containers/StatisticsHeaderContainer";
import { formatStatisticsSidePanelDate } from "@/app/[locale]/(main)/statistics/_utils/format-statistics-date";
import { formatDateKey } from "@/utils/date";

export const StatisticsContainer = () => {
  const locale = useLocale();
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [sidePanelVariant, setSidePanelVariant] =
    useState<StatisticsSidePanelProps["variant"]>("month");

  const yearMonth = formatDateKey(currentMonth).slice(0, 7);
  const summaryQuery = useGetSummary({ yearMonth });

  const selectedDateKey = formatDateKey(selectedDate);
  const dailyQuery = useGetDaily({ date: selectedDateKey });
  const daily = dailyQuery.data?.data;

  const summary = summaryQuery.data?.data ?? {
    totalRecordMinutes: 0,
    activeDayCount: 0,
    averageRecordedMinutes: 0,
    completedTodoCount: 0,
    totalTodoCount: 0,
  };

  const dayDetail = {
    date: formatStatisticsSidePanelDate(selectedDate, locale),
    totalRecordMinutes: daily?.totalRecordMinutes ?? 0,
    todos:
      daily?.todos.map((todo) => ({
        todoId: todo.todoId,
        title: todo.title,
        actualTimeMinutes: todo.actualTimeMinutes,
        estimatedTimeMinutes: todo.estimatedTimeMinutes ?? 0,
        tagName: todo.tag?.name ?? "",
      })) ?? [],
  };

  const sidePanelProps: StatisticsSidePanelProps =
    sidePanelVariant === "month"
      ? { variant: "month", summary }
      : { variant: "day", detail: dayDetail };

  const handleChangeMonth = (updater: (prev: Date) => Date) => {
    setCurrentMonth(updater);
    setSidePanelVariant("month");
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSidePanelVariant("day");
  };

  return (
    <div className="flex h-full flex-col">
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
        <StatisticsSidePanel {...sidePanelProps} />
      </div>
    </div>
  );
};
