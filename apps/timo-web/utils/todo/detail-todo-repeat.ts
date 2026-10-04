import type { TodoUpdateRequestRepeatWeekdaysItem } from "@/generated/models";
import type { RepeatFrequency } from "@repo/timo-design-system/ui";

import { isTodoUpdateRepeatWeekday } from "@/utils/todo/detail-todo-update-request";

export interface DetailTodoRepeatValues {
  isRepeatActive: boolean;
  repeatFrequency: RepeatFrequency;
  selectedWeekdayIds: string[];
  repeatDay: string;
}

export type EffectiveDetailTodoRepeat =
  | { repeatType: "NONE" | "DAILY" }
  | {
      repeatType: "WEEKLY";
      repeatWeekdays: TodoUpdateRequestRepeatWeekdaysItem[];
    }
  | { repeatType: "MONTHLY"; repeatDayOfMonth?: number };

export const getEffectiveDetailTodoRepeat = ({
  isRepeatActive,
  repeatFrequency,
  selectedWeekdayIds,
  repeatDay,
}: DetailTodoRepeatValues): EffectiveDetailTodoRepeat => {
  if (!isRepeatActive) return { repeatType: "NONE" };
  if (repeatFrequency === "DAILY") return { repeatType: "DAILY" };

  if (repeatFrequency === "WEEKLY") {
    const repeatWeekdays = selectedWeekdayIds.filter(isTodoUpdateRepeatWeekday);
    return repeatWeekdays.length > 0
      ? { repeatType: "WEEKLY", repeatWeekdays }
      : { repeatType: "NONE" };
  }

  const repeatDayOfMonth = Number(repeatDay);
  if (
    Number.isInteger(repeatDayOfMonth) &&
    repeatDayOfMonth >= 1 &&
    repeatDayOfMonth <= 31
  ) {
    return { repeatType: "MONTHLY", repeatDayOfMonth };
  }

  return repeatDay.trim() === ""
    ? { repeatType: "NONE" }
    : { repeatType: "MONTHLY" };
};

export const isSameEffectiveDetailTodoRepeat = (
  first: EffectiveDetailTodoRepeat,
  second: EffectiveDetailTodoRepeat,
): boolean => {
  if (first.repeatType !== second.repeatType) return false;

  if (first.repeatType === "WEEKLY" && second.repeatType === "WEEKLY") {
    const firstWeekdays = [...first.repeatWeekdays].sort();
    const secondWeekdays = [...second.repeatWeekdays].sort();
    return (
      firstWeekdays.length === secondWeekdays.length &&
      firstWeekdays.every((day, index) => day === secondWeekdays[index])
    );
  }

  if (first.repeatType === "MONTHLY" && second.repeatType === "MONTHLY") {
    return first.repeatDayOfMonth === second.repeatDayOfMonth;
  }

  return true;
};
