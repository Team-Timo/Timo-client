"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { withdraw } from "@/api/generated/endpoints/auth/auth";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export const useWithdrawAction = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  return useMutation({
    mutationFn: () => withdraw(),
    onSuccess: () => {
      clearAccessToken();
      queryClient.clear();
      router.replace(ROUTES.LOGIN);
    },
    onError: () => {
      window.alert(
        "탈퇴 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      );
    },
  });
};
