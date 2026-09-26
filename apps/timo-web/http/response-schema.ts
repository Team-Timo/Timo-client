import { z } from "zod";

export const apiErrorSchema = z.object({
  timestamp: z.string(),
  status: z.number(),
  errorCode: z.string(),
  message: z.string(),
  path: z.string(),
});

export type ApiErrorResponse = z.infer<typeof apiErrorSchema>;
