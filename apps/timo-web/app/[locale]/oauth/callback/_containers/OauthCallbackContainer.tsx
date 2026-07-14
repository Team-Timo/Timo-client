"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { useToken } from "@/api/generated/endpoints/auth/auth";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export const OauthCallbackContainer = () => {
  const code = useSearchParams().get("code");
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setOnboardingCompleted = useAuthStore(
    (state) => state.setOnboardingCompleted,
  );
  const { mutate } = useToken();
  const hasRequested = useRef(false);

  useEffect(() => {
    if (!code) {
      router.replace(ROUTES.LOGIN);
      return;
    }
    if (hasRequested.current) return;
    hasRequested.current = true;

    mutate(
      { data: { code } },
      {
        onSuccess: ({ data }) => {
          if (!data?.accessToken) {
            router.replace(ROUTES.LOGIN);
            return;
          }
          setAccessToken(data.accessToken);
          setOnboardingCompleted(data.user.onboardingCompleted);
          router.replace(data.isNewUser ? ROUTES.ONBOARDING : ROUTES.HOME);
        },
        onError: () => {
          router.replace(ROUTES.LOGIN);
        },
      },
    );
  }, [code, mutate, router, setAccessToken, setOnboardingCompleted]);

  return null;
};
