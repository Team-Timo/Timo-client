"use client";

import { useState } from "react";

import type { TodoCreateRequest } from "@/api/generated/models";
import type { CreateTodoRequest } from "@/api/todo/todo-schema";
import type { CreateTodoTag } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/todo-modal/CreateTodoModalContent";
import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { useCreateTodo } from "@/api/generated/endpoints/todo/todo";
import { todoCreateResponseSchema } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";
import { convertApiDurationToSeconds } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/todo-time";

const buildCreateTodoRequestBody = (
  data: CreateTodoRequest,
): TodoCreateRequest => ({
  icon: data.icon ?? undefined,
  title: data.title,
  subtasks: data.subtasks?.length ? data.subtasks : undefined,
  date: data.date,
  duration: data.duration,
  priority: data.priority ?? undefined,
  tagId: data.tagId ?? undefined,
  repeatType: data.repeatType,
  repeatWeekdays: data.repeatWeekdays?.length ? data.repeatWeekdays : undefined,
  repeatDayOfMonth: data.repeatDayOfMonth ?? undefined,
  memo: data.memo?.trim() ? data.memo : undefined,
});

const buildTodoFromCreated = (
  todoId: number,
  data: CreateTodoRequest,
  tag: CreateTodoTag,
): Todo => ({
  todoId,
  icon: data.icon ?? undefined,
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
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const { mutate: createTodo } = useCreateTodo();

  const handleSubmit = (data: CreateTodoRequest, tag: CreateTodoTag) => {
    createTodo(
      { data: buildCreateTodoRequestBody(data) },
      {
        onSuccess: (response) => {
          const parsed = todoCreateResponseSchema.safeParse(response.data);

          if (!parsed.success) {
            setIsErrorToastOpen(true);
            return;
          }

          onCreate(buildTodoFromCreated(parsed.data.todoId, data, tag));
        },
        onError: () => {
          setIsErrorToastOpen(true);
        },
      },
    );
  };

  return {
    handleSubmit,
    isErrorToastOpen,
    closeErrorToast: () => setIsErrorToastOpen(false),
  };
};
