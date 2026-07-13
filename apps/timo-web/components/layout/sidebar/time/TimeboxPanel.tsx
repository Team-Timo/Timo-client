"use client";

import { useEffect, useState } from "react";

import { getHourLabel } from "@/utils/date/get-hour-label";

const HOURS_IN_DAY = 24;
const HOUR_LINES = HOURS_IN_DAY + 1;
const ROW_HEIGHT = 30;
const CLOCK_TICK_INTERVAL_MS = 30_000;

export interface TimeboxPanelProps {
  currentTime?: Date;
}

export const TimeboxPanel = ({ currentTime }: TimeboxPanelProps) => {
  const [now, setNow] = useState(() => currentTime ?? new Date());

  useEffect(() => {
    if (currentTime) return;

    const intervalId = setInterval(() => {
      setNow(new Date());
    }, CLOCK_TICK_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [currentTime]);

  const time = currentTime ?? now;
  const currentMinuteRatio = time.getMinutes() / 60;
  const currentTimeOffset = (time.getHours() + currentMinuteRatio) * ROW_HEIGHT;

  return (
    <div className="relative" style={{ height: HOURS_IN_DAY * ROW_HEIGHT }}>
      <ul>
        {Array.from({ length: HOUR_LINES }, (_, hour) => (
          <li
            key={hour}
            className="absolute left-0 flex w-full -translate-y-1/2 items-center gap-2"
            style={{ top: hour * ROW_HEIGHT }}
          >
            <span className="typo-body-sb-12 text-timo-gray-700 w-8.75 shrink-0 text-right">
              {getHourLabel(hour)}
            </span>
            <span className="bg-timo-gray-600 h-px flex-1" />
          </li>
        ))}
      </ul>

      <span
        aria-hidden="true"
        className="bg-timo-red pointer-events-none absolute right-0 left-10.75 h-px"
        style={{ top: currentTimeOffset }}
      />
    </div>
  );
};
