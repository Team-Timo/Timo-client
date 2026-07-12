"use client";

import { useTranslations } from "next-intl";

import type { ApiDayOfWeek } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

import { DateInformation } from "@/app/[locale]/(main)/(with-time-sidebar)/_components/DateInformation";
import {
  convertDateToDateText,
  getToday,
  parseDateKey,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { CreateTodoModalContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/todo-modal/CreateTodoModalContainer";

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
  const tCommon = useTranslations("Common");
  const date = parseDateKey(dateKey) ?? getToday();

  return (
    <div className="flex flex-col gap-3 pb-2">
      <DateInformation
        date={convertDateToDateText(date)}
        dayOfWeek={tCommon(`weekday.${dayOfWeek}`)}
        isHoliday={isHoliday}
        isToday={isToday}
        totalCount={totalCount}
        completedCount={completedCount}
      />
      <CreateTodoModalContainer defaultDate={date} />
    </div>
  );
};
