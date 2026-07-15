"use client";

import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import type { HomeViewFilter } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

import { HomeTodoCard } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-card/HomeTodoCard";
import { HomeDayHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/todo-card/HomeDayHeaderContainer";
import {
  scrollContainerToToday,
  useHomeTodayScrollRef,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/use-home-today-scroll";
import { useHomeTodosByDate } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/use-home-todos-by-date";
import { useHomeViewMode } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/use-home-view-mode";
import { useHomeViewQuery } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_queries/use-home-view-query";
import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { StopCompleteModalContainer } from "@/containers/timer/StopCompleteModalContainer";
import { DetailTodoModalContainer } from "@/containers/todo-modal/detail/DetailTodoModalContainer";
import { DndSortableListProvider } from "@/providers/dnd/DndSortableListProvider";
import { formatDateKey } from "@/utils/date/date";
import { convertDurationToMinutes } from "@/utils/duration/convert-duration-to-minutes";
import { getDefaultTagLabelKey } from "@/utils/todo/tag-label";

interface PendingCompleteTodo {
  token: number;
  dateKey: string;
  todoId: number;
}

export const HomeTodoContainer = () => {
  const tCommon = useTranslations("Common");
  const tToast = useTranslations("Toast");
  const { isWeekView, referenceDate } = useHomeViewMode();

  const scrollRef = useHomeTodayScrollRef<HTMLDivElement>();

  const filter: HomeViewFilter = isWeekView ? "WEEK" : "DEFAULT";
  const baseDate = formatDateKey(referenceDate);

  const { data: homeViewData } = useHomeViewQuery({ filter, baseDate });
  const days = homeViewData.days;

  const [pendingCompleteTodo, setPendingCompleteTodo] =
    useState<PendingCompleteTodo | null>(null);
  const [feedbackText, setFeedbackText] = useState<string | undefined>();
  const [isTimerRunningToastOpen, setIsTimerRunningToastOpen] = useState(false);
  const [playErrorMessage, setPlayErrorMessage] = useState<string | null>(null);

  const {
    todosByDate,
    activeTimer,
    handleToggleCompleted,
    handleTogglePlay,
    handleToggleSubtaskCompleted,
    handleDeleteTodo,
    handleReorderTodo,
    confirmStopAndComplete,
  } = useHomeTodosByDate(days, {
    onNeedStopConfirm: (dateKey, todoId) =>
      setPendingCompleteTodo({ token: Date.now(), dateKey, todoId }),
    onTimerAlreadyRunning: () => setIsTimerRunningToastOpen(true),
    onStopFeedback: setFeedbackText,
    onPlayError: (message) =>
      setPlayErrorMessage(message ?? tToast("timerStartFailed")),
    onUpdateError: (message) =>
      setPlayErrorMessage(message ?? tToast("todoUpdateFailed")),
  });

  const handleConfirmPendingComplete = () => {
    if (!pendingCompleteTodo) return;

    confirmStopAndComplete(
      pendingCompleteTodo.dateKey,
      pendingCompleteTodo.todoId,
    );

    setPendingCompleteTodo(null);
  };

  useEffect(() => {
    scrollContainerToToday(scrollRef.current);
  }, [isWeekView, scrollRef]);

  const plannedMinutes = activeTimer
    ? convertDurationToMinutes(
        activeTimer.plannedSeconds + activeTimer.extendedSeconds,
      )
    : 0;
  const actualMinutes = activeTimer
    ? convertDurationToMinutes(activeTimer.elapsedSeconds)
    : 0;

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
            data-today={day.isToday}
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
                  const isActiveTodo =
                    activeTimer && activeTimer.todoId === todo.todoId;
                  const durationSeconds = isActiveTodo
                    ? activeTimer.plannedSeconds + activeTimer.extendedSeconds
                    : todo.durationSeconds;
                  const timerStatus = isActiveTodo
                    ? activeTimer.status
                    : todo.timerStatus;
                  const isPlayHighlighted =
                    !activeTimer || Boolean(isActiveTodo);

                  const todoTagLabelKey = todo.tag
                    ? getDefaultTagLabelKey(todo.tag.tagId)
                    : undefined;
                  const todoTagName = todo.tag
                    ? todoTagLabelKey
                      ? tCommon(`tag.${todoTagLabelKey}`)
                      : todo.tag.name
                    : undefined;

                  return (
                    <DetailTodoModalContainer
                      key={todo.todoId}
                      todoId={todo.todoId}
                      date={dateKey}
                      onTogglePlay={() =>
                        handleTogglePlay(dateKey, todo.todoId)
                      }
                      onToggleCompleted={(completed) =>
                        handleToggleCompleted(dateKey, todo.todoId, completed)
                      }
                      onDelete={() => handleDeleteTodo(dateKey, todo.todoId)}
                    >
                      {(openDetailTodoModal) => (
                        <HomeTodoCard
                          todoId={todo.todoId}
                          title={todo.title}
                          isCompleted={todo.completed}
                          durationSeconds={durationSeconds}
                          priority={todo.priority}
                          tagName={todoTagName}
                          hasSubtask={todo.hasSubtask}
                          isRepeated={todo.isRepeated}
                          timerStatus={timerStatus}
                          isPlayHighlighted={isPlayHighlighted}
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

      <StopCompleteModalContainer
        pendingToken={pendingCompleteTodo?.token ?? null}
        plannedMinutes={plannedMinutes}
        actualMinutes={actualMinutes}
        feedbackText={feedbackText}
        onConfirm={handleConfirmPendingComplete}
      />

      <AnimatedToast
        isOpen={isTimerRunningToastOpen}
        onClose={() => setIsTimerRunningToastOpen(false)}
        message={tToast("timerAlreadyRunning")}
      />

      <AnimatedToast
        isOpen={playErrorMessage !== null}
        onClose={() => setPlayErrorMessage(null)}
        message={playErrorMessage ?? ""}
      />
    </div>
  );
};
