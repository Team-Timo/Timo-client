"use client";

import Image from "next/image";

interface TodayCalendarEventCardProps {
  title: string;
}

export const TodayCalendarEventCard = ({
  title,
}: TodayCalendarEventCardProps) => (
  <div className="border-timo-gray-500 flex min-w-80 rounded-[4px] border bg-white px-5 py-4">
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <Image
        src="/images/google-calendar-small.svg"
        alt="Google Calendar"
        width={24}
        height={24}
        className="shrink-0"
      />
      <span className="typo-headline-b-14 text-timo-gray-900 min-w-0 truncate">
        {title}
      </span>
    </div>
  </div>
);
