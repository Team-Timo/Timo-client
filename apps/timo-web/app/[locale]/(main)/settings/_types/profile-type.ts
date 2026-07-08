export type SettingsLanguage = "ko" | "en";

export interface SettingsProfile {
  name: string;
  googleEmail: string;
  isCalendarConnected: boolean;
  language: SettingsLanguage;
  tags: string[];
}
