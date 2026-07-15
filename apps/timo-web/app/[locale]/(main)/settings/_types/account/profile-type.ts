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
  languageConfirmTitle: string;
  languageConfirmDescription: string;
  languageConfirmCancel: string;
  languageConfirmConfirm: string;
  tagDeleteConfirmTitle: string;
  tagDeleteConfirmDescription: string;
  tagDeleteConfirmCancel: string;
  tagDeleteConfirmConfirm: string;
  logoutConfirmDescription: string;
  logoutConfirmCancel: string;
  logoutConfirmConfirm: string;
  removeTag: (tag: string) => string;
}
