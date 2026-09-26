"use client";

import { useEffect, useState } from "react";

import type { TodayTodo } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_types/today-type";
import type { ErrorDto } from "@/generated/models";
import type { ErrorType } from "@/http/custom-instance";

import {
  useChangeStatus,
  useStartTimer,
  useStopTimer,
} from "@/generated/endpoints/timer/timer";
import {
  useChangeSubtaskStatus,
  useChangeTodoStatus,
} from "@/generated/endpoints/todo/todo";
import { useActiveTimer } from "@/hooks/timer/use-active-timer";
import { useTimerQueryInvalidation } from "@/hooks/timer/use-timer-query-invalidation";
import { useTimeSidebarStore } from "@/stores/time-sidebar/useTimeSidebarStore";

export interface UseTodayTodoListOptions {
  onNeedStopConfirm: (todoId: number) => void;
  onTimerAlreadyRunning: () => void;
  onStopFeedback: (feedbackText: string | undefined) => void;
  onPlayError: (message: string | undefined) => void;
  onUpdateError: (message: string | undefined) => void;
}

export const useTodayTodoList = (
  initialTodos: TodayTodo[],
  {
    onNeedStopConfirm,
    onTimerAlreadyRunning,
    onStopFeedback,
    onPlayError,
    onUpdateError,
  }: UseTodayTodoListOptions,
) => {
  const [todos, setTodos] = useState<TodayTodo[]>(initialTodos);
  const openTimerPanel = useTimeSidebarStore((state) => state.openTimerPanel);
  const { data: activeTimer, isFetching: isActiveTimerFetching } =
    useActiveTimer();
  const {
    invalidateTimerProgress,
    invalidateTimerFinish,
    invalidateTimeBoxes,
    invalidateTodayView,
    invalidateFocusTodo,
    invalidateStatistics,
    invalidateTodoDetail,
  } = useTimerQueryInvalidation();
  const { mutate: changeTodoStatus } = useChangeTodoStatus({
    mutation: {
      onSuccess: (_data, variables) => {
        invalidateTodayView();
        invalidateTimeBoxes();
        invalidateFocusTodo();
        invalidateStatistics();
        invalidateTodoDetail(variables.todoId, variables.data.date);
      },
    },
  });
  const { mutate: changeSubtaskStatus } = useChangeSubtaskStatus();
  const { mutate: stopTimer } = useStopTimer();

  const { mutate: startTimer, isPending: isStartTimerPending } =
    useStartTimer();

  const { mutate: changeStatus, isPending: isChangeStatusPending } =
    useChangeStatus();

  const isTimerActionPending =
    isStartTimerPending || isChangeStatusPending || isActiveTimerFetching;

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

  const handleToggleCompleted = (todoId: number, completed: boolean) => {
    const dateKey = todos.find((todo) => todo.todoId === todoId)?.date;
    if (!dateKey) return;

    if (
      completed &&
      activeTimer?.todoId === todoId &&
      activeTimer.date === dateKey
    ) {
      onNeedStopConfirm(todoId);
      return;
    }

    const previous = todos;
    updateTodo(todoId, (todo) => ({ ...todo, completed }));

    changeTodoStatus(
      { todoId, data: { isCompleted: completed, date: dateKey } },
      {
        onError: (error: ErrorType<ErrorDto>) => {
          setTodos(previous);
          onUpdateError(error.response?.data.message);
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
          invalidateTimerFinish(todoId);

          updateTodo(todoId, (todo) => ({ ...todo, completed: true }));
          changeTodoStatus({
            todoId,
            data: { isCompleted: true, date: dateKey },
          });
        },
      },
    );
  };

  const handlePlay = (todoId: number) => {
    if (isTimerActionPending) return;

    const dateKey = todos.find((todo) => todo.todoId === todoId)?.date;
    if (!dateKey) return;

    const willRun =
      todos.find((todo) => todo.todoId === todoId)?.timerStatus !== "RUNNING";

    if (willRun) {
      openTimerPanel();
    }

    if (
      activeTimer &&
      activeTimer.todoId === todoId &&
      activeTimer.date === dateKey
    ) {
      changeStatus(
        {
          timerId: activeTimer.timerId,
          data: {
            action: activeTimer.status === "RUNNING" ? "PAUSE" : "RESUME",
          },
        },
        {
          onSuccess: () =>
            invalidateTimerProgress({ includeFocus: true, todoId }),
        },
      );
      return;
    }

    // 다른 투두의 타이머가 이미 실행/일시정지 중이면 새 타이머를 시작할 수 없다(409)
    if (activeTimer) {
      onTimerAlreadyRunning();
      return;
    }

    startTimer(
      { todoId, params: { date: dateKey } },
      {
        onSuccess: () =>
          invalidateTimerProgress({ includeFocus: true, todoId }),
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
      {
        todoId,
        subtaskId,
        data: { isCompleted: completed },
        params: { date: dateKey },
      },
      {
        onSuccess: () => {
          invalidateTodayView();
          invalidateTodoDetail(todoId, dateKey);
          invalidateFocusTodo();
        },
        onError: (error: ErrorType<ErrorDto>) => {
          setTodos(previous);
          onUpdateError(error.response?.data.message);
        },
      },
    );
  };

  return {
    todos,
    activeTimer,
    isTimerActionPending,
    handlePlay,
    handleToggleCompleted,
    handleDelete,
    handleSubTodoCheck,
    confirmStopAndComplete,
  };
};
