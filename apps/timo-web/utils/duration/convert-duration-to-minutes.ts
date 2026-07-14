import { SECONDS_PER_MINUTE } from "@/constants/time";

/**
 * 초(seconds) 단위의 지속 시간을 분(minutes) 단위로 반올림하여 변환합니다.
 *
 * @param durationSeconds - 변환할 지속 시간 (초 단위, 0 이상의 정수)
 * @returns 반올림된 분(minutes) 값
 *
 * @example
 * convertDurationToMinutes(90) // 2
 * convertDurationToMinutes(30) // 1
 */
export const convertDurationToMinutes = (durationSeconds: number): number =>
  Math.round(durationSeconds / SECONDS_PER_MINUTE);
