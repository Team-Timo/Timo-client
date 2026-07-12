"use client";

import { useEffect, useState } from "react";

import type { HomeViewDay } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";
import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { patchTodoOrderMock } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_mocks/todo-order-mock";
import { reorderTodos } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/todo-order";
import { useTimeSidebarStore } from "@/stores/time-sidebar/useTimeSidebarStore";

export const useHomeTodosByDate = (apiDays: HomeViewDay[]) => {
  const [todosByDate, setTodosByDate] = useState<Record<string, Todo[]>>({});
  const openTimerPanel = useTimeSidebarStore((state) => state.openTimerPanel);

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

  const handleAddTodo = (dateKey: string, todo: Todo) => {
    // TODO: API
    setTodosByDate((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] ?? []), todo],
    }));
  };

  const handleToggleCompleted = (
    dateKey: string,
    todoId: number,
    completed: boolean,
  ) => {
    // TODO: API
    updateTodo(dateKey, todoId, (todo) => ({ ...todo, completed }));
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
    // TODO: API
    updateTodo(dateKey, todoId, (todo) => ({
      ...todo,
      subtasks: todo.subtasks.map((subtask) =>
        subtask.subtaskId === subtaskId ? { ...subtask, completed } : subtask,
      ),
    }));
  };

  const handleDeleteTodo = (dateKey: string, todoId: number) => {
    // TODO: API
    setTodosByDate((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] ?? []).filter((todo) => todo.todoId !== todoId),
    }));
  };

  const handleReorderTodo = async (
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

    try {
      await patchTodoOrderMock({ todoId: movedTodo.todoId, newIndex: toIndex });
    } catch {
      setTodosByDate((prev) => ({ ...prev, [dateKey]: previous }));
    }
  };

  return {
    todosByDate,
    handleAddTodo,
    handleToggleCompleted,
    handleTogglePlay,
    handleToggleSubtaskCompleted,
    handleDeleteTodo,
    handleReorderTodo,
  };
};
