"use client";

import type { CalendarEvent } from "@/schemas/calendar/calendar-events-schema";

interface CalendarEventItemProps {
  event: CalendarEvent;
}

export const CalendarEventItem = ({ event }: CalendarEventItemProps) => (
  <div className="border-l-timo-blue-300 bg-timo-blue-50 flex min-h-8 w-full items-center rounded-md border-l-2 px-2.5 py-1.5">
    <span className="typo-body-r-12 text-timo-gray-900 line-clamp-2">
      {event.title}
    </span>
  </div>
);
