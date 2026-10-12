"use client";

import Image from "next/image";

interface TodayCalendarEventCardProps {
  title: string;
}

export const TodayCalendarEventCard = ({
  title,
}: TodayCalendarEventCardProps) => (
  <div className="border-timo-gray-500 flex w-full overflow-hidden rounded-[4px] border bg-white px-3.5 py-3 md:min-w-80 md:px-5 md:py-4">
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <div className="shrink-0 p-1">
        <Image
          src="/images/google-calendar.png"
          alt="Google Calendar"
          width={14}
          height={14}
        />
      </div>
      <span className="typo-headline-b-14 text-timo-gray-900 min-w-0 truncate">
        {title}
      </span>
    </div>
  </div>
);
