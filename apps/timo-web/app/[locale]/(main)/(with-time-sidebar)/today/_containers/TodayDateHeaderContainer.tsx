"use client";

import { AddTaskButton } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";

import { DateInformation } from "@/app/[locale]/(main)/(with-time-sidebar)/_components/DateInformation";
import {
  convertDateToDateText,
  getToday,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { getDayOfWeekKey } from "@/utils/get-day-of-week-key";

interface TodayDateHeaderContainerProps {
  completedCount: number;
  totalCount: number;
}

export const TodayDateHeaderContainer = ({
  completedCount,
  totalCount,
}: TodayDateHeaderContainerProps) => {
  const tHome = useTranslations("Home");
  const tCommon = useTranslations("Common");

  const today = getToday();
  const date = convertDateToDateText(today);
  const dayKey = getDayOfWeekKey(today);
  const dayOfWeek = tCommon(`weekday.${dayKey}`);

  return (
    <div className="flex flex-col gap-3 pb-2">
      <DateInformation
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
