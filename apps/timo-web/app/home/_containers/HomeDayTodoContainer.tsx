"use client";

import { AddTaskButton } from "@repo/timo-design-system/ui";
import { useState } from "react";

import type { Todo } from "@/app/home/_types/todo-type";

import { HomeDateInformation } from "@/app/home/_components/HomeDateInformation";
import { HomeDayTodoCard } from "@/app/home/_components/HomeDayTodoCard";
import { todoMocks } from "@/app/home/_mocks/todo-mock";
import {
  convertDateToDateText,
  convertDateToDayOfWeek,
} from "@/app/home/_utils/date";

export const HomeDayTodoContainer = () => {
  const [todos, setTodos] = useState<Todo[]>(todoMocks);

  const today = new Date();
  const completedCount = todos.filter((todo) => todo.completed).length;

  const handleToggleCompleted = (todoId: number, completed: boolean) => {
    // TODO: API
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todoId === todoId ? { ...todo, completed } : todo,
      ),
    );
  };

  const handleTogglePlay = (todoId: number) => {
    // TODO: API
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todoId === todoId
          ? {
              ...todo,
              timerStatus:
                todo.timerStatus === "RUNNING" ? "STOPPED" : "RUNNING",
            }
          : todo,
      ),
    );
  };

  const handleToggleSubtaskCompleted = (
    todoId: number,
    subtaskId: number,
    completed: boolean,
  ) => {
    // TODO: API
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todoId === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask.subtaskId === subtaskId
                  ? { ...subtask, completed }
                  : subtask,
              ),
            }
          : todo,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3 pb-2">
        <HomeDateInformation
          date={convertDateToDateText(today)}
          dayOfWeek={convertDateToDayOfWeek(today)}
          isHoliday={false}
          isToday
          totalCount={todos.length}
          completedCount={completedCount}
        />
        <AddTaskButton text="영문영문영문" />
      </div>

      <div className="flex max-h-[680px] flex-col gap-2 overflow-y-auto pr-1">
        {todos.map((todo) => {
          const [firstSubtask] = todo.subtasks;

          return (
            <HomeDayTodoCard
              key={todo.todoId}
              title={todo.title}
              isCompleted={todo.completed}
              durationSeconds={todo.durationSeconds}
              priority={todo.priority}
              tagName={todo.tag.name}
              hasMemo={todo.hasMemo}
              isRepeated={todo.isRepeated}
              timerStatus={todo.timerStatus}
              subtaskTitle={firstSubtask?.content}
              isSubtaskCompleted={firstSubtask?.completed}
              onToggleCompleted={(completed) =>
                handleToggleCompleted(todo.todoId, completed)
              }
              onTogglePlay={() => handleTogglePlay(todo.todoId)}
              onToggleSubtaskCompleted={
                firstSubtask
                  ? (completed) =>
                      handleToggleSubtaskCompleted(
                        todo.todoId,
                        firstSubtask.subtaskId,
                        completed,
                      )
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
};
