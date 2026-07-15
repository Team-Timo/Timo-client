"use client";

import { useTranslations } from "next-intl";

import { StatisticsCalendar } from "@/app/[locale]/(main)/statistics/_components/StatisticsCalendar";
import { useStatisticsCalendarQuery } from "@/app/[locale]/(main)/statistics/_queries/use-statistics-query";
import { LottiePlayer } from "@/components/lottie/LottiePlayer";
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
  const t = useTranslations("Statistics.calendar");
  const yearMonth = formatDateKey(currentMonth).slice(0, 7);
  const calendarQuery = useStatisticsCalendarQuery(yearMonth);
  const calendarData = calendarQuery.data?.data;

  if (calendarQuery.isPending) {
    return <LottiePlayer src="/lottie/loading.json" ariaLabel={t("loading")} />;
  }

  if (calendarQuery.isError || !calendarData) {
    return <LottiePlayer src="/lottie/error.json" ariaLabel={t("error")} />;
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
