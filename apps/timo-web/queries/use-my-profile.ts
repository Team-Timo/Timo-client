"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getGetMyProfileQueryKey,
  getMyProfile,
} from "@/api/generated/endpoints/user/user";
import { useAuthStore } from "@/stores/auth/useAuthStore";

/**
 * 로그인한 유저의 프로필을 조회한다.
 * 인증 초기화가 끝나고 accessToken이 있을 때만 요청한다.
 */
export const useMyProfile = () => {
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: getGetMyProfileQueryKey(),
    queryFn: ({ signal }) => getMyProfile(undefined, signal),
    select: ({ data }) => data,
    enabled: isInitialized && !!accessToken,
  });
};
