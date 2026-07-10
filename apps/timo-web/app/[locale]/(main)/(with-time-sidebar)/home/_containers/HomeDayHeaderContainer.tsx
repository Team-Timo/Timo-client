"use client";

import { AddTaskButton } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";

import type { ApiDayOfWeek } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

import { HomeDateInformation } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/HomeDateInformation";
import {
  convertDateToDateText,
  getToday,
  parseDateKey,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";

export interface HomeDayHeaderContainerProps {
  dateKey: string;
  dayOfWeek: ApiDayOfWeek;
  isHoliday: boolean;
  isToday: boolean;
  totalCount: number;
  completedCount: number;
}

export const HomeDayHeaderContainer = ({
  dateKey,
  dayOfWeek,
  isHoliday,
  isToday,
  totalCount,
  completedCount,
}: HomeDayHeaderContainerProps) => {
  const t = useTranslations("Home");
  const tCommon = useTranslations("Common");
  const date = parseDateKey(dateKey) ?? getToday();

  return (
    <div className="flex flex-col gap-3 pb-2">
      <HomeDateInformation
        date={convertDateToDateText(date)}
        dayOfWeek={tCommon(`weekday.${dayOfWeek}`)}
        isHoliday={isHoliday}
        isToday={isToday}
        totalCount={totalCount}
        completedCount={completedCount}
      />
      <AddTaskButton text={t("addTask")} />
    </div>
  );
};
