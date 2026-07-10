/**
 * ISO 8601 날짜 문자열을 "M/D" 형식으로 변환합니다.
 *
 * @param isoDate - ISO 8601 형식의 날짜 문자열 (예: "2025-07-10T00:00:00Z")
 * @returns "월/일" 형식의 날짜 문자열 (예: "7/10")
 *
 * @example
 * formatDate("2025-07-10T00:00:00Z") // "7/10"
 * formatDate("2025-01-01T00:00:00Z") // "1/1"
 */
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};
