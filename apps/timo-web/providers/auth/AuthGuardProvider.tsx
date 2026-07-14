"use client";

import { useEffect, useRef } from "react";

import { useUpdateTimezone } from "@/api/generated/endpoints/user/user";
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
  const { mutate: updateTimezone } = useUpdateTimezone();
  const syncedTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (isInitialized && !accessToken) {
      router.replace(ROUTES.LOGIN);
    }
  }, [accessToken, isInitialized, router]);

  useEffect(() => {
    if (!accessToken || syncedTokenRef.current === accessToken) return;

    syncedTokenRef.current = accessToken;
    const zoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;
    updateTimezone({ data: { zoneId } });
  }, [accessToken, updateTimezone]);

  if (!isInitialized || !accessToken) return null;

  return <>{children}</>;
};
