import type { HomeViewDay } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

export const reorderDaysTodayFirst = (days: HomeViewDay[]): HomeViewDay[] => {
  const todayIndex = days.findIndex((day) => day.isToday);

  if (todayIndex === -1) {
    return days;
  }

  const upcoming = days.slice(todayIndex);
  const past = days.slice(0, todayIndex);
  return [...upcoming, ...past];
};
