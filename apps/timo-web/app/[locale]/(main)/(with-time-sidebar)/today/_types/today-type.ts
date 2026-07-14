import { z } from "zod";

import { dayOfWeekSchema, todoSchema } from "@/api/todo/todo-schema";

export const todayTodoSchema = todoSchema.extend({
  date: z.string(),
});

export const todayDataSchema = z.object({
  date: z.string(),
  dayOfWeek: dayOfWeekSchema,
  totalCount: z.number(),
  completedCount: z.number(),
  todos: z.array(todayTodoSchema),
});

export type TodayTodo = z.infer<typeof todayTodoSchema>;
export type TodayData = z.infer<typeof todayDataSchema>;
