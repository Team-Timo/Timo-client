"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import type { GetHomeViewParams } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

import {
  getGetHomeQueryKey,
  getHome,
} from "@/api/generated/endpoints/home/home";
import { homeViewDataSchema } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/home-view-type";

export const useHomeView = ({ filter, baseDate }: GetHomeViewParams) =>
  useSuspenseQuery({
    queryKey: getGetHomeQueryKey({ filter, baseDate }),
    queryFn: ({ signal }) => getHome({ filter, baseDate }, undefined, signal),
    select: ({ data }) => homeViewDataSchema.parse(data),
    staleTime: 0,
  });
