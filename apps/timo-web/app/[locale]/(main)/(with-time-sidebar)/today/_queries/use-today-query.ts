"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { todayDataSchema } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_types/today-type";
import { getGetTodayQueryKey, getToday } from "@/generated/endpoints/home/home";

export const useTodayQuery = () =>
  useSuspenseQuery({
    queryKey: getGetTodayQueryKey(),
    queryFn: ({ signal }) => getToday(undefined, signal),
    select: ({ data }) => todayDataSchema.parse(data),
    staleTime: 0,
  });
