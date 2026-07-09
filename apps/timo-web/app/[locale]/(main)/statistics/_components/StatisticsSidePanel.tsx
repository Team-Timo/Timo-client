"use client";

import { TagIcon } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

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

const SIDE_PANEL_CLASS_NAME =
  "border-timo-gray-500 min-h-full w-76 border-l text-timo-black";

const getDiffLabel = (diffMinutes: number) => {
  if (diffMinutes < 0) return "-단축";
  return "+초과";
};

const getDiffClassName = (diffMinutes: number) => {
  if (diffMinutes > 0) return "text-timo-red";
  if (diffMinutes < 0) return "text-timo-blue-300";
  return "invisible";
};

interface SummaryTimeBlockProps {
  label: string;
  minutes: number;
}

const SummaryTimeBlock = ({ label, minutes }: SummaryTimeBlockProps) => (
  <div className="flex flex-col">
    <p className="typo-headline-r-14 text-timo-gray-700">{label}</p>
    <strong className="typo-headline-b-30">
      {formatStatisticsHourText(minutes)}
    </strong>
  </div>
);

export const StatisticsSidePanel = (props: StatisticsSidePanelProps) => {
  if (props.variant === "month") {
    const { summary } = props;

    return (
      <aside className={cn(SIDE_PANEL_CLASS_NAME, "pt-20.75 pb-148")}>
        <div className="flex h-46.25 flex-col gap-5">
          <div className="px-7.5 py-2.5">
            <SummaryTimeBlock
              label="이번 달의 총 기록 시간"
              minutes={summary.totalRecordMinutes}
            />
          </div>

          <dl className="typo-headline-r-14 flex flex-col gap-2 px-7.5">
            <div className="flex items-center gap-3">
              <dt className="text-timo-gray-900">활동일</dt>
              <dd>{summary.activeDayCount}일</dd>
            </div>

            <div className="flex items-center gap-3">
              <dt className="text-timo-gray-900">일평균</dt>
              <dd>
                {formatStatisticsHourText(summary.averageRecordedMinutes)}
              </dd>
            </div>

            <div className="flex items-center gap-3">
              <dt className="text-timo-gray-900">누적 태스크</dt>
              <dd>
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
    <aside className={cn(SIDE_PANEL_CLASS_NAME, "px-7.5 pt-20.5 pb-76")}>
      <div className="flex flex-col gap-6">
        <h2 className="typo-headline-b-24">{detail.date}</h2>

        <SummaryTimeBlock
          label="오늘의 총 기록 시간"
          minutes={detail.totalRecordMinutes}
        />
      </div>

      <ul className="mt-5.5 flex flex-col">
        {detail.todos.map((todo) => {
          const diffMinutes =
            todo.actualTimeMinutes - todo.estimatedTimeMinutes;

          return (
            <li
              key={todo.todoId}
              className="border-timo-gray-500 flex justify-between border-b py-2.5"
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

                <span className={getDiffClassName(diffMinutes)}>
                  {getDiffLabel(diffMinutes)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
