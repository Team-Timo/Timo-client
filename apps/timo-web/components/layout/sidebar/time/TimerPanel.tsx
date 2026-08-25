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
import { convertDurationToTimeText } from "@/utils/duration/convert-duration-to-time-text";
import { formatDurationLabel } from "@/utils/duration/format-duration-label";
import { getTimerProgress } from "@/utils/timer/get-timer-progress";

export const TimerPanel = () => {
  const [feedbackText, setFeedbackText] = useState<string | undefined>();
  const timerSessionControlsRef = useRef<TimerSessionControlsHandle>(null);
  const wasTimeUpRef = useRef(false);

  const { data: activeTimer } = useActiveTimer();
  const {
    invalidateHomeView,
    invalidateTimeBoxes,
    invalidateTodayView,
    invalidateFocusTodo,
    invalidateTimerProgress,
    invalidateTimerFinish,
  } = useTimerQueryInvalidation();

  const { mutate: changeStatus } = useChangeStatus({
    mutation: {
      onSuccess: () => {
        invalidateTimerProgress();
      },
    },
  });
  const { mutate: extendTimer } = useExtendTimer({
    mutation: {
      onSuccess: () => {
        invalidateTimerProgress();
      },
    },
  });
  const { mutate: completeTimer } = useCompleteTimer({
    mutation: {
      onSuccess: (response) => {
        setFeedbackText(response.data?.aiFeedback ?? undefined);
        invalidateTimerFinish(response.data?.todoId);
      },
    },
  });
  const { mutate: stopTimer } = useStopTimer({
    mutation: {
      onSuccess: (response) => {
        setFeedbackText(response.data?.aiFeedback ?? undefined);
        invalidateTimerFinish(response.data?.todoId);
      },
    },
  });
  const { mutate: changeTodoStatus } = useChangeTodoStatus({
    mutation: {
      onSuccess: () => {
        invalidateHomeView();
        invalidateTimeBoxes();
        invalidateTodayView();
        invalidateFocusTodo();
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

  const {
    remainingSeconds,
    progress,
    isOvertime,
    overtimeProgress,
    plannedMinutes,
    basePlannedMinutes,
    actualMinutes,
  } = getTimerProgress({ timer: activeTimer, overtimeBaseSeconds });

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
        plannedMinutes={basePlannedMinutes}
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
