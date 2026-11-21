"use client";

import { useTodoQueryInvalidation } from "@/hooks/todo/use-todo-query-invalidation";

export const useCalendarQueryInvalidation = () => {
  const {
    invalidateHome,
    invalidateToday,
    invalidateFocus,
    removeAllTodoDetails,
  } = useTodoQueryInvalidation();

  return () => {
    invalidateHome();
    invalidateToday();
    invalidateFocus();
    removeAllTodoDetails();
  };
};
