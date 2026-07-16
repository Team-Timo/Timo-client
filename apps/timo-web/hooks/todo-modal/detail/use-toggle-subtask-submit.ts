"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { ErrorType } from "@/api/client/custom-instance";
import type { ErrorDto } from "@/api/generated/models";

import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/api/generated/endpoints/home/home";
import {
  getGetTodoDetailQueryKey,
  useChangeSubtaskStatus,
} from "@/api/generated/endpoints/todo/todo";

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
      { todoId, subtaskId, data: { isCompleted: completed } },
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
