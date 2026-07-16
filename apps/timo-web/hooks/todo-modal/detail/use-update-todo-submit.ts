"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { ErrorType } from "@/api/client/custom-instance";
import type { ErrorDto, TodoUpdateRequest } from "@/api/generated/models";

import { getGetFocusTodoQueryKey } from "@/api/generated/endpoints/focus/focus";
import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/api/generated/endpoints/home/home";
import {
  getGetTodoDetailQueryKey,
  useUpdateTodo,
} from "@/api/generated/endpoints/todo/todo";

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
