"use client";

import Image from "next/image";

interface HomeCalendarEventCardProps {
  title: string;
}

export const HomeCalendarEventCard = ({
  title,
}: HomeCalendarEventCardProps) => (
  <div className="border-timo-gray-500 flex w-full shrink-0 items-center gap-1 overflow-hidden rounded-[4px] border border-solid bg-white px-3.5 py-3">
    <Image
      src="/images/google-calendar-small.svg"
      alt="Google Calendar"
      width={24}
      height={24}
      className="shrink-0"
    />
    <p className="typo-body-sb-12 text-timo-black min-w-0 flex-1 truncate">
      {title}
    </p>
  </div>
);
