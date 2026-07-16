"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getCalendarEvents,
  getGetCalendarEventsQueryKey,
} from "@/api/generated/endpoints/calendar/calendar";
import {
  calendarEventsDataSchema,
  type CalendarFilter,
} from "@/schemas/calendar/calendar-events-schema";

export interface CalendarEventsQueryParams {
  filter: CalendarFilter;
  baseDate: string;
  enabled?: boolean;
}

export const useCalendarEventsQuery = ({
  filter,
  baseDate,
  enabled = true,
}: CalendarEventsQueryParams) =>
  useQuery({
    queryKey: getGetCalendarEventsQueryKey({ filter, baseDate }),
    queryFn: ({ signal }) =>
      getCalendarEvents({ filter, baseDate }, undefined, signal),
    select: ({ data }) => calendarEventsDataSchema.parse(data),
    enabled,
    staleTime: 0,
  });
