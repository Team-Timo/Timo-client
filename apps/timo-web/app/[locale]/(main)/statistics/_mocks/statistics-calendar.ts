import type {
  StatisticsCalendarResponse,
  StatisticsDayDetail,
  StatisticsMonthSummary,
} from "@/app/[locale]/(main)/statistics/_types/statistics";

const MOCK_YEAR_MONTH = "2026-07";

const MOCK_COMPLETION_RATES = [
  0,
  25,
  75,
  100,
  null,
  25,
  100,
  100,
  100,
  75,
  100,
  25,
  null,
  100,
  75,
  0,
  0,
  100,
  25,
  75,
  75,
  25,
  100,
  25,
  0,
  0,
  100,
  75,
  null,
  null,
  null,
] as const;

const formatMockDate = (day: number) =>
  `${MOCK_YEAR_MONTH}-${String(day).padStart(2, "0")}`;

export const MOCK_STATISTICS_CALENDAR: StatisticsCalendarResponse = {
  yearMonth: MOCK_YEAR_MONTH,
  today: "2026-07-10",
  days: MOCK_COMPLETION_RATES.map((completionRate, index) => ({
    date: formatMockDate(index + 1),
    completionRate,
  })),
};

export const MOCK_STATISTICS_MONTH_SUMMARY: StatisticsMonthSummary = {
  totalRecordMinutes: 1330,
  activeDayCount: 28,
  averageRecordedMinutes: 214,
  completedTodoCount: 80,
  totalTodoCount: 100,
};

export const MOCK_STATISTICS_DAY_DETAILS: Record<string, StatisticsDayDetail> =
  Object.fromEntries(
    MOCK_COMPLETION_RATES.map((completionRate, index) => {
      const day = index + 1;
      const date = formatMockDate(day);
      const totalRecordMinutes =
        completionRate === null ? 0 : 90 + completionRate * 2;

      return [
        date,
        {
          date,
          totalRecordMinutes,
          todos:
            completionRate === null
              ? []
              : [
                  {
                    todoId: day * 2 - 1,
                    title: "통계 뷰 통합",
                    actualTimeMinutes: Math.round(totalRecordMinutes * 0.55),
                    estimatedTimeMinutes: 120,
                    tagName: "개발",
                  },
                  {
                    todoId: day * 2,
                    title: "캘린더 선택 상태 점검",
                    actualTimeMinutes: Math.round(totalRecordMinutes * 0.45),
                    estimatedTimeMinutes: 90,
                    tagName: "QA",
                  },
                ],
        },
      ];
    }),
  );
