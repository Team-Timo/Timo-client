import type { CreateTodoRequest } from "@/api/todo/todo-schema";
import type { CreateTodoTag } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/todo-modal/CreateTodoModalContent";
import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { convertApiDurationToSeconds } from "@/utils/todo/todo-time";

// 목데이터: 실제 API 호출 없이 로컬 상태에만 즉시 반영한다.
const buildTodoFromRequest = (
  data: CreateTodoRequest,
  tag: CreateTodoTag,
): Todo => ({
  todoId: Date.now(),
  icon: data.icon,
  title: data.title,
  completed: false,
  durationSeconds: convertApiDurationToSeconds(data.duration),
  priority: data.priority ?? "MEDIUM",
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
  onCreate: (todo: Todo) => void;
}

export const useCreateTodoSubmit = ({
  onCreate,
}: UseCreateTodoSubmitParams) => {
  const handleSubmit = (data: CreateTodoRequest, tag: CreateTodoTag) => {
    onCreate(buildTodoFromRequest(data, tag));
  };

  return { handleSubmit };
};
