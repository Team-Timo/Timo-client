"use client";

import { AddTaskButton } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import type { HomeViewFilter } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";
import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { HomeDateInformation } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/HomeDateInformation";
import { HomeTodoCard } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/HomeTodoCard";
import { useHomeTodayScrollRef } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/useHomeTodayScroll";
import { useHomeViewMode } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/useHomeViewMode";
import { getHomeViewMock } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_mocks/home-view-mock";
import {
  convertDateToDateText,
  formatDateKey,
  getToday,
  parseDateKey,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { reorderDaysTodayFirst } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/home-view";

export const HomeTodoContainer = () => {
  const t = useTranslations("Home");
  const tCommon = useTranslations("Common");
  const { isWeekView, referenceDate } = useHomeViewMode();
  const scrollRef = useHomeTodayScrollRef<HTMLDivElement>();

  const filter: HomeViewFilter = isWeekView ? "WEEK" : "DEFAULT";
  const baseDate = formatDateKey(referenceDate);
  const apiDays = useMemo(
    () => getHomeViewMock({ filter, baseDate }).days,
    [filter, baseDate],
  );

  const days = useMemo(
    () => (isWeekView ? apiDays : reorderDaysTodayFirst(apiDays)),
    [isWeekView, apiDays],
  );

  const [todosByDate, setTodosByDate] = useState<Record<string, Todo[]>>({});

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
    updateTodo(dateKey, todoId, (todo) => ({
      ...todo,
      timerStatus: todo.timerStatus === "RUNNING" ? "STOPPED" : "RUNNING",
    }));
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

  return (
    <div
      ref={isWeekView ? undefined : scrollRef}
      className={cn(
        "flex h-full overflow-x-auto scroll-smooth",
        isWeekView ? "w-full gap-2.5" : "snap-x snap-mandatory gap-5 pb-2",
      )}
    >
      {days.map((day) => {
        const dateKey = day.date;
        const todos = todosByDate[dateKey] ?? day.todos;
        const date = parseDateKey(day.date) ?? getToday();
        const completedCount = todos.filter((todo) => todo.completed).length;

        return (
          <div
            key={dateKey}
            className={cn(
              "flex h-full flex-col gap-2",
              isWeekView
                ? "min-w-[150px] flex-1"
                : "w-[230px] shrink-0 snap-start",
            )}
          >
            <div className="flex flex-col gap-3 pb-2">
              <HomeDateInformation
                date={convertDateToDateText(date)}
                dayOfWeek={tCommon(`weekday.${day.dayOfWeek}`)}
                isHoliday={day.isHoliday}
                isToday={day.isToday}
                totalCount={todos.length}
                completedCount={completedCount}
              />
              <AddTaskButton text={t("addTask")} />
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
              {todos.map((todo) => {
                const [firstSubtask] = todo.subtasks;

                return (
                  <div
                    key={todo.todoId}
                    className={cn(isWeekView && "min-h-0 flex-1")}
                  >
                    <HomeTodoCard
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
                        handleToggleCompleted(dateKey, todo.todoId, completed)
                      }
                      onTogglePlay={() =>
                        handleTogglePlay(dateKey, todo.todoId)
                      }
                      onToggleSubtaskCompleted={
                        firstSubtask
                          ? (completed) =>
                              handleToggleSubtaskCompleted(
                                dateKey,
                                todo.todoId,
                                firstSubtask.subtaskId,
                                completed,
                              )
                          : undefined
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
