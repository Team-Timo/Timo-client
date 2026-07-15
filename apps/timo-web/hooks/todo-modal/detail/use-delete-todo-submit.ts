"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { ErrorType } from "@/api/client/custom-instance";
import type { ErrorDto } from "@/api/generated/models";

import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/api/generated/endpoints/home/home";
import { useDeleteTodo } from "@/api/generated/endpoints/todo/todo";
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
