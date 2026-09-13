"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { ErrorDto } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import { getGetFocusTodoQueryKey } from "@/generated/endpoints/focus/focus";
import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/generated/endpoints/home/home";
import {
  getGetTodoDetailQueryKey,
  useUpdateMemo,
} from "@/generated/endpoints/todo/todo";
import { useStatisticsQueryInvalidation } from "@/hooks/statistics/use-statistics-query-invalidation";

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
  const queryClient = useQueryClient();
  const { invalidateStatistics } = useStatisticsQueryInvalidation();

  const handleUpdateMemo = (
    { todoId, date, memo }: UpdateTodoMemoSubmitParams,
    { onSuccess, onError }: UpdateTodoMemoSubmitHandlers = {},
  ) => {
    updateMemo(
      { todoId, data: { memo }, params: { date } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetTodayQueryKey() });
          queryClient.invalidateQueries({
            queryKey: getGetTodoDetailQueryKey(todoId, { date }),
          });
          invalidateStatistics();
          queryClient.invalidateQueries({
            queryKey: getGetFocusTodoQueryKey(),
          });
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
