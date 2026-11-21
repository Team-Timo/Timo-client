"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import {
  getGetMyProfileQueryKey,
  getMyProfile,
} from "@/generated/endpoints/user/user";
import { userProfileSchema } from "@/schemas/auth/user-profile-schema";
import { identifyMixpanel } from "@/utils/analytics/mixpanel";

/**
 * 로그인한 유저의 프로필을 조회한다.
 * accessToken이 보장되는 화면(AuthGuardProvider 하위 등)에서만 사용해야 한다.
 * 로그인 직후·새로고침·재방문 등 이 훅이 호출되는 모든 경로에서
 * 조회 성공 시 Mixpanel 유저 식별을 함께 맞춘다.
 */
export const useMyProfileQuery = () => {
  const query = useSuspenseQuery({
    queryKey: getGetMyProfileQueryKey(),
    queryFn: ({ signal }) => getMyProfile(undefined, signal),
    select: ({ data }) => userProfileSchema.parse(data),
  });

  useEffect(() => {
    identifyMixpanel(String(query.data.id));
  }, [query.data.id]);

  return query;
};
