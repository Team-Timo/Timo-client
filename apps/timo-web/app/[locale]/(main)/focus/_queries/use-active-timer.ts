"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getActiveTimer,
  getGetActiveTimerQueryKey,
} from "@/api/generated/endpoints/timer/timer";
import { activeTimerSchema } from "@/app/[locale]/(main)/focus/_types/timer-type";

export const useActiveTimer = () =>
  useQuery({
    queryKey: getGetActiveTimerQueryKey(),
    queryFn: ({ signal }) => getActiveTimer(undefined, signal),
    select: ({ data }) => (data ? activeTimerSchema.parse(data) : undefined),
    refetchInterval: (query) =>
      query.state.data?.data?.status === "RUNNING" ? 1000 : false,
  });
