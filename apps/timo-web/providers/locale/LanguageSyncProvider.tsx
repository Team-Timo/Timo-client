"use client";

import { useLocale } from "next-intl";
import { Suspense, useEffect } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useMyProfile } from "@/queries/use-my-profile";
import { useAuthStore } from "@/stores/auth/useAuthStore";

const isSupportedLocale = (value: string): value is "ko" | "en" =>
  value === "ko" || value === "en";

const LanguageSync = () => {
  const { data: profile } = useMyProfile();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const language = profile.language.toLowerCase();
    if (!isSupportedLocale(language) || language === locale) return;

    router.replace(pathname, { locale: language });
  }, [locale, pathname, profile, router]);

  return null;
};

interface LanguageSyncProviderProps {
  children: React.ReactNode;
}

/**
 * 로그인한 유저의 프로필 언어와 현재 로케일이 다르면 앱 전역에서 동기화한다.
 * 인증 초기화가 끝나고 accessToken이 있을 때만 프로필을 조회하며,
 * 비로그인 상태에서는 조회 자체를 하지 않는다.
 */
export const LanguageSyncProvider = ({
  children,
}: LanguageSyncProviderProps) => {
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const accessToken = useAuthStore((state) => state.accessToken);
  const shouldSync = isInitialized && !!accessToken;

  return (
    <>
      {shouldSync && (
        <Suspense fallback={null}>
          <LanguageSync />
        </Suspense>
      )}
      {children}
    </>
  );
};
