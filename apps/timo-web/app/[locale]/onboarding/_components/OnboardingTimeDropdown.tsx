import {
  ChevronDownGrayIcon,
  ChevronUpGrayIcon,
} from "@repo/timo-design-system/icons";
import { Dropdown } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

const TIME_OPTIONS = Array.from(
  { length: 25 },
  (_, i) => `${String(i).padStart(2, "0")}:00`,
);

interface OnboardingTimeDropdownProps {
  value: string;
  placeholder?: string;
  onChange: (time: string) => void;
}

export const OnboardingTimeDropdown = ({
  value,
  placeholder,
  onChange,
}: OnboardingTimeDropdownProps) => {
  return (
    <Dropdown className="w-[150px]">
      <Dropdown.Trigger className="group border-timo-gray-500 flex w-full items-center justify-between rounded-[4px] border bg-white px-4 py-3 text-left">
        {value ? (
          <span className="typo-headline-b-16 text-timo-black">{value}</span>
        ) : (
          <span className="typo-headline-b-16 text-timo-gray-700">
            {placeholder}
          </span>
        )}
        <ChevronDownGrayIcon className="group-aria-expanded:hidden" />
        <ChevronUpGrayIcon className="hidden group-aria-expanded:block" />
      </Dropdown.Trigger>

      <Dropdown.Panel className="border-timo-gray-500 mt-1 h-[220px] w-full rounded-[4px] border py-3 pr-2.5 pl-4">
        <div className="scrollbar-sm flex h-full w-full flex-col gap-2.5 overflow-y-auto p-1 pr-3.5">
          {TIME_OPTIONS.map((time) => (
            <Dropdown.Item
              key={time}
              onClick={() => onChange(time)}
              className={cn(
                "typo-headline-b-16 w-full rounded-none",
                value === time ? "text-timo-blue-300" : "text-timo-gray-700",
              )}
            >
              {time}
            </Dropdown.Item>
          ))}
        </div>
      </Dropdown.Panel>
    </Dropdown>
  );
};
