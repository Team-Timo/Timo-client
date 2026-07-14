"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getGetTimeBoxesQueryKey,
  getTimeBoxes,
} from "@/api/generated/endpoints/time-box/time-box";
import { timeBoxListSchema } from "@/types/timebox-type";

export const useTimeBoxes = (date: string) =>
  useQuery({
    queryKey: getGetTimeBoxesQueryKey({ date }),
    queryFn: ({ signal }) => getTimeBoxes({ date }, undefined, signal),
    select: ({ data }) => timeBoxListSchema.parse(data ?? []),
  });
