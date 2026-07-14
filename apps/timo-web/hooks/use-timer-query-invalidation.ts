"use client";

import { useQueryClient } from "@tanstack/react-query";

import { getGetHomeQueryKey } from "@/api/generated/endpoints/home/home";
import { getGetTimeBoxesQueryKey } from "@/api/generated/endpoints/time-box/time-box";
import { getGetActiveTimerQueryKey } from "@/api/generated/endpoints/timer/timer";

export const useTimerQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateActiveTimer = () =>
    queryClient.invalidateQueries({ queryKey: getGetActiveTimerQueryKey() });
  const invalidateHomeView = () =>
    queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
  const invalidateTimeBoxes = () =>
    queryClient.invalidateQueries({ queryKey: getGetTimeBoxesQueryKey() });
  const invalidateTimerState = () => {
    invalidateActiveTimer();
    invalidateHomeView();
    invalidateTimeBoxes();
  };

  return {
    invalidateActiveTimer,
    invalidateHomeView,
    invalidateTimeBoxes,
    invalidateTimerState,
  };
};
