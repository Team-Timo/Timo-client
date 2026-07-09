const HOURS_IN_DAY = 24;

/**
 * "HH:MM" 형식의 시간 문자열에서 오전/오후를 판별합니다.
 * 24시("24:00")는 다음날 자정(오전)으로 취급합니다.
 *
 * @param time - "HH:MM" 형식의 시간 문자열
 * @returns "AM" 또는 "PM"
 */
export const getAmPm = (time: string): "AM" | "PM" => {
  const hour = parseInt(time.split(":")[0] ?? "0", 10);
  return hour >= 12 && hour < HOURS_IN_DAY ? "PM" : "AM";
};
