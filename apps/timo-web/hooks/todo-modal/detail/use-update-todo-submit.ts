"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import type { TodoUpdateRequest } from "@/api/generated/models";

import { getGetHomeQueryKey } from "@/api/generated/endpoints/home/home";
import {
  getGetTodoDetailQueryKey,
  useUpdateTodo,
} from "@/api/generated/endpoints/todo/todo";

export interface UpdateTodoSubmitParams {
  todoId: number;
  date: string;
  data: TodoUpdateRequest;
}

export const useUpdateTodoSubmit = () => {
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const { mutate: updateTodo } = useUpdateTodo();
  const queryClient = useQueryClient();

  const handleUpdate = ({ todoId, date, data }: UpdateTodoSubmitParams) => {
    updateTodo(
      { todoId, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
          queryClient.invalidateQueries({
            queryKey: getGetTodoDetailQueryKey(todoId, { date }),
          });
        },
        onError: () => {
          setIsErrorToastOpen(true);
        },
      },
    );
  };

  return {
    handleUpdate,
    isErrorToastOpen,
    closeErrorToast: () => setIsErrorToastOpen(false),
  };
};
