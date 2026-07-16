import { z } from "zod";

export const calendarFilterSchema = z.enum(["DAY", "WEEK", "TWO_WEEK"]);

export const calendarEventSchema = z.object({
  title: z.string(),
});

export const calendarDaySchema = z.object({
  date: z.string(),
  events: z.array(calendarEventSchema),
});

export const calendarEventsDataSchema = z.object({
  filter: calendarFilterSchema,
  baseDate: z.string(),
  days: z.array(calendarDaySchema),
});

export type CalendarFilter = z.infer<typeof calendarFilterSchema>;
export type CalendarEvent = z.infer<typeof calendarEventSchema>;
export type CalendarDay = z.infer<typeof calendarDaySchema>;
export type CalendarEventsData = z.infer<typeof calendarEventsDataSchema>;
