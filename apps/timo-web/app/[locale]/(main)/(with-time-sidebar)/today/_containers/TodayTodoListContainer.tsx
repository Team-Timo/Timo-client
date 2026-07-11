"use client";

import { useState } from "react";

import type { TodoMock } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";

import { TodayTodoCardContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoCardContainer";
import { todayTodoMocks } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";
import { convertDurationToTimeText } from "@/utils/convert-duration-to-time-text";
import { formatDate } from "@/utils/date";

const PRIORITY_MAP = {
  URGENT: "urgent",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

export const TodayTodoListContainer = () => {
  const [todos, setTodos] = useState<TodoMock[]>(todayTodoMocks);
  const runningTodoId =
    todos.find((t) => t.timerStatus === "RUNNING")?.todoId ?? null;

  const handlePlay = (todoId: number) => {
    // TODO: API
    setTodos((prev) =>
      prev.map((t) => ({
        ...t,
        timerStatus:
          t.todoId === todoId && t.timerStatus !== "RUNNING"
            ? "RUNNING"
            : "STOPPED",
      })),
    );
  };

  const handleCheck = (todoId: number) => {
    // TODO: API
    setTodos((prev) =>
      prev.map((t) =>
        t.todoId === todoId
          ? { ...t, completed: !t.completed, timerStatus: "STOPPED" }
          : t,
      ),
    );
  };

  const handleDelete = (todoId: number) => {
    // TODO: API
    setTodos((prev) => prev.filter((t) => t.todoId !== todoId));
  };

  const handleSubTodoCheck = (todoId: number, subtaskId: number) => {
    // TODO: API
    setTodos((prev) =>
      prev.map((t) =>
        t.todoId === todoId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.subtaskId === subtaskId
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
            time: convertDurationToTimeText(todo.durationSeconds),
            priority: PRIORITY_MAP[todo.priority],
            tag: todo.tag?.name,
            hasMemo: todo.hasMemo,
            hasRepeat: todo.isRepeated,
          }}
          subTodos={todo.subtasks.map((s) => ({
            id: s.subtaskId,
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
