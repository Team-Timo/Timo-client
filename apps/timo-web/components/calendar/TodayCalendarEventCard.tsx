"use client";

import { Checkbox } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import Image from "next/image";
import { useState } from "react";

interface TodayCalendarEventCardProps {
  title: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}

export const TodayCalendarEventCard = ({
  title,
  checked,
  onToggle,
}: TodayCalendarEventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDimmed = checked && !isHovered;

  return (
    <div
      className={cn(
        "border-timo-gray-500 flex min-w-80 rounded-[4px] border px-5 py-4",
        isDimmed ? "bg-timo-gray-200" : "bg-white",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="inline-flex items-center">
          <Checkbox checked={checked} onChange={onToggle} />
        </div>
        <div className="shrink-0 p-1">
          <Image
            src="/images/google-calendar.png"
            alt="Google Calendar"
            width={14}
            height={14}
          />
        </div>
        <span
          className={cn(
            "typo-headline-b-14 min-w-0 truncate",
            isDimmed ? "text-timo-gray-700" : "text-timo-gray-900",
          )}
        >
          {title}
        </span>
      </div>
    </div>
  );
};
