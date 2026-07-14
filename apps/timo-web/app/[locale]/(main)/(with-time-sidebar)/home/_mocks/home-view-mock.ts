import type {
  GetHomeViewParams,
  HomeViewData,
  HomeViewDay,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

import { getTodoMocksByDate } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_mocks/todo-mock";
import { getApiDayOfWeek } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/day-of-week";
import {
  addDays,
  buildDateRange,
  formatDateKey,
  getToday,
  isSameDate,
  parseDateKey,
} from "@/utils/date/date";

const BASIC_RANGE_DAYS_BEFORE = 7;
const BASIC_RANGE_LENGTH = 15;
const WEEK_RANGE_LENGTH = 7;

export const getHomeViewMock = ({
  filter,
  baseDate,
}: GetHomeViewParams): HomeViewData => {
  const referenceDate = parseDateKey(baseDate) ?? getToday();

  const dates =
    filter === "WEEK"
      ? buildDateRange(referenceDate, WEEK_RANGE_LENGTH)
      : buildDateRange(
          addDays(referenceDate, -BASIC_RANGE_DAYS_BEFORE),
          BASIC_RANGE_LENGTH,
        );

  const days: HomeViewDay[] = dates.map((date) => {
    const todos = getTodoMocksByDate(date);

    return {
      date: formatDateKey(date),
      dayOfWeek: getApiDayOfWeek(date),
      isHoliday: false,
      isToday: isSameDate(date, getToday()),
      totalCount: todos.length,
      completedCount: todos.filter((todo) => todo.completed).length,
      todos,
    };
  });

  return {
    filter,
    baseDate: formatDateKey(referenceDate),
    days,
  };
};
