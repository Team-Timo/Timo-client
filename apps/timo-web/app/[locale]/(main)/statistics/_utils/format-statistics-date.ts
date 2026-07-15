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

const getOrdinalDay = (day: number) => {
  const lastTwoDigits = day % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return `${day}th`;

  const lastDigit = day % 10;
  if (lastDigit === 1) return `${day}st`;
  if (lastDigit === 2) return `${day}nd`;
  if (lastDigit === 3) return `${day}rd`;
  return `${day}th`;
};

const isEnglishLocale = (locale: string) => locale.startsWith("en");

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
  if (isEnglishLocale(locale)) {
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "long",
    }).format(date);
    const month = formatStatisticsMonth(date, locale);

    return `${weekday}, ${getOrdinalDay(date.getDate())} ${month}\n${date.getFullYear()}`;
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
};

/**
 * 통계 사이드 패널 제목에 표시할 날짜 문구를 반환합니다.
 *
 * @param date - 표시할 날짜
 * @param locale - 날짜 표기에 사용할 locale 값
 * @returns 월과 일이 포함된 짧은 날짜 문구
 *
 * @example
 * formatStatisticsSidePanelDate(new Date(2026, 5, 28)); // "6월 28일"
 */
export const formatStatisticsSidePanelDate = (date: Date, locale = "ko") => {
  if (isEnglishLocale(locale)) {
    const month = formatStatisticsMonth(date, locale);

    return `${getOrdinalDay(date.getDate())} ${month}`;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
  }).format(date);
};
