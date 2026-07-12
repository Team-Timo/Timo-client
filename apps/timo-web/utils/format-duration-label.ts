import { MINUTES_PER_HOUR } from "@/constants/time";

/**
 * 분(minutes) 단위의 지속 시간을 시·분 라벨 문자열로 변환합니다.
 *
 * @param totalMinutes - 변환할 지속 시간 (분 단위, 0 이상의 정수)
 * @param hourUnit - 시간 단위를 나타내는 텍스트 (예: "시간", "h")
 * @param minuteUnit - 분 단위를 나타내는 텍스트 (예: "분", "m")
 * @returns 시간이 0이면 분만, 분이 0이면 시간만, 둘 다 있으면 "시간 분" 형식으로 반환
 *
 * @example
 * formatDurationLabel(90, "시간", "분")  // "1시간 30분"
 * formatDurationLabel(45, "시간", "분")  // "45분"
 * formatDurationLabel(120, "시간", "분") // "2시간"
 */
export const formatDurationLabel = (
  totalMinutes: number,
  hourUnit: string,
  minuteUnit: string,
): string => {
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;

  if (hours === 0) return `${minutes}${minuteUnit}`;
  if (minutes === 0) return `${hours}${hourUnit}`;

  return `${hours}${hourUnit} ${minutes}${minuteUnit}`;
};
