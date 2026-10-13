"use client";

import type { ErrorDto, TodoUpdateRequest } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import { useUpdateTodo } from "@/generated/endpoints/todo/todo";
import { useStatisticsQueryInvalidation } from "@/hooks/statistics/use-statistics-query-invalidation";
import { useTodoQueryInvalidation } from "@/hooks/todo/use-todo-query-invalidation";

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
  const { mutateAsync: updateTodo } = useUpdateTodo();
  const { invalidateStatistics } = useStatisticsQueryInvalidation();
  const {
    invalidateHome,
    invalidateToday,
    invalidateTodoDetail,
    invalidateFocus,
  } = useTodoQueryInvalidation();

  const handleUpdate = (
    { todoId, date, data }: UpdateTodoSubmitParams,
    { onSuccess, onError }: UpdateTodoSubmitHandlers = {},
  ) => {
    void updateTodo({ todoId, data }).then(
      () => {
        invalidateHome();
        invalidateToday();
        invalidateTodoDetail(todoId, date);
        invalidateStatistics();
        invalidateFocus();
        onSuccess?.();
      },
      (error: ErrorType<ErrorDto>) => onError?.(error),
    );
  };

  return {
    handleUpdate,
  };
};
