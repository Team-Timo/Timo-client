"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { ErrorDto } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/generated/endpoints/home/home";
import {
  getGetTodoDetailQueryKey,
  useChangeSubtaskStatus,
} from "@/generated/endpoints/todo/todo";

export interface ToggleSubtaskSubmitParams {
  todoId: number;
  subtaskId: number;
  date: string;
  completed: boolean;
}

export interface ToggleSubtaskSubmitHandlers {
  onSuccess?: () => void;
  onError?: (error: ErrorType<ErrorDto>) => void;
}

export const useToggleSubtaskSubmit = () => {
  const { mutate: changeSubtaskStatus } = useChangeSubtaskStatus();
  const queryClient = useQueryClient();

  const handleToggle = (
    { todoId, subtaskId, date, completed }: ToggleSubtaskSubmitParams,
    { onSuccess, onError }: ToggleSubtaskSubmitHandlers = {},
  ) => {
    changeSubtaskStatus(
      {
        todoId,
        subtaskId,
        data: { isCompleted: completed },
        params: { date },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetTodayQueryKey() });
          queryClient.invalidateQueries({
            queryKey: getGetTodoDetailQueryKey(todoId, { date }),
          });
          onSuccess?.();
        },
        onError,
      },
    );
  };

  return {
    handleToggle,
  };
};
