"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  getGetMyProfileQueryKey,
  getMyProfile,
} from "@/api/generated/endpoints/user/user";
import { userProfileSchema } from "@/schemas/auth/user-profile-schema";

/**
 * 로그인한 유저의 프로필을 조회한다.
 * accessToken이 보장되는 화면(AuthGuardProvider 하위 등)에서만 사용해야 한다.
 */
export const useMyProfileQuery = () =>
  useSuspenseQuery({
    queryKey: getGetMyProfileQueryKey(),
    queryFn: ({ signal }) => getMyProfile(undefined, signal),
    select: ({ data }) => userProfileSchema.parse(data),
  });
