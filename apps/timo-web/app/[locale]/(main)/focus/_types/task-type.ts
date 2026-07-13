import { z } from "zod";

export const focusTaskSubtaskSchema = z.object({
  subtaskId: z.number(),
  content: z.string(),
  completed: z.boolean(),
});

export const focusTaskSchema = z.object({
  todoId: z.number(),
  title: z.string(),
  completed: z.boolean(),
  durationSeconds: z.number().optional(),
  subtasks: z.array(focusTaskSubtaskSchema),
});

export const focusViewSchema = z.object({
  date: z.iso.date(),
  hasTodo: z.boolean(),
  todo: focusTaskSchema.nullish(),
});

export type FocusTaskSubtask = z.infer<typeof focusTaskSubtaskSchema>;
export type FocusTask = z.infer<typeof focusTaskSchema>;
export type FocusView = z.infer<typeof focusViewSchema>;
