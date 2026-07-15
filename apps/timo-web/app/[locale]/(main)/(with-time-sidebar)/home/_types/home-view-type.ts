import { z } from "zod";

import { dayOfWeekSchema, todoSchema } from "@/schemas/todo/todo-schema";

export const homeViewFilterSchema = z.enum(["DEFAULT", "WEEK"]);

export const apiDayOfWeekSchema = dayOfWeekSchema;

export const homeViewDaySchema = z.object({
  date: z.string(),
  dayOfWeek: apiDayOfWeekSchema,
  isHoliday: z.boolean(),
  isToday: z.boolean(),
  totalCount: z.number(),
  completedCount: z.number(),
  todos: z.array(todoSchema),
});

export const homeViewDataSchema = z.object({
  filter: homeViewFilterSchema,
  baseDate: z.string(),
  days: z.array(homeViewDaySchema),
});

export type HomeViewFilter = z.infer<typeof homeViewFilterSchema>;
export type ApiDayOfWeek = z.infer<typeof apiDayOfWeekSchema>;
export type HomeViewDay = z.infer<typeof homeViewDaySchema>;
export type HomeViewData = z.infer<typeof homeViewDataSchema>;

export interface GetHomeViewParams {
  filter: HomeViewFilter;
  baseDate: string;
}
