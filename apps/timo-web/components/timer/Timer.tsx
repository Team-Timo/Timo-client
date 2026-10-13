"use client";

import { IconGraphic } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import { useEffect, useRef } from "react";

import type { TodoIconValue } from "@repo/timo-design-system/ui";

const JUMP_GAP_MS = 1500;

export type TimerSize = "sm" | "lg";

export interface TimerProps {
  icon?: TodoIconValue;
  time: string;
  plannedLabel: string;
  progress: number;
  size: TimerSize;
  isOvertime?: boolean;
  overtimeProgress?: number;
  /** 넘기면 기본 width/height 인라인이 꺼지고 이 클래스가 박스 크기를 전적으로 책임진다 — width/height 유틸리티 클래스를 반드시 포함해야 한다. */
  className?: string;
  timeClassName?: string;
  plannedClassName?: string;
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
  className,
  timeClassName,
  plannedClassName,
}: TimerProps) => {
  const sizeConfig = TIMER_SIZE_CONFIG[size];
  const { diameter, strokeWidth } = sizeConfig;
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
      className={cn("relative flex items-center justify-center", className)}
      style={!className ? { width: diameter, height: diameter } : undefined}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        width="100%"
        height="100%"
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
        {icon && <IconGraphic icon={icon} className="size-10" />}

        <p
          className={cn(
            timeClassName ?? sizeConfig.timeClassName,
            "text-center",
            isOvertime ? "text-timo-blue-300" : "text-timo-black",
          )}
        >
          {time}
        </p>

        <p
          className={cn(
            plannedClassName ?? sizeConfig.plannedClassName,
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
