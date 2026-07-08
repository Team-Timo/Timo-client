"use client";

import {
  ChevronSmallDownIcon,
  ChevronSmallUpIcon,
} from "@repo/timo-design-system/icons";
import { Dropdown } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

const PANEL_SCROLLBAR =
  "[scrollbar-width:thin] [scrollbar-color:var(--color-timo-gray-600)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-timo-gray-600 [&::-webkit-scrollbar-thumb:hover]:bg-timo-gray-700";

const TIME_OPTIONS = Array.from(
  { length: 25 },
  (_, i) => `${String(i).padStart(2, "0")}:00`,
);

export interface OnboardingTimeDropdownProps {
  value?: string;
  placeholder?: string;
  onChange?: (time: string) => void;
}

export const OnboardingTimeDropdown = ({
  value,
  placeholder = "01:00",
  onChange,
}: OnboardingTimeDropdownProps) => {
  const hasValue = value !== undefined;

  return (
    <Dropdown className="w-[150px]">
      <Dropdown.Trigger className="group border-timo-gray-500 flex w-full items-center justify-between rounded-[4px] border bg-white px-4 py-3 text-left">
        <span
          className={cn(
            "typo-headline-b-16",
            hasValue ? "text-timo-black" : "text-timo-gray-700",
          )}
        >
          {value ?? placeholder}
        </span>
        <ChevronSmallDownIcon className="group-aria-expanded:hidden" />
        <ChevronSmallUpIcon className="hidden group-aria-expanded:block" />
      </Dropdown.Trigger>

      <Dropdown.Panel
        className={cn(
          "border-timo-gray-500 mt-1 h-[220px] w-full gap-2.5 overflow-y-auto rounded-[4px] border py-3 pr-2 pl-4",
          PANEL_SCROLLBAR,
        )}
      >
        {TIME_OPTIONS.map((time) => (
          <Dropdown.Item
            key={time}
            onClick={() => onChange?.(time)}
            className={cn(
              "typo-headline-b-16 w-full rounded-none text-left",
              value === time ? "text-timo-blue-300" : "text-timo-gray-700",
            )}
          >
            {time}
          </Dropdown.Item>
        ))}
      </Dropdown.Panel>
    </Dropdown>
  );
};
