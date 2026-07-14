"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { HomeViewDay } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";
import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { getGetHomeQueryKey } from "@/api/generated/endpoints/home/home";
import {
  useChangeSubtaskStatus,
  useChangeTodoStatus,
  useReorderTodo,
} from "@/api/generated/endpoints/todo/todo";
import { reorderTodos } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/todo-order";
import { useTimeSidebarStore } from "@/stores/time-sidebar/useTimeSidebarStore";

export const useHomeTodosByDate = (apiDays: HomeViewDay[]) => {
  const [todosByDate, setTodosByDate] = useState<Record<string, Todo[]>>({});
  const openTimerPanel = useTimeSidebarStore((state) => state.openTimerPanel);
  const queryClient = useQueryClient();
  const { mutate: changeTodoStatus } = useChangeTodoStatus();
  const { mutate: changeSubtaskStatus } = useChangeSubtaskStatus();
  const { mutate: reorderTodo } = useReorderTodo();

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

  const invalidateHomeView = () => {
    queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
  };

  const handleToggleCompleted = (
    dateKey: string,
    todoId: number,
    completed: boolean,
  ) => {
    const previous = todosByDate[dateKey] ?? [];
    updateTodo(dateKey, todoId, (todo) => ({ ...todo, completed }));

    changeTodoStatus(
      { todoId, data: { isCompleted: completed, date: dateKey } },
      {
        onSuccess: invalidateHomeView,
        onError: () => {
          setTodosByDate((prev) => ({ ...prev, [dateKey]: previous }));
        },
      },
    );
  };

  const handleTogglePlay = (dateKey: string, todoId: number) => {
    // TODO: API
    const willRun =
      todosByDate[dateKey]?.find((todo) => todo.todoId === todoId)
        ?.timerStatus !== "RUNNING";

    updateTodo(dateKey, todoId, (todo) => ({
      ...todo,
      timerStatus: todo.timerStatus === "RUNNING" ? "STOPPED" : "RUNNING",
    }));

    if (willRun) {
      openTimerPanel();
    }
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
        onSuccess: invalidateHomeView,
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
        onSuccess: invalidateHomeView,
        onError: () => {
          setTodosByDate((prev) => ({ ...prev, [dateKey]: previous }));
        },
      },
    );
  };

  return {
    todosByDate,
    handleToggleCompleted,
    handleTogglePlay,
    handleToggleSubtaskCompleted,
    handleDeleteTodo,
    handleReorderTodo,
  };
};
