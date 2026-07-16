import { TODO_ICON_VALUES } from "@repo/timo-design-system/ui";
import { z } from "zod";

export const todoIconSchema = z.enum(TODO_ICON_VALUES);

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
    memo: z.string().max(300).nullable(),
  })
  .transform((value) => {
    if (
      value.repeatType === "WEEKLY" &&
      (!value.repeatWeekdays || value.repeatWeekdays.length === 0)
    ) {
      return { ...value, repeatType: "NONE" as const, repeatWeekdays: null };
    }

    return value;
  })
  .superRefine((value, ctx) => {
    if (value.repeatType === "MONTHLY" && !value.repeatDayOfMonth) {
      ctx.addIssue({
        code: "custom",
        path: ["repeatDayOfMonth"],
        message: "반복할 날짜를 선택해주세요.",
      });
    }
  });

export const recommendDurationResponseSchema = z.object({
  recommendedMinutes: z.number(),
});

// ─── Todo 응답 스키마 ────────────────────────────────────────────────────────

export const dayOfWeekSchema = z.enum([
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
]);

export const todoTimerStatusSchema = z.enum(["RUNNING", "STOPPED", "PAUSED"]);

export const todoTagSchema = z.object({
  tagId: z.number(),
  name: z.string(),
});

export const todoSubtaskSchema = z.object({
  subtaskId: z.number(),
  content: z.string(),
  completed: z.boolean(),
});

export const todoSchema = z.object({
  todoId: z.number(),
  icon: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  title: z.string(),
  completed: z.boolean(),
  durationSeconds: z.number().default(0),
  priority: todoPrioritySchema.nullish().transform((v) => v ?? undefined),
  tag: todoTagSchema.nullish().transform((v) => v ?? undefined),
  hasSubtask: z.boolean(),
  isRepeated: z.boolean(),
  timerStatus: todoTimerStatusSchema,
  sortOrder: z.number().default(0),
  subtasks: z.array(todoSubtaskSchema),
});

export const todoCreateResponseSchema = z.object({
  todoId: z.number(),
});

// ─── 타입 ────────────────────────────────────────────────────────────────────

export type CreateTodoRequest = z.infer<typeof createTodoRequestSchema>;
export type RecommendDurationResponseData = z.infer<
  typeof recommendDurationResponseSchema
>;

export type TodoIcon = z.infer<typeof todoIconSchema>;
export type TodoPriority = z.infer<typeof todoPrioritySchema>;
export type TodoPriorityTypes = TodoPriority;
export type TodoRepeatType = z.infer<typeof todoRepeatTypeSchema>;
export type TodoRepeatWeekday = z.infer<typeof todoRepeatWeekdaySchema>;
export type DayOfWeek = z.infer<typeof dayOfWeekSchema>;
export type TodoTimerStatusTypes = z.infer<typeof todoTimerStatusSchema>;
export type TodoTag = z.infer<typeof todoTagSchema>;
export type TodoSubtask = z.infer<typeof todoSubtaskSchema>;
export type Todo = z.infer<typeof todoSchema>;
export type TodoCreateResponseData = z.infer<typeof todoCreateResponseSchema>;
