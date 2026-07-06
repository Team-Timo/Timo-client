import type { ReactNode } from "react";

export type TimerSize = "sm" | "lg";

export interface TimerProps {
  icon: ReactNode;
  time: string;
  durationLabel: string;
  progress: number;
  size: TimerSize;
  isOvertime?: boolean;
  overtimeProgress?: number;
}

interface TimerSizeConfig {
  diameter: number;
  strokeWidth: number;
  timeClassName: string;
  durationClassName: string;
}

const TIMER_SIZE_CONFIG: Record<TimerSize, TimerSizeConfig> = {
  sm: {
    diameter: 242,
    strokeWidth: 23.12,
    timeClassName: "typo-headline-b-40",
    durationClassName: "typo-headline-m-20",
  },
  lg: {
    diameter: 360,
    strokeWidth: 34.39,
    timeClassName: "typo-headline-b-50",
    durationClassName: "typo-headline-m-26",
  },
};

export const Timer = ({
  icon,
  time,
  durationLabel,
  progress,
  size,
  isOvertime = false,
  overtimeProgress = 0,
}: TimerProps) => {
  const { diameter, strokeWidth, timeClassName, durationClassName } =
    TIMER_SIZE_CONFIG[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const sweepProgress = isOvertime ? overtimeProgress : progress;
  const clampedProgress = Math.min(100, Math.max(0, sweepProgress));
  const dashOffset = circumference * (1 - clampedProgress / 100);

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
          className={
            isOvertime ? "stroke-timo-blue-300" : "stroke-timo-blue-50"
          }
          strokeWidth={strokeWidth}
        />

        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          className={`transition-[stroke-dashoffset] duration-1000 ease-linear ${isOvertime ? "stroke-timo-yellow-300" : "stroke-timo-blue-300"}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>

      <div className="flex w-[130px] flex-col items-center gap-[5px]">
        <span className="bg-timo-yellow-300 flex size-10 items-center justify-center rounded-full p-2">
          {icon}
        </span>

        <p
          className={`${timeClassName} text-center ${isOvertime ? "text-timo-blue-300" : "text-timo-black"}`}
        >
          {time}
        </p>

        <p
          className={`${durationClassName} text-center ${isOvertime ? "text-timo-blue-300" : "text-timo-gray-800"}`}
        >
          {durationLabel}
        </p>
      </div>
    </div>
  );
};
