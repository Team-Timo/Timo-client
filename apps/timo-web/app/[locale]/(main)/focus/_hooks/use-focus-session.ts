"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import type { TimerSessionControlsHandle } from "@/components/timer/TimerSessionControls";

import {
  useChangeStatus,
  useCompleteTimer,
  useExtendTimer,
  useStartTimer,
  useStopTimer,
} from "@/api/generated/endpoints/timer/timer";
import {
  getGetTodoDetailQueryKey,
  useChangeSubtaskStatus,
  useChangeTodoStatus,
} from "@/api/generated/endpoints/todo/todo";
import { useFocusTodoQuery } from "@/app/[locale]/(main)/focus/_queries/use-focus-todo-query";
import { convertDateToBadgeText } from "@/app/[locale]/(main)/focus/_utils/date";
import { useActiveTimer } from "@/hooks/timer/use-active-timer";
import { useTimerActions } from "@/hooks/timer/use-timer-actions";
import { useTimerOvertime } from "@/hooks/timer/use-timer-overtime";
import { useTimerQueryInvalidation } from "@/hooks/timer/use-timer-query-invalidation";
import { convertDurationToMinutes } from "@/utils/duration/convert-duration-to-minutes";

export interface UseFocusSessionOptions {
  onMutationError: () => void;
  onFeedback: (feedbackText: string | undefined) => void;
}

