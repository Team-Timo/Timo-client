"use client";

import { useState } from "react";

import type { TodoMock } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";

import { TodayTodoCardContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoCardContainer";
import { todayTodoMocks } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";

const PRIORITY_MAP = {
  URGENT: "urgent",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

export const TodayTodoListContainer = () => {
  const [todos, setTodos] = useState<TodoMock[]>(todayTodoMocks);
  const [runningTodoId, setRunningTodoId] = useState<number | null>(
    todayTodoMocks.find((t) => t.timerStatus === "RUNNING")?.todoId ?? null,
  );

  const handlePlay = (todoId: number) => {
    // TODO: API
    setRunningTodoId((prev) => (prev === todoId ? null : todoId));
  };

  const handleCheck = (todoId: number) => {
    // TODO: API
    setTodos((prev) =>
      prev.map((t) =>
        t.todoId === todoId ? { ...t, completed: !t.completed } : t,
      ),
    );
    if (runningTodoId === todoId) setRunningTodoId(null);
  };

  const handleDelete = (todoId: number) => {
    // TODO: API
    setTodos((prev) => prev.filter((t) => t.todoId !== todoId));
    if (runningTodoId === todoId) setRunningTodoId(null);
  };

  const handleSubTodoCheck = (todoId: number, subtaskId: string) => {
    // TODO: API
    setTodos((prev) =>
      prev.map((t) =>
        t.todoId === todoId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.subtaskId === Number(subtaskId)
                  ? { ...s, completed: !s.completed }
                  : s,
              ),
            }
          : t,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodayTodoCardContainer
          key={todo.todoId}
          title={todo.title}
          isDone={todo.completed}
          timerStatus={runningTodoId === todo.todoId ? "RUNNING" : "STOPPED"}
          toolbar={{
            date: formatDate(todo.date),
            time: formatDuration(todo.durationSeconds),
            priority: PRIORITY_MAP[todo.priority],
            tag: todo.tag?.name,
            hasMemo: todo.hasMemo,
            hasRepeat: todo.isRepeated,
          }}
          subTodos={todo.subtasks.map((s) => ({
            id: String(s.subtaskId),
            text: s.content,
            isDone: s.completed,
          }))}
          onPlay={() => handlePlay(todo.todoId)}
          onCheck={() => handleCheck(todo.todoId)}
          onDelete={() => handleDelete(todo.todoId)}
          onSubTodoCheck={(id) => handleSubTodoCheck(todo.todoId, id)}
        />
      ))}
    </div>
  );
};
