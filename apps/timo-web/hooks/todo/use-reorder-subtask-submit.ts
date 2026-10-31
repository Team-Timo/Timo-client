"use client";

import type { ErrorDto } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import { useReorderSubtask } from "@/generated/endpoints/todo/todo";
import { useTodoQueryInvalidation } from "@/hooks/todo/use-todo-query-invalidation";

export interface ReorderSubtaskSubmitParams {
  todoId: number;
  subtaskId: number;
  date: string;
  newIndex: number;
}

export interface ReorderSubtaskSubmitHandlers {
  onSuccess?: () => void;
  onError?: (error: ErrorType<ErrorDto>) => void;
}

export const useReorderSubtaskSubmit = () => {
  const { mutate: reorderSubtask } = useReorderSubtask();
  const {
    invalidateHome,
    invalidateToday,
    invalidateTodoDetail,
    invalidateFocus,
  } = useTodoQueryInvalidation();

  const handleReorder = (
    { todoId, subtaskId, date, newIndex }: ReorderSubtaskSubmitParams,
    { onSuccess, onError }: ReorderSubtaskSubmitHandlers = {},
  ) => {
    reorderSubtask(
      { todoId, subtaskId, data: { newIndex, date } },
      {
        onSuccess: () => {
          invalidateHome();
          invalidateToday();
          invalidateTodoDetail(todoId, date);
          invalidateFocus();
          onSuccess?.();
        },
        onError,
      },
    );
  };

  return {
    handleReorder,
  };
};
