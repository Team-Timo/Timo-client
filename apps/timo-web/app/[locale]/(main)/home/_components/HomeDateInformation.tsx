import { TodayBadge } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";

interface HomeDateInformationProps {
  date: string;
  dayOfWeek: string;
  isHoliday: boolean;
  isToday: boolean;
  totalCount: number;
  completedCount: number;
}

export const HomeDateInformation = ({
  date,
  dayOfWeek,
  isHoliday,
  isToday,
  totalCount,
  completedCount,
}: HomeDateInformationProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full flex-col gap-0.5">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center justify-between">
            <h2
              className={cn(
                "typo-headline-b-30",
                isHoliday ? "text-timo-red" : "text-timo-black",
              )}
            >
              {date}
            </h2>
            {isToday && <TodayBadge />}
          </div>
          <span className="typo-body-m-12 text-timo-gray-700">{dayOfWeek}</span>
        </div>
        <div className="flex items-center gap-px">
          <span className="typo-body-sb-12 text-timo-black">
            {completedCount}
          </span>
          <span className="typo-body-r-12 text-timo-gray-700">
            /{totalCount}
          </span>
        </div>
      </div>
      <div className="bg-timo-gray-500 h-px w-full" />
    </div>
  );
};
