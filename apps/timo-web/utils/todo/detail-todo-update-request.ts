import type {
  TodoSubtaskUpdateRequest,
  TodoUpdateRequest,
  TodoUpdateRequestRepeatWeekdaysItem,
} from "@/api/generated/models";
import type { DetailTodoSubtaskInput } from "@/hooks/todo-modal/detail/use-detail-subtask-field";

const DETAIL_TODO_UPDATE_WEEKDAYS = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
] as const;

export const isTodoUpdateRepeatWeekday = (
  weekdayId: string,
): weekdayId is TodoUpdateRequestRepeatWeekdaysItem =>
  (DETAIL_TODO_UPDATE_WEEKDAYS as readonly string[]).includes(weekdayId);

export const buildDetailTodoSubtasksUpdateRequest = (
  subtasks: DetailTodoSubtaskInput[],
): TodoSubtaskUpdateRequest[] =>
  subtasks
    .map((subtask) => ({
      subtaskId: subtask.subtaskId ?? undefined,
      content: subtask.value.trim(),
      completed: subtask.completed,
    }))
    .filter((subtask) => subtask.content.length > 0);

export interface BuildDetailTodoTextUpdateRequestParams {
  title: string;
  memo: string;
  subtasks: DetailTodoSubtaskInput[];
}

export const buildDetailTodoTextUpdateRequest = ({
  title,
  memo,
  subtasks,
}: BuildDetailTodoTextUpdateRequestParams): TodoUpdateRequest => ({
  title: title.trim(),
  memo: memo.trim(),
  subtasks: buildDetailTodoSubtasksUpdateRequest(subtasks),
});
