"use client";

import { useQueryClient } from "@tanstack/react-query";

import { getGetHomeQueryKey } from "@/api/generated/endpoints/home/home";
import { getGetTimeBoxesQueryKey } from "@/api/generated/endpoints/time-box/time-box";
import { getGetActiveTimerQueryKey } from "@/api/generated/endpoints/timer/timer";
import { useStatisticsQueryInvalidation } from "@/hooks/statistics/use-statistics-query-invalidation";

export const useTimerQueryInvalidation = () => {
  const queryClient = useQueryClient();
  const { invalidateStatistics } = useStatisticsQueryInvalidation();

  const invalidateActiveTimer = () =>
    queryClient.invalidateQueries({ queryKey: getGetActiveTimerQueryKey() });
  const invalidateHomeView = () =>
    queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
  const invalidateTimeBoxes = () =>
    queryClient.invalidateQueries({ queryKey: getGetTimeBoxesQueryKey() });
  const invalidateTimerState = () => {
    invalidateActiveTimer();
    invalidateHomeView();
    invalidateTimeBoxes();
    invalidateStatistics();
  };

  return {
    invalidateActiveTimer,
    invalidateHomeView,
    invalidateStatistics,
    invalidateTimeBoxes,
    invalidateTimerState,
  };
};
