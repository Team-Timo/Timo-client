"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { ErrorDto } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import { getGetFocusTodoQueryKey } from "@/generated/endpoints/focus/focus";
import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/generated/endpoints/home/home";
import { useDeleteTodo } from "@/generated/endpoints/todo/todo";
import { useStatisticsQueryInvalidation } from "@/hooks/statistics/use-statistics-query-invalidation";

export interface DeleteTodoSubmitHandlers {
  onSuccess: () => void;
  onError?: (error: ErrorType<ErrorDto>) => void;
}

export const useDeleteTodoSubmit = () => {
  const { mutate: deleteTodo } = useDeleteTodo();
  const queryClient = useQueryClient();
  const { invalidateStatistics } = useStatisticsQueryInvalidation();

  const handleDelete = (
    todoId: number,
    { onSuccess, onError }: DeleteTodoSubmitHandlers,
  ) => {
    deleteTodo(
      { todoId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetTodayQueryKey() });
          invalidateStatistics();
          queryClient.invalidateQueries({
            queryKey: getGetFocusTodoQueryKey(),
          });
          onSuccess();
        },
        onError,
      },
    );
  };

  return {
    handleDelete,
  };
};
