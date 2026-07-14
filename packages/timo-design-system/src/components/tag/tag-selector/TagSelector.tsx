import { PlusIcon } from "../../../icons";
import { cn } from "../../../lib";
import { Dropdown } from "../../layout/dropdown/Dropdown";

import type { ReactNode } from "react";

export interface TagSelectorProps {
  trigger: ReactNode;
  tags: string[];
  selected?: string;
  addLabel?: string;
  onSelect?: (tag: string) => void;
  onAddClick?: () => void;
}

export const TagSelector = ({
  trigger,
  tags,
  selected,
  addLabel = "추가",
  onSelect,
  onAddClick,
}: TagSelectorProps) => {
  return (
    <Dropdown className="flex justify-center">
      <Dropdown.Trigger aria-haspopup="menu" className="p-1">
        {trigger}
      </Dropdown.Trigger>

      <Dropdown.Panel className="shadow-timo">
        {tags.map((tag) => {
          const isSelected = tag === selected;

          return (
            <Dropdown.Item
              key={tag}
              onClick={() => onSelect?.(tag)}
              aria-pressed={isSelected}
              className={cn("px-1.5 py-1", isSelected && "bg-timo-gray-500")}
            >
              <span
                className={cn(
                  "typo-headline-r-14 whitespace-nowrap",
                  isSelected ? "text-timo-gray-900" : "text-timo-black",
                )}
              >
                {tag}
              </span>
            </Dropdown.Item>
          );
        })}

        <Dropdown.Item onClick={onAddClick} className="gap-1 px-1.5 py-1">
          <span className="typo-headline-r-14 text-timo-black whitespace-nowrap">
            {addLabel}
          </span>
          <PlusIcon className="shrink-0" />
        </Dropdown.Item>
      </Dropdown.Panel>
    </Dropdown>
  );
};
