"use client";

import { AddTaskButton } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import type {
  Todo,
  TodoPriorityTypes,
  TodoTagName,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { HomeDateInformation } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/HomeDateInformation";
import { HomeTodoCard } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/HomeTodoCard";
import { todoMocks } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_mocks/todo-mock";
import { convertDateToDateText } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { getDayOfWeekKey } from "@/utils/get-day-of-week-key";

type TagLabelKeyTypes =
  | "dailyLife"
  | "work"
  | "exercise"
  | "assignment"
  | "additional";

const TAG_LABEL_KEY: Record<TodoTagName, TagLabelKeyTypes> = {
  DAILY_LIFE: "dailyLife",
  WORK: "work",
  EXERCISE: "exercise",
  ASSIGNMENT: "assignment",
  ADDITIONAL: "additional",
};

type PriorityLabelKeyTypes = "veryImportant" | "important" | "average" | "low";

const PRIORITY_LABEL_KEY: Record<TodoPriorityTypes, PriorityLabelKeyTypes> = {
  URGENT: "veryImportant",
  HIGH: "important",
  MEDIUM: "average",
  LOW: "low",
};

export const HomeTodoContainer = () => {
  const t = useTranslations("Home");
  const tCommon = useTranslations("Common");
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
          dayOfWeek={tCommon(`weekday.${getDayOfWeekKey(today)}`)}
          isHoliday={false}
          isToday
          totalCount={todos.length}
          completedCount={completedCount}
        />
        <AddTaskButton text={t("addTask")} />
      </div>

      <div className="flex max-h-[680px] flex-col gap-2 overflow-y-auto pr-1">
        {todos.map((todo) => {
          const [firstSubtask] = todo.subtasks;

          return (
            <HomeTodoCard
              key={todo.todoId}
              title={todo.title}
              isCompleted={todo.completed}
              durationSeconds={todo.durationSeconds}
              priority={todo.priority}
              priorityLabel={tCommon(
                `priority.${PRIORITY_LABEL_KEY[todo.priority]}`,
              )}
              tagName={tCommon(`tag.${TAG_LABEL_KEY[todo.tag.name]}`)}
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
