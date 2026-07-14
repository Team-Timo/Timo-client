"use client";

import { useEffect, useState } from "react";

import type { TodayTodo } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_types/today-type";

export const useTodayTodoList = (initialTodos: TodayTodo[]) => {
  const [todos, setTodos] = useState<TodayTodo[]>(initialTodos);

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const runningTodoId =
    todos.find((todo) => todo.timerStatus === "RUNNING")?.todoId ?? null;

  const handlePlay = (todoId: number) => {
    // TODO: API
    setTodos((prev) =>
      prev.map((todo) => ({
        ...todo,
        timerStatus:
          todo.todoId === todoId && todo.timerStatus !== "RUNNING"
            ? "RUNNING"
            : "STOPPED",
      })),
    );
  };

  const handleCheck = (todoId: number) => {
    // TODO: API
    setTodos((prev) => {
      const updated = prev.map((todo) =>
        todo.todoId === todoId
          ? { ...todo, completed: !todo.completed, timerStatus: "STOPPED" }
          : todo,
      );
      return [...updated].sort(
        (a, b) => Number(a.completed) - Number(b.completed),
      );
    });
  };

  const handleDelete = (todoId: number) => {
    // TODO: API
    setTodos((prev) => prev.filter((todo) => todo.todoId !== todoId));
  };

  const handleSubTodoCheck = (todoId: number, subtaskId: number) => {
    // TODO: API
    setTodos((prev) =>
      prev.map((todo) =>
        todo.todoId === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((s) =>
                s.subtaskId === subtaskId
                  ? { ...s, completed: !s.completed }
                  : s,
              ),
            }
          : todo,
      ),
    );
  };

  return {
    todos,
    runningTodoId,
    handlePlay,
    handleCheck,
    handleDelete,
    handleSubTodoCheck,
  };
};
