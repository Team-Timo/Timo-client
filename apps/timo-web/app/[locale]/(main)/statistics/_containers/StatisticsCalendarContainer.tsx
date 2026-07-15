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

interface StatisticsCalendarStatusProps {
  lottieSrc: string;
  message: string;
  role?: "status" | "alert";
}

const StatisticsCalendarStatus = ({
  lottieSrc,
  message,
  role = "status",
}: StatisticsCalendarStatusProps) => {
  return (
    <section
      className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 px-14.75 pt-10 pb-13 text-center"
      role={role}
    >
      <LottiePlayer src={lottieSrc} className="w-[143px]" ariaLabel={message} />
      <p className="typo-headline-m-14 text-timo-gray-900">{message}</p>
    </section>
  );
};

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
    return (
      <StatisticsCalendarStatus
        lottieSrc="/lottie/loading.json"
        message={t("loading")}
      />
    );
  }

  if (calendarQuery.isError || !calendarData) {
    return (
      <StatisticsCalendarStatus
        lottieSrc="/lottie/error.json"
        message={t("error")}
        role="alert"
      />
    );
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
