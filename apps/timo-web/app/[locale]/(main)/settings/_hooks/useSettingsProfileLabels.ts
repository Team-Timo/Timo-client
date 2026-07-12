"use client";

import { useTranslations } from "next-intl";

import type { SettingsProfileLabels } from "@/app/[locale]/(main)/settings/_types/profile-type";

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
    save: tSettings("profile.save"),
    removeTag: (tag: string) => tSettings("profile.removeTag", { tag }),
  };
};
