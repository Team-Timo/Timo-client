"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { BaseResponseUserProfileResponse } from "@/generated/models";

import { useDisconnectCalendar1 } from "@/generated/endpoints/apple-calendar/apple-calendar";
import { getGetCalendarEventsQueryKey } from "@/generated/endpoints/calendar/calendar";
import { getGetMyProfileQueryKey } from "@/generated/endpoints/user/user";
import { useTodoQueryInvalidation } from "@/hooks/todo/use-todo-query-invalidation";

export const useDisconnectAppleCalendarMutation = () => {
  const queryClient = useQueryClient();
  const { invalidateHome, invalidateToday, invalidateFocus } =
    useTodoQueryInvalidation();

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
          queryKey: getGetCalendarEventsQueryKey(),
        });
        invalidateHome();
        invalidateToday();
        invalidateFocus();
      },
    },
  });
};
