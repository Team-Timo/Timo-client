"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

import { useMyProfile } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_queries/use-my-profile";
import { usePathname, useRouter } from "@/i18n/navigation";

const isSupportedLocale = (value: string): value is "ko" | "en" =>
  value === "ko" || value === "en";

export const HomeLanguageSyncContainer = () => {
  const { data: profile } = useMyProfile();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const language = profile?.language.toLowerCase();
    if (!language || !isSupportedLocale(language) || language === locale)
      return;

    router.replace(pathname, { locale: language });
  }, [locale, pathname, profile, router]);

  return null;
};
