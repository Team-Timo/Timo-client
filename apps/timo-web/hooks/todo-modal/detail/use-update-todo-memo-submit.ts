"use client";

import type { ErrorDto } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import { useUpdateMemo } from "@/generated/endpoints/todo/todo";
import { useStatisticsQueryInvalidation } from "@/hooks/statistics/use-statistics-query-invalidation";
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
  const { mutate: updateMemo } = useUpdateMemo();
  const { invalidateStatistics } = useStatisticsQueryInvalidation();
  const {
    invalidateHome,
    invalidateToday,
    invalidateTodoDetail,
    invalidateFocus,
  } = useTodoQueryInvalidation();

  const handleUpdateMemo = (
    { todoId, date, memo }: UpdateTodoMemoSubmitParams,
    { onSuccess, onError }: UpdateTodoMemoSubmitHandlers = {},
  ) => {
    updateMemo(
      { todoId, data: { memo }, params: { date } },
      {
        onSuccess: () => {
          invalidateHome();
          invalidateToday();
          invalidateTodoDetail(todoId, date);
          invalidateStatistics();
          invalidateFocus();
          onSuccess?.();
        },
        onError,
      },
    );
  };

  return {
    handleUpdateMemo,
  };
};
