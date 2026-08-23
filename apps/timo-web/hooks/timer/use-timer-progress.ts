import type { ActiveTimer } from "@/schemas/timer/timer-schema";

import { convertDurationToMinutes } from "@/utils/duration/convert-duration-to-minutes";

export interface UseTimerProgressOptions {
  timer: ActiveTimer | undefined;
  overtimeBaseSeconds: number | null;
  /** 활성 타이머가 없을 때 사용할 계획 시간(초). 기본값 0 */
  fallbackPlannedSeconds?: number;
}

export const useTimerProgress = ({
  timer,
  overtimeBaseSeconds,
  fallbackPlannedSeconds = 0,
}: UseTimerProgressOptions) => {
  const plannedSeconds = timer
    ? timer.plannedSeconds + timer.extendedSeconds
    : fallbackPlannedSeconds;
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
  // 완료 모달의 "계획"은 연장 시간을 제외한 순수 계획 시간만 보여줘야 한다
  const basePlannedMinutes = convertDurationToMinutes(
    timer ? timer.plannedSeconds : fallbackPlannedSeconds,
  );
  const actualMinutes = convertDurationToMinutes(timer?.elapsedSeconds ?? 0);

  return {
    plannedSeconds,
    remainingSeconds,
    progress,
    isOvertime,
    overtimeProgress,
    plannedMinutes,
    basePlannedMinutes,
    actualMinutes,
  };
};
