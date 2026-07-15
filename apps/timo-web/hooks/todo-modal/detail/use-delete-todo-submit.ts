"use client";

import { useQueryClient } from "@tanstack/react-query";

import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/api/generated/endpoints/home/home";
import { useDeleteTodo } from "@/api/generated/endpoints/todo/todo";

export interface DeleteTodoSubmitHandlers {
  onSuccess: () => void;
  onError?: () => void;
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
          queryClient.invalidateQueries({ queryKey: getGetTodayQueryKey() });
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
