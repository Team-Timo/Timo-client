"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { ErrorDto, TodoUpdateRequest } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import { getGetFocusTodoQueryKey } from "@/generated/endpoints/focus/focus";
import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/generated/endpoints/home/home";
import {
  getGetTodoDetailQueryKey,
  useUpdateTodo,
} from "@/generated/endpoints/todo/todo";
import { useStatisticsQueryInvalidation } from "@/hooks/statistics/use-statistics-query-invalidation";

export interface UpdateTodoSubmitParams {
  todoId: number;
  date: string;
  data: TodoUpdateRequest;
}

export interface UpdateTodoSubmitHandlers {
  onSuccess?: () => void;
  onError?: (error: ErrorType<ErrorDto>) => void;
}

export const useUpdateTodoSubmit = () => {
  const { mutate: updateTodo } = useUpdateTodo();
  const queryClient = useQueryClient();
  const { invalidateStatistics } = useStatisticsQueryInvalidation();

  const handleUpdate = (
    { todoId, date, data }: UpdateTodoSubmitParams,
    { onSuccess, onError }: UpdateTodoSubmitHandlers = {},
  ) => {
    updateTodo(
      { todoId, data },
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
    handleUpdate,
  };
};
