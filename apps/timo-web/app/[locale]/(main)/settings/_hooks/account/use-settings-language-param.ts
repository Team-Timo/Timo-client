"use client";

import { useLocale } from "next-intl";
import { useCallback } from "react";

import type { SettingsLanguage } from "@/app/[locale]/(main)/settings/_types/account/profile-type";

import { usePathname, useRouter } from "@/i18n/navigation";

export const useSettingsLanguageParam = () => {
  const locale = useLocale() as SettingsLanguage;
  const router = useRouter();
  const pathname = usePathname();

  const commitLanguage = useCallback(
    (next: SettingsLanguage) => {
      if (next === locale) return;
      router.replace(pathname, { locale: next });
    },
    [locale, pathname, router],
  );

  return { locale, commitLanguage };
};
