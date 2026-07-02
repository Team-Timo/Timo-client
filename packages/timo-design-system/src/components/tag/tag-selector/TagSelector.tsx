import { Dropdown } from "@components/layout/dropdown/Dropdown";
import { PlusIcon } from "@icons";
import { cn } from "@lib";

import type { ReactNode } from "react";

export type Tag = "일상" | "운동" | "업무" | "기타";

const TAGS: Tag[] = ["일상", "운동", "업무", "기타"];

export interface TagSelectorProps {
  trigger: ReactNode;
  selected?: Tag;
  onSelect?: (tag: Tag) => void;
  onAddClick?: () => void;
}

export const TagSelector = ({
  trigger,
  selected,
  onSelect,
  onAddClick,
}: TagSelectorProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>{trigger}</Dropdown.Trigger>

      <Dropdown.Panel>
        {TAGS.map((tag) => {
          const isSelected = tag === selected;

          return (
            <Dropdown.Item
              key={tag}
              onClick={() => onSelect?.(tag)}
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
            추가
          </span>
          <PlusIcon className="shrink-0" />
        </Dropdown.Item>
      </Dropdown.Panel>
    </Dropdown>
  );
};
