"use client";

import { Fragment, useState } from "react";

import { ChevronDownIcon } from "../../../icons";
import { cn } from "../../../lib";
import { Checkbox } from "../../checkbox/Checkbox";
import { Dropdown } from "../../layout/dropdown/Dropdown";

import type { ReactNode } from "react";

export type RepeatFrequency = "daily" | "weekly" | "monthly";

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
  onWeekdayToggle?: (id: string) => void;
}

export interface RepeatMonthlyDetail {
  repeatDayLabel: string;
  repeatDay: string;
  onRepeatDayChange?: (value: string) => void;
}

const DETAIL_ALIGN: Record<RepeatFrequency, string> = {
  daily: "items-start",
  weekly: "items-start",
  monthly: "items-end",
};

export interface RepeatSelectorProps {
  trigger: ReactNode;
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
            closeOnSelect={false}
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

const RepeatWeeklyDetailSection = ({
  weekdays,
  selectedWeekdayIds,
  onWeekdayToggle,
}: RepeatWeeklyDetail) => {
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
  return (
    <div className="flex items-center gap-0.5">
      <div className="bg-timo-gray-300 rounded-4 flex h-6.25 w-14.75 items-center justify-end px-1">
        <input
          type="text"
          value={repeatDay}
          onChange={(event) => onRepeatDayChange?.(event.target.value)}
          aria-label={ariaLabel}
          className="typo-headline-m-14 text-timo-black w-full bg-transparent text-right outline-none"
        />
      </div>
      <span className="typo-headline-r-14 text-timo-black whitespace-nowrap">
        {repeatDayLabel}
      </span>
    </div>
  );
};

export const RepeatSelector = ({
  trigger,
  detailHeading,
  options,
  frequency,
  onFrequencyChange,
  weekly,
  monthly,
}: RepeatSelectorProps) => {
  const [isPicking, setIsPicking] = useState(true);
  const [selectedFrequency, setSelectedFrequency] =
    useState<RepeatFrequency>(frequency);

  const selectedLabel = options.find(
    (option) => option.frequency === selectedFrequency,
  )?.label;

  const handleSelectFrequency = (value: RepeatFrequency) => {
    setSelectedFrequency(value);
    onFrequencyChange?.(value);
    setIsPicking(false);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger aria-haspopup="menu">{trigger}</Dropdown.Trigger>

      <Dropdown.Panel className="w-32.5 gap-1 p-0">
        <div className="flex w-full flex-col gap-1 px-3.5 py-2">
          <span className="typo-body-r-12 text-timo-gray-700 w-full whitespace-nowrap">
            반복 일정
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
                isPicking && "rotate-180",
              )}
            />
          </button>
        </div>

        {isPicking ? (
          <RepeatFrequencyList
            options={options}
            selectedFrequency={selectedFrequency}
            onSelect={handleSelectFrequency}
          />
        ) : (
          <div
            className={cn(
              "border-timo-gray-500 flex w-full flex-col gap-2 border-t px-3.5 py-1.5",
              DETAIL_ALIGN[selectedFrequency],
            )}
          >
            <span className="typo-body-r-12 text-timo-gray-700 w-full whitespace-nowrap">
              {detailHeading}
            </span>

            {selectedFrequency === "weekly" && (
              <RepeatWeeklyDetailSection {...weekly} />
            )}
            {selectedFrequency === "monthly" && (
              <RepeatMonthlyDetailSection
                {...monthly}
                ariaLabel={detailHeading}
              />
            )}
          </div>
        )}
      </Dropdown.Panel>
    </Dropdown>
  );
};
