"use client";

import { TimerOnIcon } from "@repo/timo-design-system/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { getGetHomeQueryKey } from "@/api/generated/endpoints/home/home";
import {
  useChangeStatus,
  useCompleteTimer,
  useExtendTimer,
  useStopTimer,
  getGetActiveTimerQueryKey,
} from "@/api/generated/endpoints/timer/timer";
import { Timer } from "@/components/timer/Timer";
import {
  TimerSessionControls,
  type TimerSessionControlsHandle,
} from "@/components/timer/TimerSessionControls";
import { useActiveTimer } from "@/hooks/use-active-timer";
import { useTimerOvertime } from "@/hooks/use-timer-overtime";
import { convertDurationToMinutes } from "@/utils/convert-duration-to-minutes";
import { convertDurationToTimeText } from "@/utils/convert-duration-to-time-text";

export const TimerPanel = () => {
  const queryClient = useQueryClient();
  const [feedbackText, setFeedbackText] = useState<string | undefined>();
  const timerSessionControlsRef = useRef<TimerSessionControlsHandle>(null);
  const wasTimeUpRef = useRef(false);

  const { data: activeTimer } = useActiveTimer();

  const invalidateActiveTimer = () =>
    queryClient.invalidateQueries({ queryKey: getGetActiveTimerQueryKey() });
  const invalidateHomeView = () =>
    queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });

  const { mutate: changeStatus } = useChangeStatus({
    mutation: {
      onSuccess: () => {
        invalidateActiveTimer();
        invalidateHomeView();
      },
    },
  });
  const { mutate: extendTimer } = useExtendTimer({
    mutation: { onSuccess: invalidateActiveTimer },
  });
  const { mutate: completeTimer } = useCompleteTimer({
    mutation: {
      onSuccess: (response) => {
        setFeedbackText(response.data?.aiFeedback ?? undefined);
        invalidateActiveTimer();
        invalidateHomeView();
      },
    },
  });
  const { mutate: stopTimer } = useStopTimer({
    mutation: {
      onSuccess: (response) => {
        setFeedbackText(response.data?.aiFeedback ?? undefined);
        invalidateActiveTimer();
        invalidateHomeView();
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
    }
    wasTimeUpRef.current = isTimeUp;
  }, [isTimeUp]);

  const handleTogglePlay = () => {
    if (!activeTimer) return;

    changeStatus({
      timerId: activeTimer.timerId,
      data: { action: isRunning ? "PAUSE" : "RESUME" },
    });
  };

  const handleExtendTimer = (minutes: number) => {
    if (!activeTimer) return;

    if (isTimeUp) {
      markOvertimeStart(
        activeTimer.timerId,
        activeTimer.plannedSeconds + activeTimer.extendedSeconds,
      );
    }

    extendTimer({
      timerId: activeTimer.timerId,
      data: { extendMinutes: minutes },
    });
  };

  const handleCompleteTimer = () => {
    if (!activeTimer) return;

    completeTimer({ timerId: activeTimer.timerId });
  };

  const handleStopTimer = () => {
    if (!activeTimer) return;

    stopTimer({ timerId: activeTimer.timerId });
  };

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
        icon={activeTimer ? <TimerOnIcon /> : undefined}
        time={convertDurationToTimeText(remainingSeconds)}
        plannedLabel={`${plannedMinutes}M`}
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
