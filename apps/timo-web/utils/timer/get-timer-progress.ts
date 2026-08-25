import type { ActiveTimer } from "@/schemas/timer/timer-schema";

import { convertDurationToMinutes } from "@/utils/duration/convert-duration-to-minutes";

export interface GetTimerProgressOptions {
  timer: ActiveTimer | undefined;
  overtimeBaseSeconds: number | null;
  /** 활성 타이머가 없을 때 사용할 계획 시간(초). 기본값 0 */
  fallbackPlannedSeconds?: number;
}

/**
 * 활성 타이머와 초과시간 기준값으로부터 화면에 필요한 진행률 파생값을 계산합니다.
 *
 * @param options.timer - 현재 활성 타이머, 없으면 fallbackPlannedSeconds를 계획 시간으로 사용
 * @param options.overtimeBaseSeconds - 초과시간이 시작된 시점의 경과 초, 초과시간이 아니면 null
 * @param options.fallbackPlannedSeconds - 활성 타이머가 없을 때 사용할 계획 시간(초)
 * @returns 진행률(%), 초과시간 진행률(%), 분 단위로 변환된 계획/실제 시간 등 화면에 필요한 값들
 */
export const getTimerProgress = ({
  timer,
  overtimeBaseSeconds,
  fallbackPlannedSeconds = 0,
}: GetTimerProgressOptions) => {
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
