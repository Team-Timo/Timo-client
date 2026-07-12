"use client";

import { useEffect, useRef, useState } from "react";

import { useReissue } from "@/api/generated/endpoints/auth/auth";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";

interface AuthGuardProviderProps {
  children: React.ReactNode;
}

export const AuthGuardProvider = ({ children }: AuthGuardProviderProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const router = useRouter();
  const { mutate } = useReissue();
  const hasChecked = useRef(false);
  const [isReady, setIsReady] = useState(!!accessToken);

  useEffect(() => {
    if (accessToken || hasChecked.current) return;
    hasChecked.current = true;

    mutate(undefined, {
      onSuccess: ({ data }) => {
        if (!data) {
          router.replace(ROUTES.LOGIN);
          return;
        }
        setAccessToken(data.accessToken);
        setIsReady(true);
      },
      onError: () => {
        router.replace(ROUTES.LOGIN);
      },
    });
  }, [accessToken, mutate, router, setAccessToken]);

  if (!isReady) return null;

  return <>{children}</>;
};
