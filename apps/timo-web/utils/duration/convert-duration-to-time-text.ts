import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "@/constants/time";

/**
 * 초(seconds) 단위의 지속 시간을 "HH:MM" 형식의 문자열로 변환합니다.
 * 1분 미만으로 잘려나가는 초는 버리지 않고 분 단위로 올림합니다.
 *
 * @param durationSeconds - 변환할 지속 시간 (초 단위, 0 이상의 정수)
 * @returns "00:00" 형식의 시간 문자열 (시·분 모두 2자리 패딩)
 *
 * @example
 * convertDurationToTimeText(3661) // "01:02"
 * convertDurationToTimeText(53)   // "00:01"
 * convertDurationToTimeText(0)    // "00:00"
 */
export const convertDurationToTimeText = (durationSeconds: number): string => {
  const totalMinutes = Math.ceil(durationSeconds / SECONDS_PER_MINUTE);
  const hours = Math.floor(
    totalMinutes / (SECONDS_PER_HOUR / SECONDS_PER_MINUTE),
  );
  const minutes = totalMinutes % (SECONDS_PER_HOUR / SECONDS_PER_MINUTE);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
