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
    (mode: HomeViewMode, date: Date, options?: { pushHistory?: boolean }) => {
      const params = new URLSearchParams();

      if (mode === "week") {
        params.set(VIEW_PARAM, WEEK_VIEW_VALUE);
      }

      const dateKey = formatDateKey(date);
      if (dateKey !== formatDateKey(getToday())) {
        params.set(DATE_PARAM, dateKey);
      }

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      if (options?.pushHistory) {
        router.push(url);
        return;
      }

      router.replace(url);
    },
    [pathname, router],
  );

  const setViewMode = useCallback(
    (mode: HomeViewMode) => {
      // 뷰 전환은 뒤로가기로 이전 뷰(기본/7일)로 되돌아올 수 있도록 히스토리에 남긴다.
      navigate(mode, mode === "week" ? referenceDate : getToday(), {
        pushHistory: true,
      });
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
