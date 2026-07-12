/**
 * 분 단위 기록 시간을 통계 요약 영역의 시간 텍스트로 변환합니다.
 *
 * @param minutes - 분 단위 기록 시간
 * @returns 화면에 표시할 시간 텍스트
 *
 * @example
 * formatStatisticsHourText(260); // "4h 20m"
 * formatStatisticsHourText(120); // "2h"
 * formatStatisticsHourText(30); // "30m"
 */
export const formatStatisticsHourText = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  if (hours === 0) {
    return `${restMinutes}m`;
  }

  if (restMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${restMinutes}m`;
};

/**
 * 분 단위 기록 시간을 투두별 실제/계획 시간 표기용 시계 텍스트로 변환합니다.
 *
 * @param minutes - 분 단위 기록 시간
 * @returns 시:분 형태의 시간 텍스트
 *
 * @example
 * formatStatisticsClockText(90); // "1:30"
 * formatStatisticsClockText(60); // "1:00"
 */
export const formatStatisticsClockText = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return `${hours}:${String(restMinutes).padStart(2, "0")}`;
};
