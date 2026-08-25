"use client";

import type { ActiveTimer } from "@/schemas/timer/timer-schema";

import { useTimerOvertimeStore } from "@/stores/timer/useTimerOvertimeStore";

export const useTimerOvertime = (timer: ActiveTimer | undefined) => {
  const timerId = timer?.timerId;
  const overtimeBaseSeconds = useTimerOvertimeStore((state) =>
    state.timerId === timerId ? state.baseSeconds : null,
  );
  const markOvertimeStart = useTimerOvertimeStore(
    (state) => state.markOvertimeStart,
  );

  return { overtimeBaseSeconds, markOvertimeStart };
};
