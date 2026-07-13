"use client";

import { useEffect } from "react";

import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";

interface OnboardingCompletedGuardProviderProps {
  children: React.ReactNode;
}

export const OnboardingCompletedGuardProvider = ({
  children,
}: OnboardingCompletedGuardProviderProps) => {
  const onboardingCompleted = useAuthStore(
    (state) => state.onboardingCompleted,
  );
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && onboardingCompleted) {
      router.replace(ROUTES.HOME);
    }
  }, [isInitialized, onboardingCompleted, router]);

  if (!isInitialized || onboardingCompleted) return null;

  return <>{children}</>;
};
