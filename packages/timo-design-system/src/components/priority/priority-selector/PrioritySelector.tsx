import { cn } from "@lib";

import { PriorityIcon } from "../priority-icon/PriorityIcon";

export type PriorityLevel = "매우중요" | "중요" | "보통" | "낮음";

const PRIORITY_LEVELS: PriorityLevel[] = ["매우중요", "중요", "보통", "낮음"];

const PRIORITY_BG_COLOR: Record<PriorityLevel, string> = {
  매우중요: "bg-timo-red",
  중요: "bg-timo-orange",
  보통: "bg-timo-gray",
  낮음: "bg-timo-gray-900",
};

export interface PrioritySelectorProps {
  selected?: PriorityLevel;
  onSelect?: (priority: PriorityLevel) => void;
}

export const PrioritySelector = ({
  selected,
  onSelect,
}: PrioritySelectorProps) => {
  return (
    <div className="rounded-4 flex flex-col items-start gap-1 bg-white p-2">
      {PRIORITY_LEVELS.map((priority) => {
        const isSelected = priority === selected;

        return (
          <button
            key={priority}
            type="button"
            onClick={() => onSelect?.(priority)}
            className={cn(
              "rounded-4 flex w-full items-center gap-2.25 py-0.5 pr-1 pl-2.75 transition-colors duration-200 ease-in-out",
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
          </button>
        );
      })}
    </div>
  );
};
