export type SettingsLanguage = "ko" | "en";

export type SettingsDefaultTagKey =
  | "assignment"
  | "work"
  | "exercise"
  | "dailyLife";

export interface SettingsProfile {
  name: string;
  googleEmail: string;
  isCalendarConnected: boolean;
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
