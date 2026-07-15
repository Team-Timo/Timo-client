"use client";

import { IconGraphic, TODO_ICON_VALUES } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import type { TodoIconValue } from "@repo/timo-design-system/ui";

import { TodayDateHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayDateHeaderContainer";
import { TodayTodoCardContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoCardContainer";
import { useTodayTodoList } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_hooks/useTodayTodoList";
import { useTodayQuery } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_queries/use-today-query";
import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { StopCompleteModalContainer } from "@/containers/timer/StopCompleteModalContainer";
import { DetailTodoModalContainer } from "@/containers/todo-modal/detail/DetailTodoModalContainer";
import { formatShortDateLabel } from "@/utils/date/date";
import { convertDurationToMinutes } from "@/utils/duration/convert-duration-to-minutes";
import { convertDurationToTimeText } from "@/utils/duration/convert-duration-to-time-text";

const renderTodoIcon = (icon: string | undefined) => {
  if (icon == null || !(TODO_ICON_VALUES as readonly string[]).includes(icon)) {
    return undefined;
  }
  return (
    <div className="flex size-6 shrink-0 items-center justify-center">
      <IconGraphic icon={icon as TodoIconValue} />
    </div>
  );
};

export const TodayTodoListContainer = () => {
  const tToast = useTranslations("Toast");
  const { data } = useTodayQuery();

  const [pendingCompleteTodoId, setPendingCompleteTodoId] = useState<
    number | null
  >(null);
  const [pendingCompleteToken, setPendingCompleteToken] = useState<
    number | null
  >(null);
  const [feedbackText, setFeedbackText] = useState<string | undefined>();
  const [isTimerRunningToastOpen, setIsTimerRunningToastOpen] = useState(false);
  const [playErrorMessage, setPlayErrorMessage] = useState<string | null>(null);

  const {
    todos,
    activeTimer,
    handlePlay,
    handleToggleCompleted,
    handleDelete,
    handleSubTodoCheck,
    confirmStopAndComplete,
  } = useTodayTodoList(data.todos, {
    onNeedStopConfirm: (todoId) => {
      setPendingCompleteTodoId(todoId);
      setPendingCompleteToken(Date.now());
    },
    onTimerAlreadyRunning: () => setIsTimerRunningToastOpen(true),
    onStopFeedback: setFeedbackText,
    onPlayError: (message) =>
      setPlayErrorMessage(message ?? tToast("timerStartFailed")),
  });

  const handleConfirmPendingComplete = () => {
    if (pendingCompleteTodoId === null) return;

    confirmStopAndComplete(pendingCompleteTodoId);
    setPendingCompleteTodoId(null);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  const plannedMinutes = activeTimer
    ? convertDurationToMinutes(
        activeTimer.plannedSeconds + activeTimer.extendedSeconds,
      )
    : 0;
  const actualMinutes = activeTimer
    ? convertDurationToMinutes(activeTimer.elapsedSeconds)
    : 0;

  return (
    <div className="flex h-full flex-col gap-2">
      <TodayDateHeaderContainer
        completedCount={completedCount}
        totalCount={todos.length}
      />
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1 pb-4">
        {todos.map((todo) => {
          const isActiveTodo =
            activeTimer && activeTimer.todoId === todo.todoId;
          const durationSeconds = isActiveTodo
            ? activeTimer.plannedSeconds + activeTimer.extendedSeconds
            : todo.durationSeconds;
          const timerStatus = isActiveTodo
            ? activeTimer.status
            : todo.timerStatus;
          const isPlayHighlighted = !activeTimer || Boolean(isActiveTodo);

          return (
            <DetailTodoModalContainer
              key={todo.todoId}
              todoId={todo.todoId}
              date={todo.date.slice(0, 10)}
              onTogglePlay={() => handlePlay(todo.todoId)}
              onToggleCompleted={(completed) =>
                handleToggleCompleted(todo.todoId, completed)
              }
              onDelete={() => handleDelete(todo.todoId)}
            >
              {(openDetailTodoModal) => (
                <TodayTodoCardContainer
                  title={todo.title}
                  isCompleted={todo.completed}
                  icon={renderTodoIcon(todo.icon)}
                  timerStatus={timerStatus}
                  isPlayHighlighted={isPlayHighlighted}
                  toolbar={{
                    date: formatShortDateLabel(new Date(todo.date)),
                    dateValue: new Date(todo.date),
                    time: convertDurationToTimeText(durationSeconds),
                    priority: todo.priority,
                    tag: todo.tag?.name,
                    hasMemo: todo.hasMemo,
                    hasRepeat: todo.isRepeated,
                  }}
                  subTodos={todo.subtasks.map((s) => ({
                    id: s.subtaskId,
                    text: s.content,
                    isDone: s.completed,
                  }))}
                  onCardClick={openDetailTodoModal}
                  onTogglePlay={() => handlePlay(todo.todoId)}
                  onToggleCompleted={(completed) =>
                    handleToggleCompleted(todo.todoId, completed)
                  }
                  onSubTodoCheck={(id) => handleSubTodoCheck(todo.todoId, id)}
                />
              )}
            </DetailTodoModalContainer>
          );
        })}
      </div>

      <StopCompleteModalContainer
        pendingToken={pendingCompleteToken}
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
