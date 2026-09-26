"use client";

import type { ErrorDto } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import { useDeleteTodo } from "@/generated/endpoints/todo/todo";
import { useStatisticsQueryInvalidation } from "@/hooks/statistics/use-statistics-query-invalidation";
import { useTodoQueryInvalidation } from "@/hooks/todo/use-todo-query-invalidation";

export interface DeleteTodoSubmitHandlers {
  onSuccess: () => void;
  onError?: (error: ErrorType<ErrorDto>) => void;
}

export const useDeleteTodoSubmit = () => {
  const { mutate: deleteTodo } = useDeleteTodo();
  const { invalidateStatistics } = useStatisticsQueryInvalidation();
  const { invalidateHome, invalidateToday, invalidateFocus } =
    useTodoQueryInvalidation();

  const handleDelete = (
    todoId: number,
    { onSuccess, onError }: DeleteTodoSubmitHandlers,
  ) => {
    deleteTodo(
      { todoId },
      {
        onSuccess: () => {
          invalidateHome();
          invalidateToday();
          invalidateStatistics();
          invalidateFocus();
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
