const HOURS_IN_DAY = 24;

/**
 * 0~24시 사이의 시(hour) 값을 12시간제 라벨로 변환합니다.
 * 24는 다음날 자정("12 AM")으로 취급합니다 — 자정~자정(12 AM ~ 11 PM ~ 12 AM)
 * 시간대 경계선처럼 하루를 25개 라벨로 표현할 때 하나의 함수로 처리하기 위함입니다.
 *
 * @param hour - 0~24 사이의 시(hour)
 * @returns "12 AM", "1 PM" 형식의 라벨
 */
export const getHourLabel = (hour: number) => {
  const wrappedHour = hour % HOURS_IN_DAY;
  const period = wrappedHour < 12 ? "AM" : "PM";
  const displayHour = wrappedHour % 12 === 0 ? 12 : wrappedHour % 12;
  return `${displayHour} ${period}`;
};
