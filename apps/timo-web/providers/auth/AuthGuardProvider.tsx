"use client";

import { useEffect } from "react";

import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";

interface AuthGuardProviderProps {
  children: React.ReactNode;
}

export const AuthGuardProvider = ({ children }: AuthGuardProviderProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !accessToken) {
      router.replace(ROUTES.LOGIN);
    }
  }, [accessToken, isInitialized, router]);

  if (!isInitialized || !accessToken) return null;

  return <>{children}</>;
};
