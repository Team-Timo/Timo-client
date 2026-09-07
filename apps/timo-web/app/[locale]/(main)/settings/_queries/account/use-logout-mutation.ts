"use client";

import { useMutation } from "@tanstack/react-query";

import { useClearSession } from "@/app/[locale]/(main)/settings/_hooks/use-clear-session";
import { logout } from "@/generated/endpoints/auth/auth";

export const useLogoutMutation = () => {
  const clearSession = useClearSession();

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      clearSession();
    },
  });
};
