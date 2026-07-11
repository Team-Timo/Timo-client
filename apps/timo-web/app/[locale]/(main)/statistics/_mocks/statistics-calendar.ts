import type { StatisticsCalendarResponse } from "@/app/[locale]/(main)/statistics/_types/statistics";

export const MOCK_STATISTICS_CALENDAR: StatisticsCalendarResponse = {
  yearMonth: "2026-07",
  today: "2026-07-10",
  days: [
    { date: "2026-07-01", completionRate: 0 },
    { date: "2026-07-02", completionRate: 25 },
    { date: "2026-07-03", completionRate: 75 },
    { date: "2026-07-04", completionRate: 100 },
    { date: "2026-07-05", completionRate: null },
  ],
};
