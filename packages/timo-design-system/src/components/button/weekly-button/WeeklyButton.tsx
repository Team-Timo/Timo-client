import { ChevronLeftIcon, ChevronRightIcon } from "../../../icons";
import { cn } from "../../../lib";

export type WeeklyButtonDirectionTypes = "left" | "right";

export interface WeeklyButtonProps {
  direction: WeeklyButtonDirectionTypes;
  onClick?: () => void;
  className?: string;
}

export const WeeklyButton = ({
  direction,
  onClick,
  className,
}: WeeklyButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "이전" : "다음"}
      className={cn(
        "border-timo-gray-500 flex size-8 items-center justify-center rounded-[4px] border bg-white",
        className,
      )}
    >
      {direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
};
