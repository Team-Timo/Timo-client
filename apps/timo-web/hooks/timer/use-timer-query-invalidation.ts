"use client";

import { useQueryClient } from "@tanstack/react-query";

import { getGetFocusTodoQueryKey } from "@/api/generated/endpoints/focus/focus";
import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/api/generated/endpoints/home/home";
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
  const invalidateTodayView = () =>
    queryClient.invalidateQueries({ queryKey: getGetTodayQueryKey() });
  const invalidateFocusTodo = () =>
    queryClient.invalidateQueries({ queryKey: getGetFocusTodoQueryKey() });
  const invalidateTimerState = () => {
    invalidateActiveTimer();
    invalidateHomeView();
    invalidateTimeBoxes();
  };

  return {
    invalidateActiveTimer,
    invalidateHomeView,
    invalidateTimeBoxes,
    invalidateTodayView,
    invalidateFocusTodo,
    invalidateTimerState,
  };
};
