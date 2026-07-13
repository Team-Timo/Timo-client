"use client";

import { useMutation } from "@tanstack/react-query";

import { logout } from "@/api/generated/endpoints/auth/auth";
import { useClearSession } from "@/hooks/useClearSession";

export const useLogoutAction = () => {
  const clearSession = useClearSession();

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      clearSession();
    },
  });
};
