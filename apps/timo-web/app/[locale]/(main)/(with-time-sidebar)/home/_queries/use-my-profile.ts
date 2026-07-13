"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  getGetMyProfileQueryKey,
  getMyProfile,
} from "@/api/generated/endpoints/user/user";

export const useMyProfile = () =>
  useSuspenseQuery({
    queryKey: getGetMyProfileQueryKey(),
    queryFn: ({ signal }) => getMyProfile(undefined, signal),
    select: ({ data }) => data,
  });
