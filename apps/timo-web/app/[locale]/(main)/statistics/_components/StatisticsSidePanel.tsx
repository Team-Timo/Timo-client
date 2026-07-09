"use client";

import { TagIcon } from "@repo/timo-design-system/ui";

import {
  formatStatisticsClockText,
  formatStatisticsHourText,
} from "../_utils/formatStatisticsTime";

import type {
  StatisticsDayDetail,
  StatisticsMonthSummary,
} from "../_types/statistics";

type StatisticsSidePanelProps =
  | {
      variant: "month";
      summary: StatisticsMonthSummary;
    }
  | {
      variant: "day";
      detail: StatisticsDayDetail;
    };

export const StatisticsSidePanel = (props: StatisticsSidePanelProps) => {
  if (props.variant === "month") {
    const { summary } = props;

    return (
      <aside className="border-timo-gray-500 h-full w-76 border-l pt-20.75 pb-148">
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
  }
  const { detail } = props;

  return (
    <aside className="border-timo-gray-500 text-timo-black h-full w-76 border-l px-7.5 pt-20.5 pb-76">
      <div className="flex flex-col gap-6">
        <h2 className="typo-headline-b-24">{detail.date}</h2>

        <div className="flex flex-col">
          <p className="typo-headline-r-14 text-timo-gray-700">
            오늘의 총 기록 시간
          </p>
          <strong className="typo-headline-b-30">
            {formatStatisticsHourText(detail.totalRecordMinutes)}
          </strong>
        </div>
      </div>
      <ul className="mt-5.5 flex flex-col">
        {detail.todos.map((todo) => {
          const diffMinutes =
            todo.actualTimeMinutes - todo.estimatedTimeMinutes;

          const diffLabel =
            diffMinutes > 0 ? "+초과" : diffMinutes < 0 ? "-단축" : "+초과";

          const diffClassName =
            diffMinutes > 0
              ? "text-timo-red"
              : diffMinutes < 0
                ? "text-timo-blue-300"
                : "invisible";

          return (
            <li
              key={todo.todoId}
              className="border-timo-gray-500 typo-headline-b-24 flex justify-between border-b py-2.5"
            >
              <div className="flex flex-col items-start gap-2">
                <p className="typo-headline-r-14 text-timo-gray-900">
                  {todo.title}
                </p>
                {todo.tagName && <TagIcon text={todo.tagName} />}
              </div>

              <div className="typo-body-r-12 flex flex-col items-end gap-2">
                <strong className="typo-body-b-12">
                  {formatStatisticsClockText(todo.actualTimeMinutes)}
                </strong>

                <span>
                  계획: {formatStatisticsClockText(todo.estimatedTimeMinutes)}
                </span>

                <span className={diffClassName}>{diffLabel}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
