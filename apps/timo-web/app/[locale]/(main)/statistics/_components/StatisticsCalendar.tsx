import {
  StatisticsClockEmptyIcon,
  StatisticsClockFilledIcon,
  StatisticsClockLightIcon,
  StatisticsClockOutlineIcon,
} from "@repo/timo-design-system/icons";
import { cn } from "@repo/timo-design-system/utils";

import type { StatisticsCalendarResponse } from "@/app/[locale]/(main)/statistics/_types/statistics";

import {
  formatStatisticsCalendarDate,
  formatStatisticsMonth,
} from "@/app/[locale]/(main)/statistics/_utils/formatStatisticsDate";
import {
  formatDateKey,
  getCalendarDates,
  getFirstDayOffset,
} from "@/app/[locale]/(main)/statistics/_utils/statisticsCalendar";

type CalendarIconStatus = "disabled" | "empty" | "outline" | "light" | "filled";

const DisabledClockIcon = () => (
  <div className="bg-timo-gray-300 size-16.5 rounded-full" />
);

const STATUS_ICON = {
  disabled: DisabledClockIcon,
  empty: StatisticsClockEmptyIcon,
  outline: StatisticsClockOutlineIcon,
  light: StatisticsClockLightIcon,
  filled: StatisticsClockFilledIcon,
};

const getIconStatus = (completionRate: number | null): CalendarIconStatus => {
  if (completionRate === null) return "disabled";
  if (completionRate === 0) return "empty";
  if (completionRate < 50) return "outline";
  if (completionRate < 100) return "light";
  return "filled";
};

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

interface StatisticsCalendarProps {
  currentMonth: Date;
  calendarData: StatisticsCalendarResponse;
}

export const StatisticsCalendar = ({
  currentMonth,
  calendarData,
}: StatisticsCalendarProps) => {
  const today = new Date(calendarData.today);
  const calendarDates = getCalendarDates(currentMonth);
  const firstDayOffset = getFirstDayOffset(currentMonth);
  const completionRateByDate = new Map(
    calendarData.days.map(({ date, completionRate }) => [date, completionRate]),
  );
  const todayLabel = formatStatisticsCalendarDate(today);

  return (
    <section className="w-full px-14.75 pt-10 pb-13">
      <div className="w-199.5">
        <div className="mb-17.25">
          <h1 className="typo-headline-b-30 text-timo-gray-900">
            {formatStatisticsMonth(currentMonth)}
          </h1>

          <p className="typo-headline-m-14 text-timo-black mt-2">
            {todayLabel}
          </p>
        </div>

        <div className="grid grid-cols-7 gap-x-14 gap-y-5">
          {WEEKDAYS.map((weekday, index) => (
            <div
              key={`${weekday}-${index}`}
              className={cn(
                "typo-body-r-12 flex h-6 items-center justify-center",
                index >= 5 ? "text-timo-red" : "text-timo-gray-900",
              )}
            >
              {weekday}
            </div>
          ))}

          {Array.from({ length: firstDayOffset }, (_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {calendarDates.map((calendarDate) => {
            const dateKey = formatDateKey(calendarDate.date);
            const completionRate = completionRateByDate.get(dateKey) ?? null;
            const status = getIconStatus(completionRate);
            const Icon = STATUS_ICON[status];

            return (
              <div
                key={calendarDate.date.toISOString()}
                className="flex flex-col items-center gap-2.5"
              >
                <Icon />
                <span className="typo-body-sb-11 text-timo-gray-700">
                  {calendarDate.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
