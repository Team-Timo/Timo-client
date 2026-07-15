import { z } from "zod";

export const timeBoxSchema = z.object({
  sessionId: z.number(),
  timerId: z.number(),
  todoId: z.number(),
  todoName: z.string(),
  date: z.string(),
  startedAt: z.string(),
  startAction: z
    .enum(["START", "RESUME"])
    .nullish()
    .transform((v) => v ?? undefined),
  endedAt: z
    .string()
    .nullish()
    .transform((v) => v ?? undefined),
  endAction: z
    .enum(["PAUSE", "COMPLETE"])
    .nullish()
    .transform((v) => v ?? undefined),
  actualMinutes: z
    .number()
    .nullish()
    .transform((v) => v ?? undefined),
});

export const timeBoxListSchema = z.array(timeBoxSchema);

export type TimeBox = z.infer<typeof timeBoxSchema>;
