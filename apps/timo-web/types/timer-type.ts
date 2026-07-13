import { z } from "zod";

export const activeTimerSchema = z.object({
  timerId: z.number(),
  todoId: z.number(),
  status: z.enum(["RUNNING", "PAUSED"]),
  plannedSeconds: z.number(),
  extendedSeconds: z.number(),
  elapsedSeconds: z.number(),
  remainingSeconds: z.number(),
});

export type ActiveTimer = z.infer<typeof activeTimerSchema>;
