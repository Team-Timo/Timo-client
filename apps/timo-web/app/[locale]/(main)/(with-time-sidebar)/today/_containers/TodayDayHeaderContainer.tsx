"use client";

import { AddTaskButton } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";

import { HomeDateInformation } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/HomeDateInformation";
import {
  convertDateToDateText,
  getToday,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { getDayOfWeekKey } from "@/utils/get-day-of-week-key";

interface TodayDayHeaderContainerProps {
  completedCount: number;
  totalCount: number;
}

export const TodayDayHeaderContainer = ({
  completedCount,
  totalCount,
}: TodayDayHeaderContainerProps) => {
  const tHome = useTranslations("Home");
  const tCommon = useTranslations("Common");

  const today = getToday();
  const date = convertDateToDateText(today);
  const dayKey = getDayOfWeekKey(today);
  const dayOfWeek = tCommon(`weekday.${dayKey}`);

  return (
    <div className="flex flex-col gap-3 pb-2">
      <HomeDateInformation
        date={date}
        dayOfWeek={dayOfWeek}
        isHoliday={false}
        isToday={true}
        totalCount={totalCount}
        completedCount={completedCount}
      />
      <AddTaskButton variant="big" text={tHome("addTask")} />
    </div>
  );
};
