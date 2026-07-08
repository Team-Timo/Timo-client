import type { ApiDayOfWeek } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

import { getDayOfWeekKey } from "@/utils/get-day-of-week-key";

export const getApiDayOfWeek = (date: Date): ApiDayOfWeek =>
  getDayOfWeekKey(date) as ApiDayOfWeek;
