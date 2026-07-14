"use client";

import { useTranslations } from "next-intl";

import type { SettingsProfileLabels } from "@/app/[locale]/(main)/settings/_types/account/profile-type";

export const useSettingsProfileLabels = (): SettingsProfileLabels => {
  const tSettings = useTranslations("Settings");

  return {
    title: tSettings("profile.title"),
    profileSection: tSettings("profile.profileSection"),
    calendarSection: tSettings("profile.calendarSection"),
    connect: tSettings("profile.connect"),
    disconnect: tSettings("profile.disconnect"),
    languageSection: tSettings("profile.languageSection"),
    languageKorean: tSettings("profile.languageKorean"),
    languageEnglish: tSettings("profile.languageEnglish"),
    tagsSection: tSettings("profile.tagsSection"),
    addTag: tSettings("profile.addTag"),
    logout: tSettings("profile.logout"),
    languageConfirmTitle: tSettings("profile.languageConfirmTitle"),
    languageConfirmDescription: tSettings("profile.languageConfirmDescription"),
    languageConfirmCancel: tSettings("profile.languageConfirmCancel"),
    languageConfirmConfirm: tSettings("profile.languageConfirmConfirm"),
    tagDeleteConfirmTitle: tSettings("profile.tagDeleteConfirmTitle"),
    tagDeleteConfirmDescription: tSettings(
      "profile.tagDeleteConfirmDescription",
    ),
    tagDeleteConfirmCancel: tSettings("profile.tagDeleteConfirmCancel"),
    tagDeleteConfirmConfirm: tSettings("profile.tagDeleteConfirmConfirm"),
    logoutConfirmTitle: tSettings("profile.logoutConfirmTitle"),
    logoutConfirmDescription: tSettings("profile.logoutConfirmDescription"),
    logoutConfirmCancel: tSettings("profile.logoutConfirmCancel"),
    logoutConfirmConfirm: tSettings("profile.logoutConfirmConfirm"),
    removeTag: (tag: string) => tSettings("profile.removeTag", { tag }),
  };
};
