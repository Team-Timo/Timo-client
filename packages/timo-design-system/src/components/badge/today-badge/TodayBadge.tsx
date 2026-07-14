import { cn } from "../../../lib";

export type TodayBadgeVariant = "default" | "weekly";

const TODAY_BADGE_VARIANT: Record<TodayBadgeVariant, string> = {
  default: "px-2 py-0.5 typo-headline-m-14 w-[54px]",
  weekly: "px-1.5 py-px typo-body-m-12 w-11",
};

export interface TodayBadgeProps {
  variant?: TodayBadgeVariant;
}

export const TodayBadge = ({ variant = "default" }: TodayBadgeProps) => {
  return (
    <div
      className={cn(
        "bg-timo-black rounded-4 flex h-6 items-center justify-center",
        TODAY_BADGE_VARIANT[variant],
      )}
    >
      <span className="whitespace-nowrap text-white">Today</span>
    </div>
  );
};
