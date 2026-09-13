"use client";

import type { ErrorDto } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import { useChangeSubtaskStatus } from "@/generated/endpoints/todo/todo";
import { useTodoQueryInvalidation } from "@/hooks/todo/use-todo-query-invalidation";

export interface ToggleSubtaskSubmitParams {
  todoId: number;
  subtaskId: number;
  date: string;
  completed: boolean;
}

export interface ToggleSubtaskSubmitHandlers {
  onSuccess?: () => void;
  onError?: (error: ErrorType<ErrorDto>) => void;
}

export const useToggleSubtaskSubmit = () => {
  const { mutate: changeSubtaskStatus } = useChangeSubtaskStatus();
  const { invalidateHome, invalidateToday, invalidateTodoDetail } =
    useTodoQueryInvalidation();

  const handleToggle = (
    { todoId, subtaskId, date, completed }: ToggleSubtaskSubmitParams,
    { onSuccess, onError }: ToggleSubtaskSubmitHandlers = {},
  ) => {
    changeSubtaskStatus(
      {
        todoId,
        subtaskId,
        data: { isCompleted: completed },
        params: { date },
      },
      {
        onSuccess: () => {
          invalidateHome();
          invalidateToday();
          invalidateTodoDetail(todoId, date);
          onSuccess?.();
        },
        onError,
      },
    );
  };

  return {
    handleToggle,
  };
};
