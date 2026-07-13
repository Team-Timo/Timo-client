"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  getGetMyProfileQueryKey,
  getMyProfile,
} from "@/api/generated/endpoints/user/user";
import { settingsProfileResponseSchema } from "@/app/[locale]/(main)/settings/_types/profile-type";

export const useSettingsProfileQuery = () =>
  useSuspenseQuery({
    queryKey: getGetMyProfileQueryKey(),
    queryFn: ({ signal }) => getMyProfile(undefined, signal),
    select: ({ data }) => settingsProfileResponseSchema.parse(data),
  });
