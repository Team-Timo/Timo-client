"use client";

import { useQueryClient } from "@tanstack/react-query";

import { getGetHomeQueryKey } from "@/api/generated/endpoints/home/home";
import { getGetActiveTimerQueryKey } from "@/api/generated/endpoints/timer/timer";

export const useTimerQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateActiveTimer = () =>
    queryClient.invalidateQueries({ queryKey: getGetActiveTimerQueryKey() });
  const invalidateHomeView = () =>
    queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
  const invalidateTimerState = () => {
    invalidateActiveTimer();
    invalidateHomeView();
  };

  return { invalidateActiveTimer, invalidateHomeView, invalidateTimerState };
};
