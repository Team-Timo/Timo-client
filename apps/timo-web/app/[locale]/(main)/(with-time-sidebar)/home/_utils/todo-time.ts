import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "@/constants/time";

/**
 * 초 단위 duration을 "H:MM" 형식의 텍스트로 변환한다.
 * @param durationSeconds - 변환할 시간(초)
 * @returns "H:MM" 형식의 시간 텍스트 (예: 7200초 → "2:00")
 */
export const convertDurationToTimeText = (durationSeconds: number): string => {
  const hours = Math.floor(durationSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (durationSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};
