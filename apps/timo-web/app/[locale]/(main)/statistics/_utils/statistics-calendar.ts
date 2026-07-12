export interface CalendarDate {
  date: Date;
  day: number;
}

const getLastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * 주어진 월에 포함된 날짜 목록을 반환합니다.
 * 이전/다음 달 날짜는 포함하지 않고 현재 월 날짜만 생성합니다.
 *
 * @param month - 날짜 목록을 생성할 기준 월
 * @returns 해당 월의 날짜와 일자를 담은 배열
 */
export const getCalendarDates = (month: Date): CalendarDate[] => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const lastDay = getLastDayOfMonth(month);

  return Array.from({ length: lastDay }, (_, index) => {
    const day = index + 1;

    return {
      date: new Date(year, monthIndex, day),
      day,
    };
  });
};

/**
 * 월요일 시작 캘린더에서 1일 앞에 필요한 빈 칸 개수를 반환합니다.
 * JS Date.getDay()는 일요일을 0으로 반환하므로 월요일 기준 인덱스로 변환합니다.
 *
 * @param month - 첫 주 offset을 계산할 기준 월
 * @returns 월요일 시작 캘린더에서 1일 앞에 필요한 빈 칸 개수
 */
export const getFirstDayOffset = (month: Date) => {
  const firstDate = new Date(month.getFullYear(), month.getMonth(), 1);

  return (firstDate.getDay() + 6) % 7;
};
