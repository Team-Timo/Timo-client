"use client";

import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";

import type { HomeViewFilter } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

import { HomeTodoCard } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-card/HomeTodoCard";
import { HomeDayHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/todo-card/HomeDayHeaderContainer";
import { DetailTodoModalContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/todo-modal/DetailTodoModalContainer";
import { useHomeTodayScrollRef } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/use-home-today-scroll";
import { useHomeTodosByDate } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/use-home-todos-by-date";
import { useHomeViewMode } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/use-home-view-mode";
import { getHomeViewMock } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_mocks/home-view-mock";
import { reorderDaysTodayFirst } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/home-view";
import { DndSortableListProvider } from "@/providers/dnd/DndSortableListProvider";
import { formatDateKey } from "@/utils/date";

const TAG_LABEL_KEYS = [
  "dailyLife",
  "work",
  "exercise",
  "assignment",
  "additional",
] as const;

type TagLabelKey = (typeof TAG_LABEL_KEYS)[number];

const isTagLabelKey = (value: string): value is TagLabelKey =>
  (TAG_LABEL_KEYS as readonly string[]).includes(value);

export const HomeTodoContainer = () => {
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

  const {
    todosByDate,
    handleAddTodo,
    handleToggleCompleted,
    handleTogglePlay,
    handleToggleSubtaskCompleted,
    handleReorderTodo,
  } = useHomeTodosByDate(apiDays);

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 });
  }, [isWeekView, scrollRef]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex h-full overflow-x-auto scroll-smooth",
        isWeekView ? "w-full gap-2.5" : "snap-x snap-proximity gap-5 pb-2",
      )}
    >
      {days.map((day) => {
        const dateKey = day.date;
        const todos = todosByDate[dateKey] ?? day.todos;
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
            <HomeDayHeaderContainer
              dateKey={dateKey}
              dayOfWeek={day.dayOfWeek}
              isHoliday={day.isHoliday}
              isToday={day.isToday}
              totalCount={todos.length}
              completedCount={completedCount}
              onCreateTodo={(todo) => handleAddTodo(dateKey, todo)}
            />

            <DndSortableListProvider
              dndId={`home-todo-${dateKey}`}
              itemIds={todos.map((todo) => todo.todoId)}
              onReorder={(fromIndex, toIndex) =>
                handleReorderTodo(dateKey, fromIndex, toIndex)
              }
            >
              <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
                {todos.map((todo) => {
                  const [firstSubtask] = todo.subtasks;

                  return (
                    <DetailTodoModalContainer key={todo.todoId} todo={todo}>
                      {(openDetailTodoModal) => (
                        <HomeTodoCard
                          todoId={todo.todoId}
                          title={todo.title}
                          isCompleted={todo.completed}
                          durationSeconds={todo.durationSeconds}
                          priority={todo.priority}
                          tagName={
                            isTagLabelKey(todo.tag.name)
                              ? tCommon(`tag.${todo.tag.name}`)
                              : todo.tag.name
                          }
                          hasMemo={todo.hasMemo}
                          isRepeated={todo.isRepeated}
                          timerStatus={todo.timerStatus}
                          subtaskTitle={firstSubtask?.content}
                          isSubtaskCompleted={firstSubtask?.completed}
                          onClickTodo={openDetailTodoModal}
                          onToggleCompleted={(completed) =>
                            handleToggleCompleted(
                              dateKey,
                              todo.todoId,
                              completed,
                            )
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
                      )}
                    </DetailTodoModalContainer>
                  );
                })}
              </div>
            </DndSortableListProvider>
          </div>
        );
      })}
    </div>
  );
};
