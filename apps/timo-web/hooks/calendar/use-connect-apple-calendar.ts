"use client";

import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import type {
  AppleCalendarConnectRequest,
  BaseResponseUserProfileResponse,
} from "@/generated/models";

import { connectCalendar1 } from "@/generated/endpoints/apple-calendar/apple-calendar";
import { getGetMyProfileQueryKey } from "@/generated/endpoints/user/user";
import { useTodoQueryInvalidation } from "@/hooks/todo/use-todo-query-invalidation";

const appleCalendarConnectionSchema = z.object({
  appleCalendarConnected: z.literal(true),
  appleCalendarId: z.string().optional(),
});

export const useConnectAppleCalendar = () => {
  const queryClient = useQueryClient();
  const { invalidateHome, invalidateToday } = useTodoQueryInvalidation();

  return async (credentials: AppleCalendarConnectRequest) => {
    const response = await connectCalendar1(credentials);
    const connection = appleCalendarConnectionSchema.parse(response.data);
    const profileKey = getGetMyProfileQueryKey();

    queryClient.setQueryData<BaseResponseUserProfileResponse>(
      profileKey,
      (profile) =>
        profile?.data
          ? { ...profile, data: { ...profile.data, ...connection } }
          : profile,
    );
    void queryClient.invalidateQueries({ queryKey: profileKey });
    void queryClient.invalidateQueries({
      queryKey: ["calendar-sync"],
    });
    invalidateHome();
    invalidateToday();
  };
};
