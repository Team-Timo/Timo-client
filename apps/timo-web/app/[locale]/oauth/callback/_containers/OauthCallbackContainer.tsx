"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { useToken } from "@/api/generated/endpoints/auth/auth";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export const OauthCallbackContainer = () => {
  const code = useSearchParams().get("code");
  const router = useRouter();
  const queryClient = useQueryClient();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const { mutate } = useToken();
  const hasRequested = useRef(false);

  useEffect(() => {
    if (!code || hasRequested.current) return;
    hasRequested.current = true;

    mutate(
      { data: { code } },
      {
        onSuccess: ({ data }) => {
          if (!data?.accessToken) return;
          setAccessToken(data.accessToken);
          queryClient.setQueryData(["user", "me"], data.user);
          router.replace(data.isNewUser ? "/onboarding" : "/home");
        },
        onError: () => {
          router.replace("/login");
        },
      },
    );
  }, [code, mutate, queryClient, router, setAccessToken]);

  return null;
};
