"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "@/api/generated/endpoints/auth/auth";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export const useLogoutAction = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAccessToken();
      queryClient.clear();
      router.replace(ROUTES.LOGIN);
    },
  });
};
