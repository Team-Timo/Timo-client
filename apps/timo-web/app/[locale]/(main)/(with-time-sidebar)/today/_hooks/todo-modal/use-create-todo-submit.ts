import type { CreateTodoRequest, TodoPriority } from "@/api/todo/todo-schema";
import type { TodoMock } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";
import type { CreateTodoTag } from "@/components/todo-modal/CreateTodoModalContent";

import { convertApiDurationToSeconds } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_utils/todo-time";

const PRIORITY_TO_MOCK: Record<TodoPriority, TodoMock["priority"]> = {
  VERY_HIGH: "URGENT",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
};

// 목데이터: 실제 API 호출 없이 로컬 상태에만 즉시 반영한다.
const buildTodoFromRequest = (
  data: CreateTodoRequest,
  tag: CreateTodoTag,
): TodoMock => ({
  todoId: Date.now(),
  icon: data.icon ?? "",
  title: data.title,
  completed: false,
  date: data.date,
  durationSeconds: convertApiDurationToSeconds(data.duration),
  priority: PRIORITY_TO_MOCK[data.priority ?? "MEDIUM"],
  tag: { tagId: tag.id, name: tag.name },
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
  onCreate: (todo: TodoMock) => void;
}

export const useCreateTodoSubmit = ({
  onCreate,
}: UseCreateTodoSubmitParams) => {
  const handleSubmit = (data: CreateTodoRequest, tag: CreateTodoTag) => {
    onCreate(buildTodoFromRequest(data, tag));
  };

  return { handleSubmit };
};
