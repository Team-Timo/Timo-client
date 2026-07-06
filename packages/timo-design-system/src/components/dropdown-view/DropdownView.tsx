import { Fragment } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "../../icons";
import { cn } from "../../lib";
import { Dropdown } from "../layout/dropdown/Dropdown";


export interface DropdownViewProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const DropdownView = ({
  items,
  value,
  onChange,
  placeholder = "기본",
  className,
}: DropdownViewProps) => {
  return (
    <Dropdown className={cn("w-[74px]", className)}>
      <Dropdown.Trigger
        aria-haspopup="listbox"
        className={cn(
          "group border-timo-gray-500 flex h-8 w-full items-center justify-between rounded-[4px] border bg-white px-2",
          "aria-expanded:shadow-timo aria-expanded:rounded-b-none",
        )}
      >
        <span className="typo-headline-m-14 text-timo-gray-900 whitespace-nowrap">
          {value || placeholder}
        </span>
        <div className="flex size-6 shrink-0 items-center justify-center">
          <ChevronDownIcon className="group-aria-expanded:hidden" />
          <ChevronUpIcon className="hidden group-aria-expanded:block" />
        </div>
      </Dropdown.Trigger>

      <Dropdown.Panel
        role="listbox"
        className="border-timo-gray-500 shadow-timo mt-0 w-full gap-1.5 rounded-t-none rounded-b-[4px] border-x border-b px-2 py-1"
      >
        {items.map((item, i) => {
          const isSelected = item === value;

          return (
            <Fragment key={item}>
              <Dropdown.Item
                role="option"
                aria-selected={isSelected}
                onClick={() => onChange(item)}
                className="typo-body-m-12 text-timo-gray-900 px-1.5 py-1"
              >
                {item}
              </Dropdown.Item>
              {i < items.length - 1 && (
                <div className="bg-timo-gray-500 h-px w-full" />
              )}
            </Fragment>
          );
        })}
      </Dropdown.Panel>
    </Dropdown>
  );
};
