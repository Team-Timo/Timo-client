"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import type { TodoCreateRequest } from "@/api/generated/models";
import type { CreateTodoRequest } from "@/schemas/todo/todo-schema";

import { getGetTodayQueryKey } from "@/api/generated/endpoints/home/home";
import { useCreateTodo } from "@/api/generated/endpoints/todo/todo";
import { useStatisticsQueryInvalidation } from "@/hooks/statistics/use-statistics-query-invalidation";

const buildCreateTodoRequestBody = (
  data: CreateTodoRequest,
): TodoCreateRequest => ({
  icon: data.icon ?? undefined,
  title: data.title,
  subtasks: data.subtasks?.length ? data.subtasks : undefined,
  date: data.date,
  duration: data.duration,
  priority: data.priority ?? undefined,
  tagId: data.tagId ?? undefined,
  repeatType: data.repeatType,
  repeatWeekdays: data.repeatWeekdays?.length ? data.repeatWeekdays : undefined,
  repeatDayOfMonth: data.repeatDayOfMonth ?? undefined,
  memo: data.memo?.trim() ? data.memo : undefined,
});

export const useCreateTodoSubmit = () => {
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const { mutate: createTodo } = useCreateTodo();
  const queryClient = useQueryClient();
  const { invalidateStatistics } = useStatisticsQueryInvalidation();

  const handleSubmit = (data: CreateTodoRequest) => {
    createTodo(
      { data: buildCreateTodoRequestBody(data) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetTodayQueryKey() });
          invalidateStatistics();
        },
        onError: () => {
          setIsErrorToastOpen(true);
        },
      },
    );
  };

  return {
    handleSubmit,
    isErrorToastOpen,
    closeErrorToast: () => setIsErrorToastOpen(false),
  };
};
