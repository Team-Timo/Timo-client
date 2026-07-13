"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useMyProfile } from "@/queries/use-my-profile";

const isSupportedLocale = (value: string): value is "ko" | "en" =>
  value === "ko" || value === "en";

interface LanguageSyncProviderProps {
  children: React.ReactNode;
}

/**
 * 로그인한 유저의 프로필 언어와 현재 로케일이 다르면 앱 전역에서 동기화한다.
 * 비로그인 상태에서는 useMyProfile이 비활성화되어 아무 동작도 하지 않는다.
 */
export const LanguageSyncProvider = ({
  children,
}: LanguageSyncProviderProps) => {
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

  return <>{children}</>;
};
