import type { HomeViewDay } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

/**
 * 기본 뷰(가로 스크롤)에서 오늘 날짜가 맨 앞에 오도록 days 배열을 회전시킨다.
 * 오늘 이전의 날짜들은 순서를 유지한 채 배열 끝으로 옮겨진다.
 * @param days - 재정렬할 날짜 목록
 * @returns 오늘부터 시작하도록 재정렬된 날짜 목록 (오늘이 없으면 원본 그대로 반환)
 */
export const reorderDaysTodayFirst = (days: HomeViewDay[]): HomeViewDay[] => {
  const todayIndex = days.findIndex((day) => day.isToday);

  if (todayIndex === -1) {
    return days;
  }

  const upcoming = days.slice(todayIndex);
  const past = days.slice(0, todayIndex);
  return [...upcoming, ...past];
};
