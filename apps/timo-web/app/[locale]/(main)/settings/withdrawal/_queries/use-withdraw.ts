"use client";

import { useMutation } from "@tanstack/react-query";

import { withdraw } from "@/api/generated/endpoints/auth/auth";
import { useClearSession } from "@/hooks/useClearSession";

export const useWithdrawAction = () => {
  const clearSession = useClearSession();

  return useMutation({
    mutationFn: () => withdraw(),
    onSuccess: () => {
      clearSession();
    },
  });
};
