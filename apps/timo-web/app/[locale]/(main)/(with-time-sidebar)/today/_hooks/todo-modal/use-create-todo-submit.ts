import type { CreateTodoRequest } from "@/api/common/todo-schema";
import type { TodayTodo } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_types/today-type";

import { convertApiDurationToSeconds } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_utils/todo-time";

const buildTodoFromRequest = (data: CreateTodoRequest): TodayTodo => ({
  todoId: Date.now(),
  icon: data.icon ?? undefined,
  title: data.title,
  completed: false,
  date: data.date,
  durationSeconds: convertApiDurationToSeconds(data.duration),
  priority: data.priority ?? "MEDIUM",
  tag: data.tagId != null ? { tagId: data.tagId, name: "" } : undefined,
  hasMemo: Boolean(data.memo?.trim()),
  isRepeated: data.repeatType !== "NONE",
  timerStatus: "STOPPED",
  sortOrder: 0,
  subtasks: (data.subtasks ?? []).map((content, index) => ({
    subtaskId: Date.now() + index,
    content,
    completed: false,
  })),
});

export interface UseCreateTodoSubmitParams {
  onCreate: (todo: TodayTodo) => void;
}

export const useCreateTodoSubmit = ({
  onCreate,
}: UseCreateTodoSubmitParams) => {
  const handleSubmit = (data: CreateTodoRequest) => {
    onCreate(buildTodoFromRequest(data));
  };

  return { handleSubmit };
};
