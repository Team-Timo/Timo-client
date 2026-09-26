"use client";

import { useMutation } from "@tanstack/react-query";

import { useClearSession } from "@/app/[locale]/(main)/settings/_hooks/use-clear-session";
import { withdraw } from "@/generated/endpoints/auth/auth";

export const useWithdrawMutation = () => {
  const clearSession = useClearSession();

  return useMutation({
    mutationFn: () => withdraw(),
    onSuccess: () => {
      clearSession();
    },
  });
};
