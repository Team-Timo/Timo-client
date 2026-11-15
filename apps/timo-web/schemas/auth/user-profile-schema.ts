import { z } from "zod";

export const userProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  profileImageUrl: z.string().nullish(),
  language: z.string(),
  zoneId: z.string(),
  calendarConnected: z.boolean(),
  calendarEmail: z.string().nullish(),
  appleCalendarConnected: z.boolean().default(false),
  appleCalendarId: z.string().nullish(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
