import { cn } from "../../../lib";
import { Dropdown } from "../../layout/dropdown/Dropdown";
import { PriorityIcon } from "../priority-icon/PriorityIcon";

import type { ReactNode } from "react";

export type PriorityLevel = "VERY_HIGH" | "HIGH" | "MEDIUM" | "LOW";

const PRIORITY_LEVELS: PriorityLevel[] = ["VERY_HIGH", "HIGH", "MEDIUM", "LOW"];

const PRIORITY_LABEL: Record<PriorityLevel, string> = {
  VERY_HIGH: "매우중요",
  HIGH: "중요",
  MEDIUM: "보통",
  LOW: "낮음",
};

const PRIORITY_BG_COLOR: Record<PriorityLevel, string> = {
  VERY_HIGH: "bg-timo-red",
  HIGH: "bg-timo-orange",
  MEDIUM: "bg-timo-gray",
  LOW: "bg-timo-gray-900",
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
    <Dropdown className="flex justify-center">
      <Dropdown.Trigger aria-haspopup="menu">{trigger}</Dropdown.Trigger>

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
                {PRIORITY_LABEL[priority]}
              </span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Panel>
    </Dropdown>
  );
};
