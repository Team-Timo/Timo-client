"use client";

import { useEffect, useRef } from "react";

import { useReissue } from "@/api/generated/endpoints/auth/auth";
import { useAuthStore } from "@/stores/auth/useAuthStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const { mutate } = useReissue();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (accessToken || hasChecked.current) {
      setInitialized(true);
      return;
    }
    hasChecked.current = true;

    mutate(undefined, {
      onSuccess: ({ data }) => {
        if (data) {
          setAccessToken(data.accessToken);
        }
        setInitialized(true);
      },
      onError: () => {
        setInitialized(true);
      },
    });
  }, [accessToken, mutate, setAccessToken, setInitialized]);

  return <>{children}</>;
};