export const useFocusSession = ({
  onMutationError,
  onFeedback,
}: UseFocusSessionOptions) => {
  const queryClient = useQueryClient();
  const timerSessionControlsRef = useRef<TimerSessionControlsHandle>(null);
  const wasTimeUpRef = useRef(false);

  const { data: focusView } = useFocusTodoQuery();
  const { data: activeTimer } = useActiveTimer();

  const {
    invalidateActiveTimer,
    invalidateHomeView,
    invalidateTimeBoxes,
    invalidateTodayView,
    invalidateFocusTodo,
  } = useTimerQueryInvalidation();
  const invalidateTodoDetail = () => {
    const todo = focusView.todo;
    if (!todo) return;
    queryClient.invalidateQueries({
      queryKey: getGetTodoDetailQueryKey(todo.todoId, { date: focusView.date }),
    });
  };

  const { mutate: startTimer } = useStartTimer({
    mutation: {
      onSuccess: () => {
        invalidateActiveTimer();
        invalidateHomeView();
        invalidateTimeBoxes();
      },
      onError: onMutationError,
    },
  });
  const { mutate: changeStatus } = useChangeStatus({
    mutation: {
      onSuccess: () => {
        invalidateActiveTimer();
        invalidateHomeView();
        invalidateTimeBoxes();
      },
      onError: onMutationError,
    },
  });
  const { mutate: extendTimer } = useExtendTimer({
    mutation: {
      onSuccess: () => {
        invalidateActiveTimer();
        invalidateHomeView();
        invalidateTimeBoxes();
      },
      onError: onMutationError,
    },
  });
  const { mutate: completeTimer } = useCompleteTimer({
    mutation: {
      onSuccess: (response) => {
        onFeedback(response.data?.aiFeedback ?? undefined);
        invalidateActiveTimer();
        invalidateFocusTodo();
        invalidateHomeView();
        invalidateTimeBoxes();
        invalidateTodayView();
        invalidateTodoDetail();
      },
      onError: onMutationError,
    },
  });
  const { mutate: stopTimer } = useStopTimer({
    mutation: {
      onSuccess: (response) => {
        onFeedback(response.data?.aiFeedback ?? undefined);
        invalidateActiveTimer();
        invalidateFocusTodo();
        invalidateHomeView();
        invalidateTimeBoxes();
        invalidateTodayView();
        invalidateTodoDetail();
      },
      onError: onMutationError,
    },
  });
  const { mutate: changeTodoStatus } = useChangeTodoStatus({
    mutation: {
      onSuccess: () => {
        invalidateFocusTodo();
        invalidateTimeBoxes();
        invalidateTodayView();
        invalidateTodoDetail();
      },
      onError: onMutationError,
    },
  });
  const { mutate: changeSubtaskStatus } = useChangeSubtaskStatus({
    mutation: {
      onSuccess: () => {
        invalidateFocusTodo();
        invalidateTimeBoxes();
        invalidateTodayView();
        invalidateTodoDetail();
      },
      onError: onMutationError,
    },
  });

  const todo = focusView.todo;
  const timer =
    activeTimer && todo && activeTimer.todoId === todo.todoId
      ? activeTimer
      : undefined;
  const isRunning = timer?.status === "RUNNING";
  const isTimeUp = timer ? timer.remainingSeconds <= 0 : false;
  const { overtimeBaseSeconds, markOvertimeStart } = useTimerOvertime(timer);

  useEffect(() => {
    if (isTimeUp && !wasTimeUpRef.current) {
      timerSessionControlsRef.current?.openEndModal();
      if (timer && isRunning) {
        changeStatus({ timerId: timer.timerId, data: { action: "PAUSE" } });
      }
    }
    wasTimeUpRef.current = isTimeUp;
    // isTimeUp이 처음 true가 되는 전환 시점에만 실행되어야 하므로 다른 값은 의도적으로 의존성에서 제외한다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeUp]);

  const {
    handleTogglePlay,
    handleExtendTimer,
    handleCompleteTimer,
    handleStopTimer,
  } = useTimerActions({
    timer,
    isRunning,
    isTimeUp,
    dateKey: focusView.date,
    markOvertimeStart,
    changeStatus,
    extendTimer,
    completeTimer,
    stopTimer,
    changeTodoStatus,
    onNoTimer: () => {
      if (todo) startTimer({ todoId: todo.todoId });
    },
  });

  const handleToggleCompleted = (completed: boolean) => {
    if (!todo) return;

    if (completed && timer) {
      timerSessionControlsRef.current?.openStopModal();
      return;
    }

    changeTodoStatus({
      todoId: todo.todoId,
      data: { isCompleted: completed, date: focusView.date },
    });
  };

  const handleToggleSubtaskCompleted = (
    subtaskId: number,
    completed: boolean,
  ) => {
    if (!todo) return;

    changeSubtaskStatus({
      todoId: todo.todoId,
      subtaskId,
      data: { isCompleted: completed },
    });
  };

  const today = new Date(focusView.date);
  const dateText = convertDateToBadgeText(today);

  const plannedSeconds = timer
    ? timer.plannedSeconds + timer.extendedSeconds
    : (todo?.durationSeconds ?? 0);
  const remainingSeconds = timer ? timer.remainingSeconds : plannedSeconds;
  const progress =
    plannedSeconds > 0
      ? ((plannedSeconds - remainingSeconds) / plannedSeconds) * 100
      : 0;
  const isOvertime = overtimeBaseSeconds !== null;
  const overtimeTotal = timer
    ? timer.plannedSeconds + timer.extendedSeconds - (overtimeBaseSeconds ?? 0)
    : 0;
  const overtimeProgress =
    timer && overtimeBaseSeconds !== null && overtimeTotal > 0
      ? Math.min(
          100,
          Math.max(
            0,
            ((timer.elapsedSeconds - overtimeBaseSeconds) / overtimeTotal) *
              100,
          ),
        )
      : 0;
  const plannedMinutes = convertDurationToMinutes(plannedSeconds);
  const actualMinutes = convertDurationToMinutes(timer?.elapsedSeconds ?? 0);

  return {
    focusSessionState: {
      focusView,
      todo,
      timerSessionControlsRef,
      isRunning,
      isTimeUp,
      today,
      dateText,
      plannedSeconds,
      remainingSeconds,
      progress,
      isOvertime,
      overtimeProgress,
      plannedMinutes,
      actualMinutes,
    },
    focusSessionActions: {
      onTogglePlay: handleTogglePlay,
      onExtend: handleExtendTimer,
      onComplete: handleCompleteTimer,
      onStop: handleStopTimer,
      onToggleCompleted: handleToggleCompleted,
      onToggleSubtaskCompleted: handleToggleSubtaskCompleted,
    },
  };
};
