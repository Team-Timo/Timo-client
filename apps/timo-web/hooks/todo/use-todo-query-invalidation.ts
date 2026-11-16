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

  // 상세 폼은 처음 받은 데이터로만 초기화되므로, 갱신 대신 캐시를 지워 다음에 열 때 새로 불러오게 합니다.
  const removeAllTodoDetails = () => {
    queryClient.removeQueries({
      predicate: ({ queryKey }) =>
        typeof queryKey[0] === "string" &&
        queryKey[0].startsWith("/api/v1/todos/"),
    });
  };

  const invalidateFocus = () => {
    queryClient.invalidateQueries({ queryKey: getGetFocusTodoQueryKey() });
  };

  return {
    invalidateHome,
    invalidateToday,
    invalidateTodoDetail,
    removeAllTodoDetails,
    invalidateFocus,
  };
};
