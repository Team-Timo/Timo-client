"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import type { CreateTodoRequest } from "@/api/common/todo-schema";
import type { TodoCreateRequest } from "@/api/generated/models";

import { todoCreateResponseSchema } from "@/api/common/todo-schema";
import { getGetHomeQueryKey } from "@/api/generated/endpoints/home/home";
import { useCreateTodo } from "@/api/generated/endpoints/todo/todo";

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

  const handleSubmit = (data: CreateTodoRequest) => {
    createTodo(
      { data: buildCreateTodoRequestBody(data) },
      {
        onSuccess: (response) => {
          const parsed = todoCreateResponseSchema.safeParse(response.data);

          if (!parsed.success) {
            setIsErrorToastOpen(true);
            return;
          }

          queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
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
