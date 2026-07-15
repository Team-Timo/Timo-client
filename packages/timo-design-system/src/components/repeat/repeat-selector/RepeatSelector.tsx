"use client";

import { Fragment, useId, useRef, useState } from "react";

import { ChevronDownIcon } from "../../../icons";
import { cn } from "../../../lib";
import { Checkbox } from "../../checkbox/Checkbox";
import { Dropdown } from "../../layout/dropdown/Dropdown";

import type { ReactNode } from "react";

export type RepeatFrequency = "DAILY" | "WEEKLY" | "MONTHLY";

export interface RepeatOption {
  frequency: RepeatFrequency;
  label: string;
}

export interface WeekdayOption {
  id: string;
  label: string;
}

export interface RepeatWeeklyDetail {
  weekdays: WeekdayOption[];
  selectedWeekdayIds: string[];
  onWeekdaysChange?: (weekdayIds: string[]) => void;
}

export interface RepeatMonthlyDetail {
  repeatDayLabel: string;
  repeatDay: string;
  onRepeatDayChange?: (value: string) => void;
}

const DETAIL_ALIGN: Record<RepeatFrequency, string> = {
  DAILY: "items-start",
  WEEKLY: "items-start",
  MONTHLY: "items-end",
};

export interface RepeatSelectorProps {
  trigger: ReactNode | ((isOpen: boolean) => ReactNode);
  frequencyHeading?: string;
  detailHeading: string;
  options: RepeatOption[];
  frequency: RepeatFrequency;
  onFrequencyChange?: (frequency: RepeatFrequency) => void;
  weekly: RepeatWeeklyDetail;
  monthly: RepeatMonthlyDetail;
}

interface RepeatFrequencyListProps {
  options: RepeatOption[];
  selectedFrequency: RepeatFrequency;
  onSelect: (frequency: RepeatFrequency) => void;
}

const RepeatFrequencyList = ({
  options,
  selectedFrequency,
  onSelect,
}: RepeatFrequencyListProps) => {
  return (
    <div className="border-timo-gray-500 flex w-full flex-col items-start gap-2 border-t px-3.5 py-2.5">
      {options.map(({ frequency: value, label }, index) => (
        <Fragment key={value}>
          {index > 0 && (
            <div className="border-timo-gray-500 h-px w-full border-t" />
          )}
          <Dropdown.Item
            onClick={() => onSelect(value)}
            closeOnSelect={value === "DAILY"}
            aria-pressed={value === selectedFrequency}
          >
            <span className="typo-headline-r-14 text-timo-black whitespace-nowrap">
              {label}
            </span>
          </Dropdown.Item>
        </Fragment>
      ))}
    </div>
  );
};

interface RepeatWeeklyDetailSectionProps {
  weekdays: WeekdayOption[];
  selectedWeekdayIds: string[];
  onWeekdayToggle: (id: string) => void;
}

const RepeatWeeklyDetailSection = ({
  weekdays,
  selectedWeekdayIds,
  onWeekdayToggle,
}: RepeatWeeklyDetailSectionProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      {weekdays.map(({ id, label }) => (
        <div key={id} className="flex w-full items-center justify-between">
          <span className="typo-headline-r-14 text-timo-black whitespace-nowrap">
            {label}
          </span>
          <Checkbox
            checked={selectedWeekdayIds.includes(id)}
            onChange={() => onWeekdayToggle?.(id)}
          />
        </div>
      ))}
    </div>
  );
};

type RepeatMonthlyDetailSectionProps = RepeatMonthlyDetail & {
  ariaLabel: string;
};

const RepeatMonthlyDetailSection = ({
  repeatDayLabel,
  repeatDay,
  onRepeatDayChange,
  ariaLabel,
}: RepeatMonthlyDetailSectionProps) => {
  const inputId = useId();

  return (
    <div className="flex items-center gap-0.5">
      <label htmlFor={inputId} className="sr-only">
        {ariaLabel}
      </label>
      <div className="bg-timo-gray-300 rounded-4 flex h-6.25 w-14.75 items-center justify-end px-1">
        <input
          id={inputId}
          type="text"
          value={repeatDay}
          onChange={(event) => onRepeatDayChange?.(event.target.value)}
          className="typo-headline-m-14 text-timo-black focus-visible:ring-timo-blue-300 w-full bg-transparent text-right outline-none focus-visible:ring-2"
        />
      </div>
      <span className="typo-headline-r-14 text-timo-black whitespace-nowrap">
        {repeatDayLabel}
      </span>
    </div>
  );
};

const isSameWeekdaySelection = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort();
  const sortedB = [...b].sort();

  return sortedA.every((item, index) => item === sortedB[index]);
};

