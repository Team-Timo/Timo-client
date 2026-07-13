"use client";

import { useEffect, useRef } from "react";

import { reissueAccessToken } from "@/api/client/axios";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";

interface AuthGuardProviderProps {
  children: React.ReactNode;
  requireOnboardingCompleted?: boolean;
  redirectIfOnboardingCompleted?: boolean;
}

export const AuthGuardProvider = ({
  children,
  requireOnboardingCompleted = false,
  redirectIfOnboardingCompleted = false,
}: AuthGuardProviderProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const onboardingCompleted = useAuthStore(
    (state) => state.onboardingCompleted,
  );
  const router = useRouter();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (accessToken || hasChecked.current) return;
    hasChecked.current = true;

    reissueAccessToken()
      .then((token) => {
        if (!token) router.replace(ROUTES.LOGIN);
      })
      .catch(() => {
        router.replace(ROUTES.LOGIN);
      });
  }, [accessToken, router]);

  useEffect(() => {
    if (!accessToken) return;
    if (requireOnboardingCompleted && !onboardingCompleted) {
      router.replace(ROUTES.ONBOARDING);
    }
    if (redirectIfOnboardingCompleted && onboardingCompleted) {
      router.replace(ROUTES.HOME);
    }
  }, [
    accessToken,
    onboardingCompleted,
    requireOnboardingCompleted,
    redirectIfOnboardingCompleted,
    router,
  ]);

  const isBlockedByOnboardingCheck =
    (requireOnboardingCompleted && !onboardingCompleted) ||
    (redirectIfOnboardingCompleted && onboardingCompleted);

  if (!accessToken || isBlockedByOnboardingCheck) return null;

  return <>{children}</>;
};
