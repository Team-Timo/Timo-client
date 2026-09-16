"use client";

import { useQueryClient } from "@tanstack/react-query";

import { getGetFocusTodoQueryKey } from "@/generated/endpoints/focus/focus";
import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/generated/endpoints/home/home";
import { getGetTodoDetailQueryKey } from "@/generated/endpoints/todo/todo";

export const useTodoQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateHome = () => {
    queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
  };

  const invalidateToday = () => {
    queryClient.invalidateQueries({ queryKey: getGetTodayQueryKey() });
  };

  const invalidateTodoDetail = (todoId: number, date: string) => {
    queryClient.invalidateQueries({
      queryKey: getGetTodoDetailQueryKey(todoId, { date }),
    });
  };

  const invalidateFocus = () => {
    queryClient.invalidateQueries({ queryKey: getGetFocusTodoQueryKey() });
  };

  return {
    invalidateHome,
    invalidateToday,
    invalidateTodoDetail,
    invalidateFocus,
  };
};
