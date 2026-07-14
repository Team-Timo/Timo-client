"use client";

import { cn } from "@repo/timo-design-system/utils";
import { useEffect, useRef } from "react";

import type { ReactNode } from "react";

/** 이 값보다 렌더링 간격이 벌어지면(화면 전환, 오버타임 전환 등) 스냅으로 처리하고, 그 이하는 매초 틱으로 보고 부드럽게 이어그린다 */
const JUMP_GAP_MS = 1500;

export type TimerSize = "sm" | "lg";
export type IconType = ReactNode;

export interface TimerProps {
  icon?: IconType;
  time: string;
  plannedLabel: string;
  progress: number;
  size: TimerSize;
  isOvertime?: boolean;
  overtimeProgress?: number;
}

interface TimerSizeConfig {
  diameter: number;
  strokeWidth: number;
  timeClassName: string;
  plannedClassName: string;
}

const TIMER_SIZE_CONFIG: Record<TimerSize, TimerSizeConfig> = {
  sm: {
    diameter: 242,
    strokeWidth: 23.12,
    timeClassName: "typo-headline-b-40",
    plannedClassName: "typo-headline-m-20",
  },
  lg: {
    diameter: 360,
    strokeWidth: 34.39,
    timeClassName: "typo-headline-b-50",
    plannedClassName: "typo-headline-m-26",
  },
};

export const Timer = ({
  icon,
  time,
  plannedLabel,
  progress,
  size,
  isOvertime = false,
  overtimeProgress = 0,
}: TimerProps) => {
  const { diameter, strokeWidth, timeClassName, plannedClassName } =
    TIMER_SIZE_CONFIG[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const sweepProgress = isOvertime ? overtimeProgress : progress;
  const clampedProgress = Math.min(100, Math.max(0, sweepProgress));
  const dashOffset = circumference * (1 - clampedProgress / 100);

  const prevRenderRef = useRef({ time: Date.now(), isOvertime });
  const now = Date.now();
  const isJump =
    prevRenderRef.current.isOvertime !== isOvertime ||
    now - prevRenderRef.current.time > JUMP_GAP_MS;

  useEffect(() => {
    prevRenderRef.current = { time: now, isOvertime };
  });

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: diameter, height: diameter }}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          className={cn(
            isOvertime ? "stroke-timo-blue-300" : "stroke-timo-blue-50",
          )}
          strokeWidth={strokeWidth}
        />

        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          className={cn(
            !isJump &&
              "transition-[stroke-dashoffset] duration-1000 ease-linear",
            isOvertime ? "stroke-timo-yellow-300" : "stroke-timo-blue-300",
          )}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>

      <div className="flex w-[130px] flex-col items-center gap-[5px]">
        {icon && (
          // TODO: 아이콘 핸드오프시 변경 예정
          <span className="bg-timo-yellow-300 flex size-10 items-center justify-center rounded-full p-2">
            {icon}
          </span>
        )}

        <p
          className={cn(
            timeClassName,
            "text-center",
            isOvertime ? "text-timo-blue-300" : "text-timo-black",
          )}
        >
          {time}
        </p>

        <p
          className={cn(
            plannedClassName,
            "text-center",
            isOvertime ? "text-timo-blue-300" : "text-timo-gray-800",
          )}
        >
          {plannedLabel}
        </p>
      </div>
    </div>
  );
};
