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
  icon: z.string().optional(),
  title: z.string(),
  completed: z.boolean(),
  durationSeconds: z.number().default(0),
  priority: todoPrioritySchema.default("MEDIUM"),
  tag: todoTagSchema.optional(),
  hasMemo: z.boolean(),
  isRepeated: z.boolean(),
  timerStatus: todoTimerStatusSchema,
  sortOrder: z.number().default(0),
  subtasks: z.array(todoSubtaskSchema),
});

export type TodoPriorityTypes = z.infer<typeof todoPrioritySchema>;
export type TodoTimerStatusTypes = z.infer<typeof todoTimerStatusSchema>;
export type TodoTag = z.infer<typeof todoTagSchema>;
export type TodoSubtask = z.infer<typeof todoSubtaskSchema>;
export type Todo = z.infer<typeof todoSchema>;
