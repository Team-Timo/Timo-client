"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import type { CalendarConnectOrigin } from "@/constants/calendar";

import {
  CALENDAR_CONNECT_ORIGIN,
  CALENDAR_CONNECT_ORIGIN_KEY,
} from "@/constants/calendar";
import { ROUTES } from "@/constants/routes";
import { useConnectCalendar } from "@/generated/endpoints/calendar/calendar";
import { getGetMyProfileQueryKey } from "@/generated/endpoints/user/user";
import { useRouter } from "@/i18n/navigation";

type Route = (typeof ROUTES)[keyof typeof ROUTES];

const CALENDAR_CONNECT_REDIRECT: Record<CalendarConnectOrigin, Route> = {
  [CALENDAR_CONNECT_ORIGIN.ONBOARDING]: ROUTES.ONBOARDING,
  [CALENDAR_CONNECT_ORIGIN.SETTINGS]: ROUTES.SETTINGS,
};

const isCalendarConnectOrigin = (
  value: string | null,
): value is CalendarConnectOrigin =>
  Object.values(CALENDAR_CONNECT_ORIGIN).some((origin) => origin === value);

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
    if (hasRequested.current) return;
    hasRequested.current = true;

    const origin = localStorage.getItem(CALENDAR_CONNECT_ORIGIN_KEY);
    localStorage.removeItem(CALENDAR_CONNECT_ORIGIN_KEY);
    const redirectTarget = isCalendarConnectOrigin(origin)
      ? CALENDAR_CONNECT_REDIRECT[origin]
      : ROUTES.HOME;

    if (error || !code || !state) {
      router.replace(redirectTarget);
      return;
    }

    connectCalendar(
      { data: { authorizationCode: code, state } },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: getGetMyProfileQueryKey(),
          });
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
