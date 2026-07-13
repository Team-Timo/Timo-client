import {
  StatisticsClockEmptyIcon,
  StatisticsClockFilledIcon,
  StatisticsClockLightIcon,
  StatisticsClockOutlineIcon,
} from "@repo/timo-design-system/icons";
import { cn } from "@repo/timo-design-system/utils";
import { useLocale } from "next-intl";

import type { StatisticsCalendarResponse } from "@/app/[locale]/(main)/statistics/_types/statistics";

import {
  formatStatisticsCalendarDate,
  formatStatisticsMonth,
} from "@/app/[locale]/(main)/statistics/_utils/format-statistics-date";
import {
  getCalendarDates,
  getFirstDayOffset,
} from "@/app/[locale]/(main)/statistics/_utils/statistics-calendar";
import { formatDateKey } from "@/utils/date/date";

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

const getIconStatus = (
  completionRate: number | null,
  isFutureDate: boolean,
): CalendarIconStatus => {
  if (isFutureDate) return "disabled";
  if (completionRate === null || completionRate === 0) return "empty";
  if (completionRate < 50) return "outline";
  if (completionRate < 100) return "light";
  return "filled";
};

const getDateTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const WEEKDAYS = [
  { label: "M", ariaLabel: "Monday" },
  { label: "T", ariaLabel: "Tuesday" },
  { label: "W", ariaLabel: "Wednesday" },
  { label: "T", ariaLabel: "Thursday" },
  { label: "F", ariaLabel: "Friday" },
  { label: "S", ariaLabel: "Saturday" },
  { label: "S", ariaLabel: "Sunday" },
];

interface StatisticsCalendarProps {
  currentMonth: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  calendarData: StatisticsCalendarResponse;
}

export const StatisticsCalendar = ({
  currentMonth,
  selectedDate,
  onSelectDate,
  calendarData,
}: StatisticsCalendarProps) => {
  const locale = useLocale();
  const today = new Date(calendarData.today);
  const calendarDates = getCalendarDates(currentMonth);
  const firstDayOffset = getFirstDayOffset(currentMonth);
  const completionRateByDate = new Map(
    calendarData.days.map(({ date, completionRate }) => [date, completionRate]),
  );
  const todayLabel = formatStatisticsCalendarDate(today, locale);
  const todayTime = getDateTime(today);

  return (
    <section className="min-w-0 flex-1 overflow-x-auto px-14.75 pt-10 pb-13">
      <div className="w-199.5">
        <div className="sticky top-0 z-10 bg-white pb-5">
          <div className="pb-[69px]">
            <h1 className="typo-headline-b-30 text-timo-gray-900">
              {formatStatisticsMonth(currentMonth, locale)}
            </h1>

            <p className="typo-headline-m-14 text-timo-black mt-2">
              {todayLabel}
            </p>
          </div>

          <div className="grid grid-cols-7 gap-x-14">
            {WEEKDAYS.map(({ label, ariaLabel }, index) => (
              <div
                key={ariaLabel}
                aria-label={ariaLabel}
                className={cn(
                  "typo-body-r-12 flex h-6 items-center justify-center",
                  index >= 5 ? "text-timo-red" : "text-timo-gray-900",
                )}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-x-14 gap-y-5 bg-white">
          {Array.from({ length: firstDayOffset }, (_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {calendarDates.map((calendarDate) => {
            const dateKey = formatDateKey(calendarDate.date);
            const isSelected = dateKey === formatDateKey(selectedDate);
            const isFutureDate = getDateTime(calendarDate.date) > todayTime;
            const completionRate = completionRateByDate.get(dateKey) ?? null;
            const status = getIconStatus(completionRate, isFutureDate);
            const Icon = STATUS_ICON[status];

            return (
              <button
                key={dateKey}
                type="button"
                className="flex flex-col items-center gap-2.5 disabled:cursor-default"
                disabled={isFutureDate}
                onClick={() => onSelectDate(calendarDate.date)}
              >
                <span
                  className={cn(
                    "rounded-full",
                    isSelected &&
                      !isFutureDate &&
                      "drop-shadow-[0_0_10px_var(--color-timo-blue-75)]",
                  )}
                >
                  <Icon />
                </span>
                <span
                  className={cn(
                    "typo-body-sb-11 text-timo-gray-700",
                    isSelected && !isFutureDate && "text-timo-blue-300",
                  )}
                >
                  {calendarDate.day}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
