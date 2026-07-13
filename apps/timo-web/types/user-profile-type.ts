import { z } from "zod";

export const userProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  profileImageUrl: z.string().optional(),
  language: z.string(),
  zoneId: z.string(),
  calendarConnected: z.boolean(),
  calendarEmail: z.string().optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
