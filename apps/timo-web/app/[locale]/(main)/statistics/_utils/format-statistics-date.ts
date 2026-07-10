/**
 * 통계 캘린더 헤더에 표시할 월 이름을 반환합니다.
 *
 * @param date - 월 이름을 가져올 날짜
 * @param locale - 날짜 표기에 사용할 locale 값
 * @returns locale에 맞게 변환된 월 이름
 *
 * @example
 * formatStatisticsMonth(new Date(2026, 5, 1)); // "6월"
 */
export const formatStatisticsMonth = (date: Date, locale = "ko") => {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(date);
};

/**
 * 통계 캘린더 설명 영역에 표시할 날짜 문구를 반환합니다.
 *
 * @param date - 표시할 날짜
 * @param locale - 날짜 표기에 사용할 locale 값
 * @returns 년, 월, 일, 요일이 포함된 날짜 문구
 *
 * @example
 * formatStatisticsCalendarDate(new Date(2026, 5, 28)); // "2026년 6월 28일 일요일"
 */
export const formatStatisticsCalendarDate = (date: Date, locale = "ko") => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
};
