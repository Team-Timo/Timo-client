import { z } from "zod";

export type SettingsLanguage = "ko" | "en";

export type SettingsDefaultTagKey =
  | "assignment"
  | "work"
  | "exercise"
  | "dailyLife";

export const settingsProfileResponseSchema = z.object({
  name: z.string(),
  email: z.string(),
  calendarConnected: z.boolean(),
});

export type SettingsProfileResponse = z.infer<
  typeof settingsProfileResponseSchema
>;

export interface SettingsProfileFormValues {
  tags: string[];
}

export interface SettingsTagItem {
  id: string;
  label: string;
  isDefault: boolean;
}

export interface SettingsProfileLabels {
  title: string;
  profileSection: string;
  calendarSection: string;
  connect: string;
  disconnect: string;
  languageSection: string;
  languageKorean: string;
  languageEnglish: string;
  tagsSection: string;
  addTag: string;
  logout: string;
  save: string;
  removeTag: (tag: string) => string;
}
