import { Dropdown } from "@components/layout/dropdown/Dropdown";
import { PriorityIcon } from "@components/priority/priority-icon/PriorityIcon";
import { cn } from "@lib";

import type { ReactNode } from "react";

export type PriorityLevel = "매우중요" | "중요" | "보통" | "낮음";

const PRIORITY_LEVELS: PriorityLevel[] = ["매우중요", "중요", "보통", "낮음"];

const PRIORITY_BG_COLOR: Record<PriorityLevel, string> = {
  매우중요: "bg-timo-red",
  중요: "bg-timo-orange",
  보통: "bg-timo-gray",
  낮음: "bg-timo-gray-900",
};

export interface PrioritySelectorProps {
  trigger: ReactNode;
  selected?: PriorityLevel;
  onSelect?: (priority: PriorityLevel) => void;
}

export const PrioritySelector = ({
  trigger,
  selected,
  onSelect,
}: PrioritySelectorProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>{trigger}</Dropdown.Trigger>

      <Dropdown.Panel className="gap-1">
        {PRIORITY_LEVELS.map((priority) => {
          const isSelected = priority === selected;

          return (
            <Dropdown.Item
              key={priority}
              onClick={() => onSelect?.(priority)}
              aria-pressed={isSelected}
              className={cn(
                "gap-2.25 py-0.5 pr-1 pl-2.75",
                isSelected && PRIORITY_BG_COLOR[priority],
              )}
            >
              <PriorityIcon priority={isSelected ? "white" : priority} />

              <span
                className={cn(
                  "typo-headline-r-14 whitespace-nowrap transition-colors duration-200 ease-in-out",
                  isSelected ? "text-white" : "text-timo-black",
                )}
              >
                {priority}
              </span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Panel>
    </Dropdown>
  );
};
