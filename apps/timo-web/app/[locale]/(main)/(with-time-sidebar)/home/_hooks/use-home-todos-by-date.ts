"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { ApiError } from "@/api/error/api-error";
import type { HomeViewDay } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";
import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { getGetFocusTodoQueryKey } from "@/api/generated/endpoints/focus/focus";
import {
  useChangeStatus,
  useStartTimer,
  useStopTimer,
} from "@/api/generated/endpoints/timer/timer";
import {
  getGetTodoDetailQueryKey,
  useChangeSubtaskStatus,
  useChangeTodoStatus,
  useReorderTodo,
} from "@/api/generated/endpoints/todo/todo";
import { reorderTodos } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/todo-order";
import { useActiveTimer } from "@/hooks/timer/use-active-timer";
import { useTimerQueryInvalidation } from "@/hooks/timer/use-timer-query-invalidation";
import { useTimeSidebarStore } from "@/stores/time-sidebar/useTimeSidebarStore";

export interface UseHomeTodosByDateOptions {
  onNeedStopConfirm: (dateKey: string, todoId: number) => void;
  onTimerAlreadyRunning: () => void;
  onStopFeedback: (feedbackText: string | undefined) => void;
  onPlayError: (message: string | undefined) => void;
}

export const useHomeTodosByDate = (
  apiDays: HomeViewDay[],
  {
    onNeedStopConfirm,
    onTimerAlreadyRunning,
    onStopFeedback,
    onPlayError,
  }: UseHomeTodosByDateOptions,
) => {
  const [todosByDate, setTodosByDate] = useState<Record<string, Todo[]>>({});
  const openTimerPanel = useTimeSidebarStore((state) => state.openTimerPanel);
  const queryClient = useQueryClient();
  const { data: activeTimer } = useActiveTimer();
  const { mutate: changeTodoStatus } = useChangeTodoStatus();
  const { mutate: changeSubtaskStatus } = useChangeSubtaskStatus();
  const { mutate: reorderTodo } = useReorderTodo();
  const { mutate: stopTimer } = useStopTimer();
  const { invalidateHomeView, invalidateTimerState, invalidateTimeBoxes } =
    useTimerQueryInvalidation();

  const invalidateFocusTodo = () => {
    queryClient.invalidateQueries({ queryKey: getGetFocusTodoQueryKey() });
  };

  const { mutate: startTimer } = useStartTimer<ApiError>({
    mutation: {
      onSuccess: () => {
        invalidateTimerState();
        invalidateFocusTodo();
      },
    },
  });
  const { mutate: changeStatus } = useChangeStatus({
    mutation: {
      onSuccess: () => {
        invalidateTimerState();
        invalidateFocusTodo();
      },
    },
  });

  useEffect(() => {
    setTodosByDate(
      Object.fromEntries(apiDays.map((day) => [day.date, day.todos])),
    );
  }, [apiDays]);

  const updateTodo = (
    dateKey: string,
    todoId: number,
    updater: (todo: Todo) => Todo,
  ) => {
    setTodosByDate((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] ?? []).map((todo) =>
        todo.todoId === todoId ? updater(todo) : todo,
      ),
    }));
  };

  const invalidateHomeAndFocus = () => {
    invalidateHomeView();
    invalidateFocusTodo();
  };
  const invalidateTodoDetail = (dateKey: string, todoId: number) => {
    queryClient.invalidateQueries({
      queryKey: getGetTodoDetailQueryKey(todoId, { date: dateKey }),
    });
  };

  const handleToggleCompleted = (
    dateKey: string,
    todoId: number,
    completed: boolean,
  ) => {
    if (completed && activeTimer?.todoId === todoId) {
      onNeedStopConfirm(dateKey, todoId);
      return;
    }

    const previous = todosByDate[dateKey] ?? [];
    updateTodo(dateKey, todoId, (todo) => ({ ...todo, completed }));

    changeTodoStatus(
      { todoId, data: { isCompleted: completed, date: dateKey } },
      {
        onSuccess: () => {
          invalidateHomeAndFocus();
          invalidateTimeBoxes();
          invalidateTodoDetail(dateKey, todoId);
        },
        onError: () => {
          setTodosByDate((prev) => ({ ...prev, [dateKey]: previous }));
        },
      },
    );
  };

  const confirmStopAndComplete = (dateKey: string, todoId: number) => {
    if (!activeTimer) return;

    stopTimer(
      { timerId: activeTimer.timerId },
      {
        onSuccess: (response) => {
          onStopFeedback(response.data?.aiFeedback ?? undefined);
          invalidateTimerState();

          updateTodo(dateKey, todoId, (todo) => ({
            ...todo,
            completed: true,
          }));
          changeTodoStatus(
            { todoId, data: { isCompleted: true, date: dateKey } },
            {
              onSuccess: () => {
                invalidateHomeAndFocus();
                invalidateTodoDetail(dateKey, todoId);
              },
            },
          );
        },
      },
    );
  };

  const handleTogglePlay = (dateKey: string, todoId: number) => {
    const willRun =
      todosByDate[dateKey]?.find((todo) => todo.todoId === todoId)
        ?.timerStatus !== "RUNNING";

    if (willRun) {
      openTimerPanel();
    }

    if (activeTimer && activeTimer.todoId === todoId) {
      changeStatus(
        {
          timerId: activeTimer.timerId,
          data: {
            action: activeTimer.status === "RUNNING" ? "PAUSE" : "RESUME",
          },
        },
        { onSuccess: () => invalidateTodoDetail(dateKey, todoId) },
      );
      return;
    }

    // 다른 투두의 타이머가 이미 실행/일시정지 중이면 새 타이머를 시작할 수 없다(409)
    if (activeTimer) {
      onTimerAlreadyRunning();
      return;
    }

    startTimer(
      { todoId },
      {
        onSuccess: () => invalidateTodoDetail(dateKey, todoId),
        onError: (error: ApiError) => {
          onPlayError(error.message);
        },
      },
    );
  };

  const handleToggleSubtaskCompleted = (
    dateKey: string,
    todoId: number,
    subtaskId: number,
    completed: boolean,
  ) => {
    const previous = todosByDate[dateKey] ?? [];
    updateTodo(dateKey, todoId, (todo) => ({
      ...todo,
      subtasks: todo.subtasks.map((subtask) =>
        subtask.subtaskId === subtaskId ? { ...subtask, completed } : subtask,
      ),
    }));

    changeSubtaskStatus(
      { todoId, subtaskId, data: { isCompleted: completed } },
      {
        onSuccess: () => {
          invalidateHomeAndFocus();
          invalidateTimeBoxes();
          invalidateTodoDetail(dateKey, todoId);
        },
        onError: () => {
          setTodosByDate((prev) => ({ ...prev, [dateKey]: previous }));
        },
      },
    );
  };

  const handleDeleteTodo = (dateKey: string, todoId: number) => {
    // TODO: API
    setTodosByDate((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] ?? []).filter((todo) => todo.todoId !== todoId),
    }));
  };

  const handleReorderTodo = (
    dateKey: string,
    fromIndex: number,
    toIndex: number,
  ) => {
    const previous = todosByDate[dateKey] ?? [];
    const movedTodo = previous[fromIndex];
    if (!movedTodo || movedTodo.completed) {
      return;
    }

    const reordered = reorderTodos(previous, fromIndex, toIndex);
    setTodosByDate((prev) => ({ ...prev, [dateKey]: reordered }));

    reorderTodo(
      { todoId: movedTodo.todoId, data: { newIndex: toIndex, date: dateKey } },
      {
        onSuccess: invalidateHomeAndFocus,
        onError: () => {
          setTodosByDate((prev) => ({ ...prev, [dateKey]: previous }));
        },
      },
    );
  };

  return {
    todosByDate,
    activeTimer,
    handleToggleCompleted,
    handleTogglePlay,
    handleToggleSubtaskCompleted,
    handleDeleteTodo,
    handleReorderTodo,
    confirmStopAndComplete,
  };
};
