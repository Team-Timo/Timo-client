import { cn } from "@lib";

export interface TodayButtonProps {
  onClick?: () => void;
  className?: string;
}

export const TodayButton = ({ onClick, className }: TodayButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "typo-headline-m-14 text-timo-gray-900 border-timo-gray-500 flex h-8 items-center rounded-[4px] border bg-white px-2",
        className,
      )}
    >
      오늘
    </button>
  );
};
