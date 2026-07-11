"use client";

import { TagIcon } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";

import type {
  StatisticsDayDetail,
  StatisticsMonthSummary,
} from "@/app/[locale]/(main)/statistics/_types/statistics";

import { SummaryTimeBlock } from "@/app/[locale]/(main)/statistics/_components/SummaryTimeBlock";
import {
  formatStatisticsClockText,
  formatStatisticsHourText,
} from "@/app/[locale]/(main)/statistics/_utils/format-statistics-time";

interface StatisticsMonthSidePanelProps {
  variant: "month";
  summary: StatisticsMonthSummary;
}

interface StatisticsDaySidePanelProps {
  variant: "day";
  detail: StatisticsDayDetail;
}

type StatisticsSidePanelProps =
  | StatisticsMonthSidePanelProps
  | StatisticsDaySidePanelProps;

const SIDE_PANEL_CLASS_NAME =
  "border-timo-gray-500 min-h-full w-[304px] shrink-0 border-l text-timo-black";

const getDiffLabel = (
  diffMinutes: number,
  t: ReturnType<typeof useTranslations<"Statistics.sidePanel">>,
) => {
  if (diffMinutes > 0) return t("overtime");
  if (diffMinutes < 0) return t("shortened");
  return "";
};

const getDiffClassName = (diffMinutes: number) => {
  if (diffMinutes > 0) return "text-timo-red";
  if (diffMinutes < 0) return "text-timo-blue-300";
  return "invisible";
};

export const StatisticsSidePanel = (props: StatisticsSidePanelProps) => {
  const t = useTranslations("Statistics.sidePanel");

  if (props.variant === "month") {
    const { summary } = props;

    return (
      <aside className={cn(SIDE_PANEL_CLASS_NAME, "pt-[83px] pb-148")}>
        <div className="flex h-46.25 flex-col gap-5">
          <div className="px-7.5 py-2.5">
            <SummaryTimeBlock
              label={t("monthTotalRecordTime")}
              minutes={summary.totalRecordMinutes}
            />
          </div>

          <dl className="typo-headline-r-14 flex flex-col gap-2 px-7.5">
            <div className="flex items-center gap-3">
              <dt className="text-timo-gray-900">{t("activeDays")}</dt>
              <dd>{t("activeDayCount", { count: summary.activeDayCount })}</dd>
            </div>

            <div className="flex items-center gap-3">
              <dt className="text-timo-gray-900">{t("dailyAverage")}</dt>
              <dd>
                {formatStatisticsHourText(summary.averageRecordedMinutes)}
              </dd>
            </div>

            <div className="flex items-center gap-3">
              <dt className="text-timo-gray-900">{t("accumulatedTasks")}</dt>
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
          label={t("dayTotalRecordTime")}
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
                  {t("plan")}:{" "}
                  {formatStatisticsClockText(todo.estimatedTimeMinutes)}
                </span>

                <span className={getDiffClassName(diffMinutes)}>
                  {getDiffLabel(diffMinutes, t)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
