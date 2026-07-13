export type SettingsLanguage = "ko" | "en";

export interface SettingsTagItem {
  id: number;
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
