"use client";

import { useEffect, useRef, useState } from "react";

import {
  useChangeStatus,
  useCompleteTimer,
  useExtendTimer,
  useStopTimer,
} from "@/api/generated/endpoints/timer/timer";
import { useChangeTodoStatus } from "@/api/generated/endpoints/todo/todo";
import { Timer } from "@/components/timer/Timer";
import {
  TimerSessionControls,
  type TimerSessionControlsHandle,
} from "@/components/timer/TimerSessionControls";
import { useActiveTimer } from "@/hooks/timer/use-active-timer";
import { useTimerActions } from "@/hooks/timer/use-timer-actions";
import { useTimerOvertime } from "@/hooks/timer/use-timer-overtime";
import { useTimerQueryInvalidation } from "@/hooks/timer/use-timer-query-invalidation";
import { formatDateKey } from "@/utils/date/date";
import { convertDurationToMinutes } from "@/utils/duration/convert-duration-to-minutes";
import { convertDurationToTimeText } from "@/utils/duration/convert-duration-to-time-text";
import { formatDurationLabel } from "@/utils/duration/format-duration-label";

export const TimerPanel = () => {
  const [feedbackText, setFeedbackText] = useState<string | undefined>();
  const timerSessionControlsRef = useRef<TimerSessionControlsHandle>(null);
  const wasTimeUpRef = useRef(false);

  const { data: activeTimer } = useActiveTimer();
  const { invalidateActiveTimer, invalidateHomeView, invalidateTimeBoxes } =
    useTimerQueryInvalidation();

  const { mutate: changeStatus } = useChangeStatus({
    mutation: {
      onSuccess: () => {
        invalidateActiveTimer();
        invalidateHomeView();
        invalidateTimeBoxes();
      },
    },
  });
  const { mutate: extendTimer } = useExtendTimer({
    mutation: {
      onSuccess: () => {
        invalidateActiveTimer();
        invalidateTimeBoxes();
      },
    },
  });
  const { mutate: completeTimer } = useCompleteTimer({
    mutation: {
      onSuccess: (response) => {
        setFeedbackText(response.data?.aiFeedback ?? undefined);
        invalidateActiveTimer();
        invalidateHomeView();
        invalidateTimeBoxes();
      },
    },
  });
  const { mutate: stopTimer } = useStopTimer({
    mutation: {
      onSuccess: (response) => {
        setFeedbackText(response.data?.aiFeedback ?? undefined);
        invalidateActiveTimer();
        invalidateHomeView();
        invalidateTimeBoxes();
      },
    },
  });
  const { mutate: changeTodoStatus } = useChangeTodoStatus({
    mutation: {
      onSuccess: () => {
        invalidateHomeView();
        invalidateTimeBoxes();
      },
    },
  });

  const isRunning = activeTimer?.status === "RUNNING";
  const isTimeUp = activeTimer ? activeTimer.remainingSeconds <= 0 : false;
  const { overtimeBaseSeconds, markOvertimeStart } =
    useTimerOvertime(activeTimer);

  useEffect(() => {
    if (isTimeUp && !wasTimeUpRef.current) {
      timerSessionControlsRef.current?.openEndModal();
      if (activeTimer && isRunning) {
        changeStatus({
          timerId: activeTimer.timerId,
          data: { action: "PAUSE" },
        });
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
    timer: activeTimer,
    isRunning,
    isTimeUp,
    dateKey: formatDateKey(new Date()),
    markOvertimeStart,
    changeStatus,
    extendTimer,
    completeTimer,
    stopTimer,
    changeTodoStatus,
  });

  const plannedSeconds = activeTimer
    ? activeTimer.plannedSeconds + activeTimer.extendedSeconds
    : 0;
  const remainingSeconds = activeTimer ? activeTimer.remainingSeconds : 0;
  const progress =
    plannedSeconds > 0
      ? ((plannedSeconds - remainingSeconds) / plannedSeconds) * 100
      : 0;
  const isOvertime = overtimeBaseSeconds !== null;
  const overtimeTotal = activeTimer
    ? activeTimer.plannedSeconds +
      activeTimer.extendedSeconds -
      (overtimeBaseSeconds ?? 0)
    : 0;
  const overtimeProgress =
    activeTimer && overtimeBaseSeconds !== null && overtimeTotal > 0
      ? Math.min(
          100,
          Math.max(
            0,
            ((activeTimer.elapsedSeconds - overtimeBaseSeconds) /
              overtimeTotal) *
              100,
          ),
        )
      : 0;
  const plannedMinutes = convertDurationToMinutes(plannedSeconds);
  const actualMinutes = convertDurationToMinutes(
    activeTimer?.elapsedSeconds ?? 0,
  );

  return (
    <div className="flex flex-col items-center gap-11.25">
      <Timer
        icon={activeTimer?.iconType}
        time={convertDurationToTimeText(remainingSeconds)}
        plannedLabel={formatDurationLabel(plannedMinutes, "H", "M")}
        progress={progress}
        isOvertime={isOvertime}
        overtimeProgress={overtimeProgress}
        size="sm"
      />

      <TimerSessionControls
        ref={timerSessionControlsRef}
        isRunning={isRunning}
        onTogglePlay={handleTogglePlay}
        plannedMinutes={plannedMinutes}
        actualMinutes={actualMinutes}
        feedbackText={feedbackText}
        isTimeUp={isTimeUp}
        onExtend={handleExtendTimer}
        onComplete={handleCompleteTimer}
        onStop={handleStopTimer}
        disabled={!activeTimer}
      />
    </div>
  );
};
