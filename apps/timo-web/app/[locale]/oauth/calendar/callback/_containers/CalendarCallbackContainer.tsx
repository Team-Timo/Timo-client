"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { useConnectCalendar } from "@/api/generated/endpoints/calendar/calendar";
import { getGetMyProfileQueryKey } from "@/api/generated/endpoints/user/user";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";

export const CalendarCallbackContainer = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: connectCalendar } = useConnectCalendar();
  const hasRequested = useRef(false);

  useEffect(() => {
    const origin = localStorage.getItem("calendarConnectOrigin");
    const redirectTarget =
      origin === "settings" ? ROUTES.SETTINGS : ROUTES.HOME;

    if (error || !code || !state) {
      router.replace(redirectTarget);
      return;
    }
    if (hasRequested.current) return;
    hasRequested.current = true;

    connectCalendar(
      { data: { authorizationCode: code, state } },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: getGetMyProfileQueryKey(),
          });
          localStorage.removeItem("calendarConnectOrigin");
          router.replace(redirectTarget);
        },
        onError: () => {
          router.replace(redirectTarget);
        },
      },
    );
  }, [code, state, error, connectCalendar, queryClient, router]);

  return null;
};
