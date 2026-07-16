import { TODO_ICON_VALUES } from "@repo/timo-design-system/ui";
import { z } from "zod";

export const activeTimerSchema = z.object({
  timerId: z.number(),
  todoId: z.number(),
  date: z.string(),
  iconType: z
    .enum(TODO_ICON_VALUES)
    .nullish()
    .transform((v) => v ?? undefined),
  status: z.enum(["RUNNING", "PAUSED"]),
  plannedSeconds: z.number(),
  extendedSeconds: z.number(),
  elapsedSeconds: z.number(),
  remainingSeconds: z.number(),
});

export type ActiveTimer = z.infer<typeof activeTimerSchema>;
