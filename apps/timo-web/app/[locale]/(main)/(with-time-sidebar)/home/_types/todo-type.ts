import { z } from "zod";

export const todoPrioritySchema = z.enum([
  "VERY_HIGH",
  "HIGH",
  "MEDIUM",
  "LOW",
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
  priority: todoPrioritySchema.nullish().transform((v) => v ?? "MEDIUM"),
  tag: todoTagSchema.nullish().transform((v) => v ?? undefined),
  hasMemo: z.boolean(),
  isRepeated: z.boolean(),
  timerStatus: todoTimerStatusSchema,
  sortOrder: z.number().default(0),
  subtasks: z.array(todoSubtaskSchema),
});

export const todoCreateResponseSchema = z.object({
  todoId: z.number(),
});

export type TodoPriorityTypes = z.infer<typeof todoPrioritySchema>;
export type TodoTimerStatusTypes = z.infer<typeof todoTimerStatusSchema>;
export type TodoTag = z.infer<typeof todoTagSchema>;
export type TodoSubtask = z.infer<typeof todoSubtaskSchema>;
export type Todo = z.infer<typeof todoSchema>;
export type TodoCreateResponseData = z.infer<typeof todoCreateResponseSchema>;
