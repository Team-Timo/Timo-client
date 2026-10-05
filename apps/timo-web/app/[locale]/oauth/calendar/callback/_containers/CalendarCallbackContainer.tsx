"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import type { CalendarConnectOrigin } from "@/constants/calendar";

import { CALENDAR_CONNECT_ORIGIN } from "@/constants/calendar";
import { ROUTES } from "@/constants/routes";
import { useConnectCalendar } from "@/generated/endpoints/calendar/calendar";
import { getGetMyProfileQueryKey } from "@/generated/endpoints/user/user";
import { useRouter } from "@/i18n/navigation";
import { markCalendarConnectFailed } from "@/utils/calendar/calendar-connect-failed";
import { consumeCalendarConnectOrigin } from "@/utils/calendar/calendar-connect-origin";

type Route = (typeof ROUTES)[keyof typeof ROUTES];

const ACCESS_DENIED_ERROR = "access_denied";

const CALENDAR_CONNECT_REDIRECT: Record<CalendarConnectOrigin, Route> = {
  [CALENDAR_CONNECT_ORIGIN.ONBOARDING]: ROUTES.ONBOARDING,
  [CALENDAR_CONNECT_ORIGIN.SETTINGS]: ROUTES.SETTINGS,
};

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

    const origin = consumeCalendarConnectOrigin();
    const hasOrigin = origin !== null;
    const redirectTarget = hasOrigin
      ? CALENDAR_CONNECT_REDIRECT[origin]
      : ROUTES.HOME;

    const notifyConnectFailed = () => {
      if (hasOrigin) markCalendarConnectFailed();
    };

    if (error || !code || !state) {
      // 사용자가 권한 동의를 취소한 경우(access_denied)는 실패로 보지 않습니다.
      if (error !== ACCESS_DENIED_ERROR) notifyConnectFailed();
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
          notifyConnectFailed();
          router.replace(redirectTarget);
        },
      },
    );
  }, [code, state, error, connectCalendar, queryClient, router]);

  return null;
};
