import { z } from "zod";

export const statisticsMonthSummarySchema = z.object({
  totalRecordMinutes: z.number(),
  activeDayCount: z.number(),
  averageRecordedMinutes: z.number(),
  completedTodoCount: z.number(),
  totalTodoCount: z.number(),
});

export const statisticsTodoRecordSchema = z.object({
  todoId: z.number(),
  title: z.string(),
  actualTimeMinutes: z.number(),
  estimatedTimeMinutes: z.number(),
  tagName: z.string(),
});

export const statisticsDayDetailSchema = z.object({
  date: z.string(),
  totalRecordMinutes: z.number(),
  todos: z.array(statisticsTodoRecordSchema),
});

export type StatisticsMonthSummary = z.infer<
  typeof statisticsMonthSummarySchema
>;

export type StatisticsDayDetail = z.infer<typeof statisticsDayDetailSchema>;

export type StatisticsTodoRecord = z.infer<typeof statisticsTodoRecordSchema>;