export const RepeatSelector = ({
  trigger,
  frequencyHeading = "반복 일정",
  detailHeading,
  options,
  frequency,
  onFrequencyChange,
  weekly,
  monthly,
}: RepeatSelectorProps) => {
  const [isPicking, setIsPicking] = useState(true);
  const [draftFrequency, setDraftFrequency] =
    useState<RepeatFrequency>(frequency);
  const [draftWeekdayIds, setDraftWeekdayIds] = useState<string[]>(
    weekly.selectedWeekdayIds,
  );
  const [draftRepeatDay, setDraftRepeatDay] = useState(monthly.repeatDay);

  const draftFrequencyRef = useRef(frequency);
  const draftWeekdayIdsRef = useRef(weekly.selectedWeekdayIds);
  const draftRepeatDayRef = useRef(monthly.repeatDay);

  const selectedLabel = options.find(
    (option) => option.frequency === draftFrequency,
  )?.label;

  const handleSelectFrequency = (value: RepeatFrequency) => {
    draftFrequencyRef.current = value;
    setDraftFrequency(value);
    if (value !== "DAILY") setIsPicking(false);
  };

  const handleWeekdayToggle = (id: string) => {
    const next = draftWeekdayIdsRef.current.includes(id)
      ? draftWeekdayIdsRef.current.filter((item) => item !== id)
      : [...draftWeekdayIdsRef.current, id];

    draftWeekdayIdsRef.current = next;
    setDraftWeekdayIds(next);
  };

  const handleRepeatDayChange = (value: string) => {
    draftRepeatDayRef.current = value;
    setDraftRepeatDay(value);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      draftFrequencyRef.current = frequency;
      setDraftFrequency(frequency);
      draftWeekdayIdsRef.current = weekly.selectedWeekdayIds;
      setDraftWeekdayIds(weekly.selectedWeekdayIds);
      draftRepeatDayRef.current = monthly.repeatDay;
      setDraftRepeatDay(monthly.repeatDay);
      return;
    }

    if (draftFrequencyRef.current !== frequency) {
      onFrequencyChange?.(draftFrequencyRef.current);
    }
    if (
      !isSameWeekdaySelection(
        draftWeekdayIdsRef.current,
        weekly.selectedWeekdayIds,
      )
    ) {
      weekly.onWeekdaysChange?.(draftWeekdayIdsRef.current);
    }
    if (draftRepeatDayRef.current !== monthly.repeatDay) {
      monthly.onRepeatDayChange?.(draftRepeatDayRef.current);
    }
  };

  return (
    <Dropdown className="flex justify-center" onOpenChange={handleOpenChange}>
      <Dropdown.Trigger aria-haspopup="menu">{trigger}</Dropdown.Trigger>

      <Dropdown.Panel className="shadow-timo w-32.5 gap-1 p-0">
        <div className="flex w-full flex-col gap-1 px-3.5 py-2">
          <span className="typo-body-r-12 text-timo-gray-700 w-full whitespace-nowrap">
            {frequencyHeading}
          </span>

          <button
            type="button"
            onClick={() => setIsPicking((prev) => !prev)}
            aria-expanded={isPicking}
            className="flex w-full items-center justify-between"
          >
            <span className="typo-headline-m-14 text-timo-black whitespace-nowrap">
              {selectedLabel}
            </span>
            <ChevronDownIcon
              className={cn(
                "shrink-0 transition-transform duration-200 ease-in-out",
                !isPicking && "rotate-180",
              )}
            />
          </button>
        </div>

        {isPicking ? (
          <RepeatFrequencyList
            options={options}
            selectedFrequency={draftFrequency}
            onSelect={handleSelectFrequency}
          />
        ) : (
          <div
            className={cn(
              "border-timo-gray-500 flex w-full flex-col gap-2 border-t px-3.5 py-1.5",
              DETAIL_ALIGN[draftFrequency],
            )}
          >
            <span className="typo-body-r-12 text-timo-gray-700 w-full whitespace-nowrap">
              {detailHeading}
            </span>

            {draftFrequency === "WEEKLY" && (
              <RepeatWeeklyDetailSection
                weekdays={weekly.weekdays}
                selectedWeekdayIds={draftWeekdayIds}
                onWeekdayToggle={handleWeekdayToggle}
              />
            )}
            {draftFrequency === "MONTHLY" && (
              <RepeatMonthlyDetailSection
                repeatDayLabel={monthly.repeatDayLabel}
                repeatDay={draftRepeatDay}
                onRepeatDayChange={handleRepeatDayChange}
                ariaLabel={detailHeading}
              />
            )}
          </div>
        )}
      </Dropdown.Panel>
    </Dropdown>
  );
};
