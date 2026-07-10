export interface CalendarDate {
  date: Date;
  day: number;
}

export const getLastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * 주어진 월에 포함된 날짜 목록을 반환합니다.
 * 이전/다음 달 날짜는 포함하지 않고 현재 월 날짜만 생성합니다.
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
 */
export const getFirstDayOffset = (month: Date) => {
  const firstDate = new Date(month.getFullYear(), month.getMonth(), 1);

  return (firstDate.getDay() + 6) % 7;
};

/**
 * Date 객체를 API 응답 날짜 형식인 yyyy-MM-dd 문자열로 변환합니다.
 * 날짜별 completionRate를 매칭할 때 사용합니다.
 */
export const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};
