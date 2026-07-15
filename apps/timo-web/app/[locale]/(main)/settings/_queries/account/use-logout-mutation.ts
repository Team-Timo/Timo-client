"use client";

import { useMutation } from "@tanstack/react-query";

import { logout } from "@/api/generated/endpoints/auth/auth";
import { useClearSession } from "@/app/[locale]/(main)/settings/_hooks/use-clear-session";

export const useLogoutMutation = () => {
  const clearSession = useClearSession();

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      clearSession();
    },
  });
};
