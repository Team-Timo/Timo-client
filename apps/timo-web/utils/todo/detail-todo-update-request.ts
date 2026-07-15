import type {
  TodoUpdateRequest,
  TodoUpdateRequestRepeatWeekdaysItem,
} from "@/api/generated/models";
import type { DetailTodoSubtaskInput } from "@/hooks/todo-modal/detail/use-detail-subtask-field";
import type {
  PriorityLevel,
  RepeatFrequency,
  TodoIconValue,
} from "@repo/timo-design-system/ui";

import { formatDateKey } from "@/utils/date/date";
import { convertTimeTextToDurationSeconds } from "@/utils/todo/todo-time";

const UPDATE_REPEAT_WEEKDAYS = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
] as const;

const isUpdateRepeatWeekday = (
  weekdayId: string,
): weekdayId is TodoUpdateRequestRepeatWeekdaysItem =>
  (UPDATE_REPEAT_WEEKDAYS as readonly string[]).includes(weekdayId);

export interface BuildDetailTodoUpdateRequestParams {
  icon: TodoIconValue | null;
  title: string;
  date: Date;
  time: string;
  priority: PriorityLevel;
  tagId: number | null;
  isRepeatActive: boolean;
  repeatFrequency: RepeatFrequency;
  selectedWeekdayIds: string[];
  repeatDay: string;
  memo: string;
  subtasks: DetailTodoSubtaskInput[];
}

export const buildDetailTodoUpdateRequest = ({
  icon,
  title,
  date,
  time,
  priority,
  tagId,
  isRepeatActive,
  repeatFrequency,
  selectedWeekdayIds,
  repeatDay,
  memo,
  subtasks,
}: BuildDetailTodoUpdateRequestParams): TodoUpdateRequest => {
  const durationSeconds = convertTimeTextToDurationSeconds(time);
  const repeatType = isRepeatActive ? repeatFrequency : "NONE";
  const repeatDayOfMonth = Number(repeatDay);
  const repeatWeekdays = selectedWeekdayIds.filter(isUpdateRepeatWeekday);
  const updateSubtasks = subtasks
    .map((subtask) => ({
      subtaskId: subtask.subtaskId ?? undefined,
      content: subtask.value.trim(),
      completed: subtask.completed,
    }))
    .filter((subtask) => subtask.content.length > 0);

  return {
    icon: icon ?? undefined,
    title: title.trim(),
    date: formatDateKey(date),
    durationSeconds: durationSeconds > 0 ? durationSeconds : undefined,
    priority,
    tagId: tagId ?? undefined,
    repeatType,
    repeatWeekdays:
      repeatType === "WEEKLY" && repeatWeekdays.length > 0
        ? repeatWeekdays
        : undefined,
    repeatDayOfMonth:
      repeatType === "MONTHLY" &&
      Number.isInteger(repeatDayOfMonth) &&
      repeatDayOfMonth >= 1 &&
      repeatDayOfMonth <= 31
        ? repeatDayOfMonth
        : undefined,
    memo: memo.trim(),
    subtasks: updateSubtasks,
  };
};
