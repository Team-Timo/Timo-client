"use client";

import { cn } from "@repo/timo-design-system/utils";
import { useEffect, useState } from "react";

import { useActiveTimer } from "@/hooks/use-active-timer";
import { useTimeBoxes } from "@/queries/use-time-boxes";
import { formatDateKey } from "@/utils/date/date";
import { getHourLabel } from "@/utils/date/get-hour-label";
import { convertDurationToTimeText } from "@/utils/duration/convert-duration-to-time-text";

const HOURS_IN_DAY = 24;
const HOUR_LINES = HOURS_IN_DAY + 1;
const ROW_HEIGHT = 30;
const CLOCK_TICK_INTERVAL_MS = 30_000;
/** 이 시간(분) 미만인 타임박스는 투두명·시간 라벨을 표시하지 않는다 */
const MIN_MINUTES_FOR_LABEL = 30;

export interface TimeboxPanelProps {
  currentTime?: Date;
}

const timeToOffset = (date: Date) =>
  (date.getHours() + date.getMinutes() / 60) * ROW_HEIGHT;

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
  const currentTimeOffset = timeToOffset(time);

  const { data: timeBoxes } = useTimeBoxes(formatDateKey(time));
  const { data: activeTimer } = useActiveTimer();

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

      {timeBoxes?.map((timeBox) => {
        // 현재 활성 타이머와 같은 timerId(=같은 투두)면, 이전에 일시정지로 끊긴 구간이라도
        // "진행 중인 투두"로 보고 진한 파랑으로 표시한다.
        const isRelatedToActiveTimer =
          timeBox.timerId === activeTimer?.timerId &&
          timeBox.todoId === activeTimer?.todoId;
        // 실시간으로 자라는 중인지는 이 세션 자체가 아직 끝나지 않았는지로만 판단한다.
        const isGrowing = !timeBox.endedAt;

        const start = new Date(timeBox.startedAt);
        const end = timeBox.endedAt ? new Date(timeBox.endedAt) : time;

        const startOffset = timeToOffset(start);
        const endOffset = timeToOffset(end);
        const height = Math.max(0, endOffset - startOffset);
        const durationMinutes = Math.max(
          0,
          (end.getTime() - start.getTime()) / 60_000,
        );
        const showLabel = durationMinutes >= MIN_MINUTES_FOR_LABEL;

        return (
          <div
            key={timeBox.sessionId}
            className={cn(
              "absolute right-0 left-10.75 overflow-hidden",
              isRelatedToActiveTimer ? "bg-timo-blue-300" : "bg-timo-blue-65",
              isGrowing ? "rounded-t-[4px]" : "rounded-[4px]",
            )}
            style={{ top: startOffset, height }}
          >
            {showLabel && (
              <div className="flex items-center gap-1 px-1.5 py-1">
                <span
                  className={cn(
                    "typo-body-sb-12 min-w-0 truncate",
                    isRelatedToActiveTimer
                      ? "text-white"
                      : "text-timo-gray-900",
                  )}
                >
                  {timeBox.todoName}
                </span>
                <span
                  className={cn(
                    "typo-body-r-12 shrink-0",
                    isRelatedToActiveTimer
                      ? "text-white"
                      : "text-timo-gray-900",
                  )}
                >
                  {convertDurationToTimeText(durationMinutes * 60)}
                </span>
              </div>
            )}
          </div>
        );
      })}

      <span
        aria-hidden="true"
        className="bg-timo-red pointer-events-none absolute right-0 left-10.75 h-px"
        style={{ top: currentTimeOffset }}
      />
    </div>
  );
};
