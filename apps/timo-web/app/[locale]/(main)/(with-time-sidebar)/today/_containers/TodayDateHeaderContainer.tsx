"use client";

import { useTranslations } from "next-intl";

import { DateInformation } from "@/app/[locale]/(main)/(with-time-sidebar)/_components/DateInformation";
import { convertDateToDateText } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { useCreateTodoSubmit } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_hooks/todo-modal/use-create-todo-submit";
import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { CreateTodoModalContainer } from "@/containers/todo-modal/create/CreateTodoModalContainer";
import { getToday } from "@/utils/date/date";
import { getDayOfWeekKey } from "@/utils/date/get-day-of-week-key";

interface TodayDateHeaderContainerProps {
  completedCount: number;
  totalCount: number;
}

export const TodayDateHeaderContainer = ({
  completedCount,
  totalCount,
}: TodayDateHeaderContainerProps) => {
  const tCommon = useTranslations("Common");
  const tToast = useTranslations("Toast");

  const today = getToday();
  const date = convertDateToDateText(today);
  const dayKey = getDayOfWeekKey(today);
  const dayOfWeek = tCommon(`weekday.${dayKey}`);
  const { handleSubmit, isErrorToastOpen, closeErrorToast } =
    useCreateTodoSubmit();

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
      <CreateTodoModalContainer
        defaultDate={today}
        buttonVariant="big"
        totalCount={totalCount}
        onSubmit={handleSubmit}
      />
      <AnimatedToast
        isOpen={isErrorToastOpen}
        onClose={closeErrorToast}
        message={tToast("todoCreateFailed")}
      />
    </div>
  );
};
