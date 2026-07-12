"use client";

import { useTranslations } from "next-intl";

import type { ApiDayOfWeek } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";
import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { HomeDateInformation } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-card/HomeDateInformation";
import { CreateTodoModalContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/todo-modal/CreateTodoModalContainer";
import { convertDateToDateText } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { getToday, parseDateKey } from "@/utils/date";

export interface HomeDayHeaderContainerProps {
  dateKey: string;
  dayOfWeek: ApiDayOfWeek;
  isHoliday: boolean;
  isToday: boolean;
  totalCount: number;
  completedCount: number;
  onCreateTodo: (todo: Todo) => void;
}

export const HomeDayHeaderContainer = ({
  dateKey,
  dayOfWeek,
  isHoliday,
  isToday,
  totalCount,
  completedCount,
  onCreateTodo,
}: HomeDayHeaderContainerProps) => {
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
      <CreateTodoModalContainer defaultDate={date} onCreate={onCreateTodo} />
    </div>
  );
};
