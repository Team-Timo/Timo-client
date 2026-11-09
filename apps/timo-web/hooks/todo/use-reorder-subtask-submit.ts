"use client";

import type { ErrorDto } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import { useReorderSubtask } from "@/generated/endpoints/todo/todo";
import { useTodoQueryInvalidation } from "@/hooks/todo/use-todo-query-invalidation";

export interface ReorderSubtaskSubmitParams {
  todoId: number;
  subtaskId: number;
  date: string;
  newIndex: number;
}

export interface ReorderSubtaskSubmitHandlers {
  onSuccess?: () => void;
  onError?: (error: ErrorType<ErrorDto>) => void;
}

export const useReorderSubtaskSubmit = () => {
  const {
    invalidateHome,
    invalidateToday,
    invalidateTodoDetail,
    invalidateFocus,
  } = useTodoQueryInvalidation();
  // 연속 재정렬 시 이전 호출의 mutate 콜백은 실행되지 않으므로 무효화는 mutation 옵션에서 처리합니다.
  const { mutate: reorderSubtask } = useReorderSubtask({
    mutation: {
      onSuccess: (_data, { todoId, data }) => {
        invalidateHome();
        invalidateToday();
        if (data.date) invalidateTodoDetail(todoId, data.date);
        invalidateFocus();
      },
    },
  });

  const handleReorder = (
    { todoId, subtaskId, date, newIndex }: ReorderSubtaskSubmitParams,
    { onSuccess, onError }: ReorderSubtaskSubmitHandlers = {},
  ) => {
    reorderSubtask(
      { todoId, subtaskId, data: { newIndex, date } },
      {
        onSuccess,
        onError,
      },
    );
  };

  return {
    handleReorder,
  };
};
