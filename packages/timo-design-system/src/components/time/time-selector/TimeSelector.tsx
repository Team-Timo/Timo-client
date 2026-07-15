import { AiDefaultIcon, AiWhiteIcon } from "../../../icons";
import { cn } from "../../../lib";
import { Dropdown } from "../../layout/dropdown/Dropdown";

import type { ChangeEvent, ReactNode } from "react";

export type TimeSelection = number | "ai";

export interface TimeOption {
  minute: number;
  value: string;
  unit: string;
}

export interface TimeSelectorProps {
  trigger: ReactNode | ((isOpen: boolean) => ReactNode);
  time?: string;
  onTimeChange?: (time: string) => void;
  times: TimeOption[];
  selected?: TimeSelection;
  onSelect?: (value: TimeSelection) => void;
  onOpen?: () => void;
}

const TIME_SEGMENT_DIGIT_LIMIT = 2;
const MAX_SECONDS = 59;

const sanitizeTimeSegment = (raw: string): string =>
  raw.replace(/\D/g, "").slice(0, TIME_SEGMENT_DIGIT_LIMIT);

const sanitizeSecondsSegment = (raw: string): string => {
  const digitsOnly = sanitizeTimeSegment(raw);

  if (digitsOnly.length < TIME_SEGMENT_DIGIT_LIMIT) return digitsOnly;

  return Math.min(Number(digitsOnly), MAX_SECONDS)
    .toString()
    .padStart(TIME_SEGMENT_DIGIT_LIMIT, "0");
};

export const TimeSelector = ({
  trigger,
  time = "00:00",
  onTimeChange,
  times,
  selected,
  onSelect,
  onOpen,
}: TimeSelectorProps) => {
  const isAiSelected = selected === "ai";
  const [minutesText = "00", secondsText = "00"] = time.split(":");

  const handleMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTimeChange?.(`${sanitizeTimeSegment(event.target.value)}:${secondsText}`);
  };

  const handleSecondsChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTimeChange?.(
      `${minutesText}:${sanitizeSecondsSegment(event.target.value)}`,
    );
  };

  return (
    <Dropdown
      className="flex justify-center"
      onOpenChange={(isOpen) => {
        if (isOpen) onOpen?.();
      }}
    >
      <Dropdown.Trigger>{trigger}</Dropdown.Trigger>

      <Dropdown.Panel className="shadow-timo w-23.75">
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

          <div className="flex min-w-0 flex-1 items-center justify-end gap-0.5">
            <input
              type="text"
              inputMode="numeric"
              value={minutesText}
              onChange={handleMinutesChange}
              maxLength={TIME_SEGMENT_DIGIT_LIMIT}
              aria-label="예상 시간(시간) 입력"
              className={cn(
                "typo-headline-r-14 focus-visible:ring-timo-blue-300 w-4.5 shrink-0 rounded-xs bg-transparent text-right outline-none focus-visible:ring-2",
                isAiSelected ? "text-white" : "text-timo-black",
              )}
            />
            <span
              className={cn(
                "typo-headline-r-14",
                isAiSelected ? "text-white" : "text-timo-black",
              )}
            >
              :
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={secondsText}
              onChange={handleSecondsChange}
              maxLength={TIME_SEGMENT_DIGIT_LIMIT}
              aria-label="예상 시간(분) 입력"
              className={cn(
                "typo-headline-r-14 focus-visible:ring-timo-blue-300 w-4.5 shrink-0 rounded-xs bg-transparent text-right outline-none focus-visible:ring-2",
                isAiSelected ? "text-white" : "text-timo-black",
              )}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-1.5">
          {times.map(({ minute, value, unit }) => {
            const isSelected = minute === selected;

            return (
              <Dropdown.Item
                key={minute}
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
