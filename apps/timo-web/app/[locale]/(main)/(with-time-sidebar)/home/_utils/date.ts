import { formatDateKey } from "@/utils/date";

/**
 * 날짜를 화면 표시용 텍스트로 변환한다. 매월 1일에는 "M.D" 형식을,
 * 그 외에는 일(day)만 표시한다.
 * @param date - 변환할 날짜
 * @returns 표시용 날짜 텍스트 (예: 1일 → "7.1", 그 외 → "15")
 */
export const convertDateToDateText = (date: Date): string => {
  const day = date.getDate();

  if (day === 1) {
    return `${date.getMonth() + 1}.${day}`;
  }

  return `${day}`;
};

/** API 명세의 date 필드(yyyy-MM-dd) 포맷 변환. formatDateKey와 동일한 포맷을 사용한다. */
export const formatDateToIsoDate = (date: Date): string => formatDateKey(date);
