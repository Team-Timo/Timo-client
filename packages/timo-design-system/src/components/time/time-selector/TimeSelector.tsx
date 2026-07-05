import { Dropdown } from "@components/layout/dropdown/Dropdown";
import { AiDefaultIcon, AiWhiteIcon } from "@icons";
import { cn } from "@lib";

import type { ReactNode } from "react";

export type TimeSelection = number | "ai";

export interface TimeOption {
  minute: number;
  value: string;
  unit: string;
}

export interface TimeSelectorProps {
  trigger: ReactNode;
  time?: string;
  onTimeChange?: (time: string) => void;
  times: TimeOption[];
  selected?: TimeSelection;
  onSelect?: (value: TimeSelection) => void;
}

export const TimeSelector = ({
  trigger,
  time = "00:00",
  onTimeChange,
  times,
  selected,
  onSelect,
}: TimeSelectorProps) => {
  const isAiSelected = selected === "ai";

  return (
    <Dropdown>
      <Dropdown.Trigger>{trigger}</Dropdown.Trigger>

      <Dropdown.Panel className="w-23.75">
        <div
          className={cn(
            "rounded-4 flex w-full items-center gap-2 px-[3.5px] py-[2.5px] transition-colors duration-200 ease-in-out",
            isAiSelected && "bg-timo-blue-300",
          )}
        >
          <button
            type="button"
            onClick={() => onSelect?.("ai")}
            aria-pressed={isAiSelected}
            aria-label="AI 추천 시간 선택"
            className="shrink-0"
          >
            {isAiSelected ? <AiWhiteIcon /> : <AiDefaultIcon />}
          </button>

          <input
            type="text"
            value={time}
            onChange={(event) => onTimeChange?.(event.target.value)}
            aria-label="예상 시간 직접 입력"
            className={cn(
              "typo-headline-r-14 focus-visible:ring-timo-blue-300 min-w-0 flex-1 rounded-xs bg-transparent text-right outline-none focus-visible:ring-2",
              isAiSelected ? "text-white" : "text-timo-black",
            )}
          />
        </div>

        <div className="flex w-full flex-col items-start gap-1.5">
          {times.map(({ minute, value, unit }, index) => {
            const isSelected = minute === selected;

            return (
              <Dropdown.Item
                key={index}
                onClick={() => onSelect?.(minute)}
                aria-pressed={isSelected}
                className={cn(
                  "justify-between px-[3.5px] py-[2.5px]",
                  isSelected && "bg-timo-blue-300",
                )}
              >
                <span
                  className={cn(
                    "typo-headline-r-14 text-timo-black",
                    isSelected && "text-white",
                  )}
                >
                  {value}
                </span>
                <span
                  className={cn(
                    "typo-headline-r-14 text-timo-black",
                    isSelected && "text-white",
                  )}
                >
                  {unit}
                </span>
              </Dropdown.Item>
            );
          })}
        </div>
      </Dropdown.Panel>
    </Dropdown>
  );
};
