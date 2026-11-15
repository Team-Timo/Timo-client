"use client";

import Image from "next/image";

import type { CalendarEvent } from "@/schemas/calendar/calendar-events-schema";

export const HomeCalendarEventCard = ({
  title,
  calendarSource = "GOOGLE",
}: CalendarEvent) => (
  <div className="border-timo-gray-500 flex w-full shrink-0 items-center gap-1 overflow-hidden rounded-[4px] border border-solid bg-white px-3.5 py-3">
    <div className="shrink-0 p-1">
      <Image
        src={`/images/${calendarSource.toLowerCase()}-calendar.png`}
        alt={calendarSource === "APPLE" ? "Apple Calendar" : "Google Calendar"}
        width={14}
        height={14}
        unoptimized
      />
    </div>
    <p className="typo-body-sb-12 text-timo-black min-w-0 flex-1 truncate">
      {title}
    </p>
  </div>
);
