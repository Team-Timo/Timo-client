"use client";

import { useState } from "react";

import type { TodoMock } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";

import { TodayDayHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayDayHeaderContainer";
import { TodayTodoCardContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoCardContainer";
import { todayTodoMocks } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";
import { convertDurationToTimeText } from "@/utils/convert-duration-to-time-text";
import { formatDate } from "@/utils/date";

const PRIORITY_MAP = {
  URGENT: "VERY_HIGH",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
} as const;

export const TodayTodoListContainer = () => {
  const [todos, setTodos] = useState<TodoMock[]>(todayTodoMocks);
  const runningTodoId =
    todos.find((todo) => todo.timerStatus === "RUNNING")?.todoId ?? null;
  const completedCount = todos.filter((todo) => todo.completed).length;

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
    setTodos((prev) =>
      prev.map((todo) =>
        todo.todoId === todoId
          ? { ...todo, completed: !todo.completed, timerStatus: "STOPPED" }
          : todo,
      ),
    );
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

  return (
    <div className="flex h-full flex-col gap-2">
      <TodayDayHeaderContainer
        completedCount={completedCount}
        totalCount={todos.length}
      />
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pb-4">
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
    </div>
  );
};
