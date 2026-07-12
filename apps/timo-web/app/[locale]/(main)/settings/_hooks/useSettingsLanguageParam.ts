"use client";

import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useCallback, useMemo } from "react";

import type { SettingsLanguage } from "@/app/[locale]/(main)/settings/_types/profile-type";

import { usePathname, useRouter } from "@/i18n/navigation";

const LANGUAGE_PARAM = "lang";

const isSettingsLanguage = (value: string | null): value is SettingsLanguage =>
  value === "ko" || value === "en";

export const useSettingsLanguageParam = () => {
  const searchParams = useSearchParams();
  const locale = useLocale() as SettingsLanguage;
  const router = useRouter();
  const pathname = usePathname();

  const language = useMemo(() => {
    const param = searchParams.get(LANGUAGE_PARAM);
    return isSettingsLanguage(param) ? param : locale;
  }, [searchParams, locale]);

  const setLanguage = useCallback(
    (next: SettingsLanguage) => {
      const params = new URLSearchParams(searchParams);
      params.set(LANGUAGE_PARAM, next);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  const commitLanguage = useCallback(() => {
    if (language === locale) return;
    router.replace(pathname, { locale: language });
  }, [language, locale, router, pathname]);

  return { language, locale, setLanguage, commitLanguage };
};
