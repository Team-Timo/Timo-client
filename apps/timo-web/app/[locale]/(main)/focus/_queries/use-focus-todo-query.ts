"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  getFocusTodo,
  getGetFocusTodoQueryKey,
} from "@/api/generated/endpoints/focus/focus";
import { focusViewSchema } from "@/app/[locale]/(main)/focus/_types/task-type";

export const useFocusTodoQuery = () =>
  useSuspenseQuery({
    queryKey: getGetFocusTodoQueryKey(),
    queryFn: ({ signal }) => getFocusTodo(undefined, signal),
    select: ({ data }) => focusViewSchema.parse(data),
  });
