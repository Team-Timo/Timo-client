const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const getStartOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

/** 오늘 날짜의 자정 시각을 반환한다. */
export const getToday = (): Date => getStartOfDay(new Date());

/**
 * 날짜에 일(day) 단위를 더한 새 날짜를 반환한다.
 * @param date - 기준 날짜
 * @param amount - 더할 일수 (음수면 이전 날짜)
 * @returns 계산된 새 날짜 객체 (원본은 변경하지 않음)
 */
export const addDays = (date: Date, amount: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};

/** 두 날짜가 연/월/일 기준으로 같은 날인지 비교한다. */
export const isSameDate = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/**
 * 시작 날짜부터 연속된 날짜 배열을 생성한다.
 * @param start - 시작 날짜
 * @param length - 생성할 날짜 개수
 * @returns start부터 시작해 하루씩 증가하는 날짜 배열
 */
export const buildDateRange = (start: Date, length: number): Date[] =>
  Array.from({ length }, (_, index) => addDays(start, index));

/**
 * 날짜를 "yyyy-MM-dd" 형식의 키 문자열로 변환한다.
 * mock/API에서 날짜를 식별하는 키로 사용된다.
 */
export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * "yyyy-MM-dd" 형식의 키 문자열을 Date로 파싱한다.
 * @param value - 파싱할 날짜 키 문자열
 * @returns 파싱된 Date, 형식이 맞지 않으면 null
 */
export const parseDateKey = (value: string): Date | null => {
  const match = DATE_KEY_PATTERN.exec(value);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
};

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
