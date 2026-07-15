import {
  useGetCalendar,
  useGetDaily,
  useGetSummary,
} from "@/api/generated/endpoints/statistics/statistics";

export const useStatisticsSummaryQuery = (yearMonth: string) => {
  return useGetSummary({ yearMonth });
};

export const useStatisticsDailyQuery = (date: string) => {
  return useGetDaily({ date });
};

export const useStatisticsCalendarQuery = (yearMonth: string) => {
  return useGetCalendar({ yearMonth });
};
