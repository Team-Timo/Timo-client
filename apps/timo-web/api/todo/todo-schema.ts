import { z } from "zod";

import { apiResponseSchema } from "@/api/schema/response";

export const todoIconSchema = z.enum([
  "ICON_1",
  "ICON_2",
  "ICON_3",
  "ICON_4",
  "ICON_5",
  "ICON_6",
  "ICON_7",
  "ICON_8",
]);

export const todoPrioritySchema = z.enum([
  "VERY_HIGH",
  "HIGH",
  "MEDIUM",
  "LOW",
]);

export const todoRepeatTypeSchema = z.enum([
  "NONE",
  "DAILY",
  "WEEKLY",
  "MONTHLY",
]);

export const todoRepeatWeekdaySchema = z.enum([
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
]);

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DURATION_PATTERN = /^\d{1,3}:[0-5]\d$/;

export const createTodoRequestSchema = z
  .object({
    icon: todoIconSchema.nullable(),
    title: z.string().trim().min(1),
    subtasks: z.array(z.string().trim().min(1)).nullable(),
    date: z.string().regex(DATE_PATTERN),
    duration: z.string().regex(DURATION_PATTERN),
    priority: todoPrioritySchema.nullable(),
    tagId: z.number().int().positive().nullable(),
    repeatType: todoRepeatTypeSchema,
    repeatWeekdays: z.array(todoRepeatWeekdaySchema).nullable(),
    repeatDayOfMonth: z.number().int().min(1).max(31).nullable(),
    memo: z.string().nullable(),
  })
  .superRefine((value, ctx) => {
    if (
      value.repeatType === "WEEKLY" &&
      (!value.repeatWeekdays || value.repeatWeekdays.length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["repeatWeekdays"],
        message: "반복할 요일을 선택해주세요.",
      });
    }

    if (value.repeatType === "MONTHLY" && !value.repeatDayOfMonth) {
      ctx.addIssue({
        code: "custom",
        path: ["repeatDayOfMonth"],
        message: "반복할 날짜를 선택해주세요.",
      });
    }
  });

export type CreateTodoRequest = z.infer<typeof createTodoRequestSchema>;

export type TodoIcon = z.infer<typeof todoIconSchema>;
export type TodoPriority = z.infer<typeof todoPrioritySchema>;
export type TodoRepeatType = z.infer<typeof todoRepeatTypeSchema>;
export type TodoRepeatWeekday = z.infer<typeof todoRepeatWeekdaySchema>;

export const createTodoResponseSchema = apiResponseSchema(
  z.object({
    todoId: z.number(),
  }),
);

export type CreateTodoResponse = z.infer<typeof createTodoResponseSchema>;
