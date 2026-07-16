"use client";

import { useQueryClient } from "@tanstack/react-query";

import {
  getGetCalendarQueryKey,
  getGetDailyQueryKey,
  getGetSummaryQueryKey,
} from "@/api/generated/endpoints/statistics/statistics";

export const useStatisticsQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateStatistics = () => {
    queryClient.invalidateQueries({ queryKey: getGetSummaryQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetDailyQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetCalendarQueryKey() });
  };

  return {
    invalidateStatistics,
  };
};
