import { useState } from "react";

import { cn } from "../../lib";
import { WeeklyButton } from "../button/chevron-button/ChevronButton";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface CalendarDate {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
}

const getCalendarDates = (month: Date): CalendarDate[] => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDate = new Date(year, monthIndex, 1);
  const firstDay = firstDate.getDay();
  const lastDate = new Date(year, monthIndex + 1, 0);
  const lastDay = lastDate.getDate();

  const calendarCellCount = firstDay + lastDay > 35 ? 42 : 35;

  const startDate = new Date(year, monthIndex, 1 - firstDay);

  return Array.from({ length: calendarCellCount }, (_, index) => {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + index,
    );

    return {
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === monthIndex,
    };
  });
};

export interface CalendarProps {
  value?: Date;
  defaultMonth?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

export const Calendar = ({
  value,
  defaultMonth,
  onChange,
  className,
}: CalendarProps) => {
  const [visibleMonth, setVisibleMonth] = useState(
    defaultMonth ?? value ?? new Date(),
  );
  const calendarDates = getCalendarDates(visibleMonth);
  const today = new Date();
  const isSameDate = (a: Date, b: Date) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  const handleMoveMonth = (amount: number) => {
    setVisibleMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + amount, 1),
    );
  };

  return (
    <div
      className={cn("h-66 w-67 rounded-[4px] bg-white px-6 py-4", className)}
    >
      <div className="relative mb-4 h-8">
        <WeeklyButton
          variant="left"
          onClick={() => moveMonth(-1)}
          className="absolute top-0 left-0"
        />

        <div className="flex h-full items-center justify-center gap-1">
          <span className="typo-headline-b-16 text-timo-gray-700">
            {MONTH_LABELS[visibleMonth.getMonth()]}
          </span>
          <span className="typo-headline-b-16 text-timo-gray-700">
            {visibleMonth.getFullYear()}
          </span>
        </div>

        <WeeklyButton
          variant="right"
          onClick={() => moveMonth(1)}
          className="absolute top-0 right-0"
        />
      </div>

      <div className={cn("grid grid-cols-7 grid-rows-6 gap-x-1 gap-y-1.5")}>
        {WEEKDAYS.map((weekday, index) => (
          <div
            key={`${weekday}-${index}`}
            className="typo-headline-b-16 text-timo-gray-900 flex items-center justify-center"
          >
            {weekday}
          </div>
        ))}

        {calendarDates.map((calendarDate) => {
          const isSelected = value
            ? isSameDate(calendarDate.date, value)
            : false;
          const isToday = isSameDate(calendarDate.date, today);

          return (
            <button
              key={calendarDate.date.toISOString()}
              type="button"
              onClick={() => {
                if (!calendarDate.isCurrentMonth) {
                  setVisibleMonth(
                    new Date(
                      calendarDate.date.getFullYear(),
                      calendarDate.date.getMonth(),
                      1,
                    ),
                  );
                }

                onChange?.(calendarDate.date);
              }}
              className={cn(
                "flex h-6.5 w-7 items-center justify-center",
                isToday ? "typo-headline-b-14" : "typo-headline-r-14",
                calendarDate.isCurrentMonth
                  ? "text-timo-gray-700"
                  : "text-timo-gray-500",
                isToday && "text-timo-gray-900",
                isSelected && "bg-timo-blue-300 rounded-[4px] text-white",
              )}
            >
              {calendarDate.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
