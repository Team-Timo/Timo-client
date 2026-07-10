"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import {
  addDays,
  formatDateKey,
  getToday,
  parseDateKey,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { usePathname, useRouter } from "@/i18n/navigation";

const VIEW_PARAM = "view";
const DATE_PARAM = "date";
const WEEK_VIEW_VALUE = "week";
const DAYS_PER_WEEK = 7;

export type HomeViewMode = "basic" | "week";

export const useHomeViewMode = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isWeekView = searchParams.get(VIEW_PARAM) === WEEK_VIEW_VALUE;

  const referenceDate = useMemo(() => {
    const dateParam = searchParams.get(DATE_PARAM);
    const parsedDate = dateParam ? parseDateKey(dateParam) : null;
    return parsedDate ?? getToday();
  }, [searchParams]);

  const navigate = useCallback(
    (mode: HomeViewMode, date: Date) => {
      const params = new URLSearchParams();

      if (mode === "week") {
        params.set(VIEW_PARAM, WEEK_VIEW_VALUE);
      }

      const dateKey = formatDateKey(date);
      if (dateKey !== formatDateKey(getToday())) {
        params.set(DATE_PARAM, dateKey);
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router],
  );

  const setViewMode = useCallback(
    (mode: HomeViewMode) => {
      navigate(mode, mode === "week" ? referenceDate : getToday());
    },
    [navigate, referenceDate],
  );

  const goToNextWeek = useCallback(() => {
    navigate("week", addDays(referenceDate, DAYS_PER_WEEK));
  }, [navigate, referenceDate]);

  const goToPrevWeek = useCallback(() => {
    navigate("week", addDays(referenceDate, -DAYS_PER_WEEK));
  }, [navigate, referenceDate]);

  const goToToday = useCallback(() => {
    navigate(isWeekView ? "week" : "basic", getToday());
  }, [navigate, isWeekView]);

  return {
    isWeekView,
    referenceDate,
    setViewMode,
    goToNextWeek,
    goToPrevWeek,
    goToToday,
  };
};
