"use client";

import { useTranslations } from "next-intl";

import type { TodoMock } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";

import { DateInformation } from "@/app/[locale]/(main)/(with-time-sidebar)/_components/DateInformation";
import { convertDateToDateText } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { CreateTodoModalContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/todo-modal/CreateTodoModalContainer";
import { getToday } from "@/utils/date/date";
import { getDayOfWeekKey } from "@/utils/date/get-day-of-week-key";

interface TodayDateHeaderContainerProps {
  completedCount: number;
  totalCount: number;
  onCreateTodo: (todo: TodoMock) => void;
}

export const TodayDateHeaderContainer = ({
  completedCount,
  totalCount,
  onCreateTodo,
}: TodayDateHeaderContainerProps) => {
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
      <CreateTodoModalContainer defaultDate={today} onCreate={onCreateTodo} />
    </div>
  );
};
