"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { BaseResponseUserProfileResponse } from "@/generated/models";

import { useDisconnectCalendar1 } from "@/generated/endpoints/apple-calendar/apple-calendar";
import { getGetMyProfileQueryKey } from "@/generated/endpoints/user/user";
import { useCalendarQueryInvalidation } from "@/hooks/calendar/use-calendar-query-invalidation";

export const useDisconnectAppleCalendarMutation = () => {
  const queryClient = useQueryClient();
  const invalidateCalendarData = useCalendarQueryInvalidation();

  return useDisconnectCalendar1({
    mutation: {
      onSuccess: () => {
        const profileKey = getGetMyProfileQueryKey();
        queryClient.setQueryData<BaseResponseUserProfileResponse>(
          profileKey,
          (profile) =>
            profile?.data
              ? {
                  ...profile,
                  data: {
                    ...profile.data,
                    appleCalendarConnected: false,
                    appleCalendarId: undefined,
                  },
                }
              : profile,
        );
        void queryClient.invalidateQueries({ queryKey: profileKey });
        void queryClient.invalidateQueries({
          queryKey: ["calendar-sync"],
        });
        invalidateCalendarData();
      },
    },
  });
};
