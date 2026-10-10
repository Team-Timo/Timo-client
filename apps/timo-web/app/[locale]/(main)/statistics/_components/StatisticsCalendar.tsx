import {
  StatisticsClockEmptyIcon,
  StatisticsClockFilledIcon,
  StatisticsClockLightIcon,
  StatisticsClockOutlineIcon,
} from "@repo/timo-design-system/icons";
import { cn } from "@repo/timo-design-system/utils";
import { useLocale } from "next-intl";

import type { StatisticsCalendarResponse } from "@/app/[locale]/(main)/statistics/_types/statistics";
import type { MouseEvent } from "react";

import {
  formatStatisticsCalendarDate,
  formatStatisticsMonth,
} from "@/app/[locale]/(main)/statistics/_utils/format-statistics-date";
import {
  getCalendarDates,
  getFirstDayOffset,
} from "@/app/[locale]/(main)/statistics/_utils/statistics-calendar";
import { formatDateKey, parseDateKey } from "@/utils/date/date";

type CalendarIconStatus = "disabled" | "empty" | "outline" | "light" | "filled";

const DisabledClockIcon = ({ className }: { className?: string }) => (
  <div className={cn("bg-timo-gray-300 rounded-full", className)} />
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
  displayDate: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onDeselectDate: () => void;
  calendarData: StatisticsCalendarResponse;
}

export const StatisticsCalendar = ({
  currentMonth,
  displayDate,
  selectedDate,
  onSelectDate,
  onDeselectDate,
  calendarData,
}: StatisticsCalendarProps) => {
  const locale = useLocale();
  const today = parseDateKey(calendarData.today) ?? new Date();
  const calendarDates = getCalendarDates(currentMonth);
  const firstDayOffset = getFirstDayOffset(currentMonth);
  const completionRateByDate = new Map(
    calendarData.days.map(({ date, completionRate }) => [date, completionRate]),
  );
  const selectedDateLabel = formatStatisticsCalendarDate(displayDate, locale);
  const todayTime = getDateTime(today);

  const handleCalendarClick = (event: MouseEvent<HTMLElement>) => {
    if (selectedDate === null) return;
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("button")) return;

    onDeselectDate();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <section
      className="min-w-0 flex-1 px-4 pt-4 pb-8 md:min-h-full md:overflow-x-auto md:px-14.75 md:pt-10 md:pb-13"
      onClick={handleCalendarClick}
    >
      <div className="w-full md:w-199.5">
        <div className="pb-5">
          <div className="flex flex-col gap-2 pb-6 md:pb-[69px]">
            <h1 className="typo-headline-b-24 text-timo-gray-900 md:typo-headline-b-30">
              {formatStatisticsMonth(currentMonth, locale)}
            </h1>

            <p className="typo-headline-m-14 text-timo-black whitespace-pre-line">
              {selectedDateLabel}
            </p>
          </div>

          <div className="grid grid-cols-7 md:gap-x-14">
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

        <div className="grid grid-cols-7 gap-y-3 md:gap-x-14 md:gap-y-5">
          {Array.from({ length: firstDayOffset }, (_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {calendarDates.map((calendarDate) => {
            const dateKey = formatDateKey(calendarDate.date);
            const isSelected =
              selectedDate !== null && dateKey === formatDateKey(selectedDate);
            const isFutureDate = getDateTime(calendarDate.date) > todayTime;
            const completionRate = completionRateByDate.get(dateKey) ?? null;
            const status = getIconStatus(completionRate, isFutureDate);
            const Icon = STATUS_ICON[status];

            return (
              <button
                key={dateKey}
                type="button"
                className="flex min-w-0 flex-col items-center gap-1.5 disabled:cursor-default md:gap-2.5"
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
                  <Icon className="size-9 md:size-16.5" />
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
