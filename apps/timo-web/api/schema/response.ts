import { z } from "zod";

export function apiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    status: z.number(),
    message: z.string(),
    data: dataSchema,
  });
}

export const apiErrorSchema = z.object({
  timestamp: z.string(),
  status: z.number(),
  errorCode: z.string(),
  message: z.string(),
  path: z.string(),
});

export type ApiErrorResponse = z.infer<typeof apiErrorSchema>;
