"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { ErrorType } from "@/api/client/custom-instance";
import type { ErrorDto } from "@/api/generated/models";

import { getGetHomeQueryKey } from "@/api/generated/endpoints/home/home";
import { useDeleteTodo } from "@/api/generated/endpoints/todo/todo";

export interface DeleteTodoSubmitHandlers {
  onSuccess: () => void;
  onError?: (error: ErrorType<ErrorDto>) => void;
}

export const useDeleteTodoSubmit = () => {
  const { mutate: deleteTodo } = useDeleteTodo();
  const queryClient = useQueryClient();

  const handleDelete = (
    todoId: number,
    { onSuccess, onError }: DeleteTodoSubmitHandlers,
  ) => {
    deleteTodo(
      { todoId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
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
