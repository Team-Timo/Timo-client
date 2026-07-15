"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { ErrorType } from "@/api/client/custom-instance";
import type { ErrorDto } from "@/api/generated/models";
import type { TodayTodo } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_types/today-type";

import { getGetTodayQueryKey } from "@/api/generated/endpoints/home/home";
import {
  useChangeStatus,
  useStartTimer,
  useStopTimer,
} from "@/api/generated/endpoints/timer/timer";
import {
  getGetTodoDetailQueryKey,
  useChangeSubtaskStatus,
  useChangeTodoStatus,
} from "@/api/generated/endpoints/todo/todo";
import { useActiveTimer } from "@/hooks/timer/use-active-timer";
import { useTimerQueryInvalidation } from "@/hooks/timer/use-timer-query-invalidation";
import { useTimeSidebarStore } from "@/stores/time-sidebar/useTimeSidebarStore";

export interface UseTodayTodoListOptions {
  onNeedStopConfirm: (todoId: number) => void;
  onTimerAlreadyRunning: () => void;
  onStopFeedback: (feedbackText: string | undefined) => void;
  onPlayError: (message: string | undefined) => void;
}

export const useTodayTodoList = (
  initialTodos: TodayTodo[],
  {
    onNeedStopConfirm,
    onTimerAlreadyRunning,
    onStopFeedback,
    onPlayError,
  }: UseTodayTodoListOptions,
) => {
  const [todos, setTodos] = useState<TodayTodo[]>(initialTodos);
  const openTimerPanel = useTimeSidebarStore((state) => state.openTimerPanel);
  const queryClient = useQueryClient();
  const { data: activeTimer } = useActiveTimer();
  const { mutate: changeTodoStatus } = useChangeTodoStatus();
  const { mutate: changeSubtaskStatus } = useChangeSubtaskStatus();
  const { mutate: stopTimer } = useStopTimer();
  const { invalidateTimerState, invalidateTimeBoxes } =
    useTimerQueryInvalidation();

  const { mutate: startTimer } = useStartTimer({
    mutation: { onSuccess: invalidateTimerState },
  });
  const { mutate: changeStatus } = useChangeStatus({
    mutation: { onSuccess: invalidateTimerState },
  });

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const updateTodo = (
    todoId: number,
    updater: (todo: TodayTodo) => TodayTodo,
  ) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.todoId === todoId ? updater(todo) : todo)),
    );
  };

  const invalidateTodayView = () => {
    queryClient.invalidateQueries({ queryKey: getGetTodayQueryKey() });
  };
  const invalidateTodoDetail = (todoId: number, dateKey: string) => {
    queryClient.invalidateQueries({
      queryKey: getGetTodoDetailQueryKey(todoId, { date: dateKey }),
    });
  };

  const handleToggleCompleted = (todoId: number, completed: boolean) => {
    if (completed && activeTimer?.todoId === todoId) {
      onNeedStopConfirm(todoId);
      return;
    }

    const dateKey = todos.find((todo) => todo.todoId === todoId)?.date;
    if (!dateKey) return;

    const previous = todos;
    updateTodo(todoId, (todo) => ({ ...todo, completed }));

    changeTodoStatus(
      { todoId, data: { isCompleted: completed, date: dateKey } },
      {
        onSuccess: () => {
          invalidateTodayView();
          invalidateTimeBoxes();
          invalidateTodoDetail(todoId, dateKey);
        },
        onError: () => {
          setTodos(previous);
        },
      },
    );
  };

  const confirmStopAndComplete = (todoId: number) => {
    if (!activeTimer) return;

    const dateKey = todos.find((todo) => todo.todoId === todoId)?.date;
    if (!dateKey) return;

    stopTimer(
      { timerId: activeTimer.timerId },
      {
        onSuccess: (response) => {
          onStopFeedback(response.data?.aiFeedback ?? undefined);
          invalidateTimerState();

          updateTodo(todoId, (todo) => ({ ...todo, completed: true }));
          changeTodoStatus(
            { todoId, data: { isCompleted: true, date: dateKey } },
            {
              onSuccess: () => {
                invalidateTodayView();
                invalidateTodoDetail(todoId, dateKey);
              },
            },
          );
        },
      },
    );
  };

  const handlePlay = (todoId: number) => {
    const dateKey = todos.find((todo) => todo.todoId === todoId)?.date;
    if (!dateKey) return;

    const willRun =
      todos.find((todo) => todo.todoId === todoId)?.timerStatus !== "RUNNING";

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
        { onSuccess: () => invalidateTodoDetail(todoId, dateKey) },
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
        onSuccess: () => invalidateTodoDetail(todoId, dateKey),
        onError: (error: ErrorType<ErrorDto>) => {
          onPlayError(error.response?.data.message);
        },
      },
    );
  };

  const handleDelete = (todoId: number) => {
    // TODO: API
    setTodos((prev) => prev.filter((todo) => todo.todoId !== todoId));
  };

  const handleSubTodoCheck = (todoId: number, subtaskId: number) => {
    const todo = todos.find((t) => t.todoId === todoId);
    const subtask = todo?.subtasks.find((s) => s.subtaskId === subtaskId);
    if (!subtask) return;

    const completed = !subtask.completed;
    const dateKey = todo?.date;
    if (!dateKey) return;

    const previous = todos;
    setTodos((prev) =>
      prev.map((t) =>
        t.todoId === todoId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.subtaskId === subtaskId ? { ...s, completed } : s,
              ),
            }
          : t,
      ),
    );

    changeSubtaskStatus(
      { todoId, subtaskId, data: { isCompleted: completed } },
      {
        onSuccess: () => {
          invalidateTodayView();
          invalidateTodoDetail(todoId, dateKey);
        },
        onError: () => {
          setTodos(previous);
        },
      },
    );
  };

  return {
    todos,
    activeTimer,
    handlePlay,
    handleToggleCompleted,
    handleDelete,
    handleSubTodoCheck,
    confirmStopAndComplete,
  };
};
