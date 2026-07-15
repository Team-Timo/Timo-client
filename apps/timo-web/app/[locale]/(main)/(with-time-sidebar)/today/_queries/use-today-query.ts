"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  getGetTodayQueryKey,
  getToday,
} from "@/api/generated/endpoints/home/home";
import { todayDataSchema } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_types/today-type";

export const useTodayQuery = () =>
  useSuspenseQuery({
    queryKey: getGetTodayQueryKey(),
    queryFn: ({ signal }) => getToday(undefined, signal),
    select: ({ data }) => todayDataSchema.parse(data),
    staleTime: 0,
  });
