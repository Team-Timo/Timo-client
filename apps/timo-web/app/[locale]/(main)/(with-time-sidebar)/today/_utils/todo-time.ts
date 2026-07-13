import { SECONDS_PER_MINUTE } from "@/constants/time";

/**
 * API duration 필드(mm:ss)를 초 단위로 변환한다.
 * @param duration - "mm:ss" 형식의 시간 문자열
 * @returns 변환된 초
 */
export const convertApiDurationToSeconds = (duration: string): number => {
  const [minutesText, secondsText] = duration.split(":");
  const minutes = Number(minutesText) || 0;
  const seconds = Number(secondsText) || 0;
  return minutes * SECONDS_PER_MINUTE + seconds;
};
