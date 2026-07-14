"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import type { TimerSessionControlsHandle } from "@/components/timer/TimerSessionControls";

import { getGetFocusTodoQueryKey } from "@/api/generated/endpoints/focus/focus";
import { getGetHomeQueryKey } from "@/api/generated/endpoints/home/home";
import {
  useChangeStatus,
  useCompleteTimer,
  useExtendTimer,
  useStartTimer,
  useStopTimer,
  getGetActiveTimerQueryKey,
} from "@/api/generated/endpoints/timer/timer";
import {
  useChangeSubtaskStatus,
  useChangeTodoStatus,
} from "@/api/generated/endpoints/todo/todo";
import { useFocusTodo } from "@/app/[locale]/(main)/focus/_queries/use-focus-todo";
import { convertDateToBadgeText } from "@/app/[locale]/(main)/focus/_utils/date";
import { useActiveTimer } from "@/hooks/use-active-timer";
import { useTimerOvertime } from "@/hooks/use-timer-overtime";
import { convertDurationToMinutes } from "@/utils/duration/convert-duration-to-minutes";

export const useFocusSession = () => {
  const queryClient = useQueryClient();
  const timerSessionControlsRef = useRef<TimerSessionControlsHandle>(null);
  const wasTimeUpRef = useRef(false);
  const [feedbackText, setFeedbackText] = useState<string | undefined>();
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);

  const { data: focusView } = useFocusTodo();
  const { data: activeTimer } = useActiveTimer();

  const invalidateActiveTimer = () =>
    queryClient.invalidateQueries({ queryKey: getGetActiveTimerQueryKey() });
  const invalidateFocusTodo = () =>
    queryClient.invalidateQueries({ queryKey: getGetFocusTodoQueryKey() });
  const invalidateHomeView = () =>
    queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
  const handleMutationError = () => setIsErrorToastOpen(true);

  const { mutate: startTimer } = useStartTimer({
    mutation: {
      onSuccess: () => {
        invalidateActiveTimer();
        invalidateHomeView();
      },
      onError: handleMutationError,
    },
  });
  const { mutate: changeStatus } = useChangeStatus({
    mutation: {
      onSuccess: () => {
        invalidateActiveTimer();
        invalidateHomeView();
      },
      onError: handleMutationError,
    },
  });
  const { mutate: extendTimer } = useExtendTimer({
    mutation: {
      onSuccess: () => {
        invalidateActiveTimer();
        invalidateHomeView();
      },
      onError: handleMutationError,
    },
  });
  const { mutate: completeTimer } = useCompleteTimer({
    mutation: {
      onSuccess: (response) => {
        setFeedbackText(response.data?.aiFeedback ?? undefined);
        invalidateActiveTimer();
        invalidateFocusTodo();
        invalidateHomeView();
      },
      onError: handleMutationError,
    },
  });
  const { mutate: stopTimer } = useStopTimer({
    mutation: {
      onSuccess: (response) => {
        setFeedbackText(response.data?.aiFeedback ?? undefined);
        invalidateActiveTimer();
        invalidateFocusTodo();
        invalidateHomeView();
      },
      onError: handleMutationError,
    },
  });
  const { mutate: changeTodoStatus } = useChangeTodoStatus({
    mutation: { onSuccess: invalidateFocusTodo, onError: handleMutationError },
  });
  const { mutate: changeSubtaskStatus } = useChangeSubtaskStatus({
    mutation: { onSuccess: invalidateFocusTodo, onError: handleMutationError },
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

  const handleTogglePlay = () => {
    if (!todo) return;

    if (!timer) {
      startTimer({ todoId: todo.todoId });
      return;
    }

    changeStatus({
      timerId: timer.timerId,
      data: { action: isRunning ? "PAUSE" : "RESUME" },
    });
  };

  const handleExtendTimer = (minutes: number) => {
    if (!timer) return;

    if (isTimeUp) {
      markOvertimeStart(
        timer.timerId,
        timer.plannedSeconds + timer.extendedSeconds,
      );
      changeStatus({ timerId: timer.timerId, data: { action: "RESUME" } });
    }

    extendTimer({ timerId: timer.timerId, data: { extendMinutes: minutes } });
  };

  const handleCompleteTimer = () => {
    if (!timer) return;

    completeTimer({ timerId: timer.timerId });
  };

  const handleStopTimer = () => {
    if (!timer || !todo) return;

    stopTimer(
      { timerId: timer.timerId },
      {
        onSuccess: () => {
          changeTodoStatus({
            todoId: todo.todoId,
            data: { isCompleted: true, date: focusView.date },
          });
        },
      },
    );
  };

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
      feedbackText,
      isErrorToastOpen,
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
      onCloseErrorToast: () => setIsErrorToastOpen(false),
    },
  };
};
