import { z } from "zod";

export const focusTaskSubtaskSchema = z.object({
  subtaskId: z.number(),
  content: z.string(),
  completed: z.boolean(),
});

export const focusTaskSchema = z.object({
  todoId: z.number(),
  // TODO: 실제 응답이 ICON_1~8 코드가 아닌 이모지 문자열이라, 렌더링 방식이 정해지기 전까지는 검증만 하고 화면에는 쓰지 않는다
  icon: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  title: z.string(),
  completed: z.boolean(),
  durationSeconds: z.number().optional(),
  memo: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
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
