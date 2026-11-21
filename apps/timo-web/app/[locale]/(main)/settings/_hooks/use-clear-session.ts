"use client";

import { useQueryClient } from "@tanstack/react-query";

import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { resetMixpanel } from "@/utils/analytics/mixpanel";

export const useClearSession = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  return () => {
    clearAccessToken();
    resetMixpanel();
    queryClient.clear();
    router.replace(ROUTES.LOGIN);
  };
};
