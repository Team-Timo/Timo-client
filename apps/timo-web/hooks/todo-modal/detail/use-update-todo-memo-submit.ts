"use client";

import type { ErrorDto } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import { useUpdateMemo } from "@/generated/endpoints/todo/todo";
import { useTodoQueryInvalidation } from "@/hooks/todo/use-todo-query-invalidation";

export interface UpdateTodoMemoSubmitParams {
  todoId: number;
  date: string;
  memo: string;
}

export interface UpdateTodoMemoSubmitHandlers {
  onSuccess?: () => void;
  onError?: (error: ErrorType<ErrorDto>) => void;
}

export const useUpdateTodoMemoSubmit = () => {
  const { mutateAsync: updateMemo } = useUpdateMemo();
  const {
    invalidateTodoDetail,
    invalidateFocus,
    invalidateToday,
    invalidateHome,
  } = useTodoQueryInvalidation();

  const handleUpdateMemo = (
    { todoId, date, memo }: UpdateTodoMemoSubmitParams,
    { onSuccess, onError }: UpdateTodoMemoSubmitHandlers = {},
  ) => {
    void updateMemo({ todoId, data: { memo }, params: { date } }).then(
      () => {
        invalidateTodoDetail(todoId, date);
        invalidateFocus();
        invalidateToday();
        invalidateHome();
        onSuccess?.();
      },
      (error: ErrorType<ErrorDto>) => onError?.(error),
    );
  };

  return {
    handleUpdateMemo,
  };
};
