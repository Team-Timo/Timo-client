"use client";

import { Checkbox } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import Image from "next/image";

interface HomeCalendarEventCardProps {
  title: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}

export const HomeCalendarEventCard = ({
  title,
  checked,
  onToggle,
}: HomeCalendarEventCardProps) => (
  <div
    className={cn(
      "border-timo-gray-500 flex w-full shrink-0 items-center gap-1 overflow-hidden rounded-[4px] border border-solid px-3.5 py-3",
      checked ? "bg-timo-gray-200" : "bg-white",
    )}
  >
    <Checkbox checked={checked} onChange={onToggle} />
    <div className="shrink-0 p-1">
      <Image
        src="/images/google-calendar.png"
        alt="Google Calendar"
        width={14}
        height={14}
      />
    </div>
    <p
      className={cn(
        "typo-body-sb-12 min-w-0 flex-1 truncate",
        checked ? "text-timo-gray-700" : "text-timo-black",
      )}
    >
      {title}
    </p>
  </div>
);
