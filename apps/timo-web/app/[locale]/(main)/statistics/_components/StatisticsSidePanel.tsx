import { StatisticsMonthSummary } from "../_types/statistics";
import { formatStatisticsHourText } from "../_utils/formatStatisticsTime";

interface StatisticsMonthSummaryPanelProps {
  summary: StatisticsMonthSummary;
}

export const StatisticsSidePanel = ({
  summary,
}: StatisticsMonthSummaryPanelProps) => {
  return (
    <aside className="border-timo-gray-500 border-timo-gray-500h-full w-76 border-l pt-20.75 pb-148">
      <div className="flex h-46.25 flex-col gap-5">
        <div className="px-7.5 py-2.5">
          <p className="typo-headline-r-14 text-timo-gray-700">
            이번 달의 총 기록 시간
          </p>
          <strong className="typo-headline-b-30 text-timo-black">
            {formatStatisticsHourText(summary.totalRecordMinutes)}
          </strong>
        </div>

        <dl className="typo-headline-r-14 flex flex-col gap-2 px-7.5">
          <div className="flex items-center gap-3">
            <dt className="text-timo-gray-900">활동일</dt>
            <dd className="text-timo-black">{summary.activeDayCount}일</dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="text-timo-gray-900">일평균</dt>
            <dd className="text-timo-black">
              {formatStatisticsHourText(summary.averageRecordedMinutes)}
            </dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="text-timo-gray-900">누적 태스크</dt>
            <dd className="text-timo-black">
              {summary.completedTodoCount}/{summary.totalTodoCount}
            </dd>
          </div>
        </dl>
      </div>
    </aside>
  );
};
