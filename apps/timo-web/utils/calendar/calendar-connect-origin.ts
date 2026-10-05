import type { CalendarConnectOrigin } from "@/constants/calendar";

import { CALENDAR_CONNECT_ORIGIN } from "@/constants/calendar";

const CALENDAR_CONNECT_ORIGIN_KEY = "timo:calendar-connect-origin";

const isCalendarConnectOrigin = (
  value: string | null,
): value is CalendarConnectOrigin =>
  Object.values(CALENDAR_CONNECT_ORIGIN).some((origin) => origin === value);

export const setCalendarConnectOrigin = (
  origin: CalendarConnectOrigin,
): void => {
  try {
    window.sessionStorage.setItem(CALENDAR_CONNECT_ORIGIN_KEY, origin);
  } catch {
    // 저장소 접근 불가 시 무시
  }
};

export const consumeCalendarConnectOrigin =
  (): CalendarConnectOrigin | null => {
    try {
      const origin = window.sessionStorage.getItem(CALENDAR_CONNECT_ORIGIN_KEY);
      window.sessionStorage.removeItem(CALENDAR_CONNECT_ORIGIN_KEY);
      return isCalendarConnectOrigin(origin) ? origin : null;
    } catch {
      return null;
    }
  };
