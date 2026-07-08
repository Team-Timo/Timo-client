import type { ApiDayOfWeek } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

import { getDayOfWeekKey } from "@/utils/get-day-of-week-key";

/**
 * 날짜를 홈 화면 API/i18n 키 형식의 요일 값으로 변환한다.
 * @param date - 변환할 날짜
 * @returns "SUN"~"SAT" 형식의 요일 키
 */
export const getApiDayOfWeek = (date: Date): ApiDayOfWeek =>
  getDayOfWeekKey(date) as ApiDayOfWeek;
