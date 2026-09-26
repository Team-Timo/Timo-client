"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { focusViewSchema } from "@/app/[locale]/(main)/focus/_types/task-type";
import {
  getFocusTodo,
  getGetFocusTodoQueryKey,
} from "@/generated/endpoints/focus/focus";

export const useFocusTodoQuery = () =>
  useSuspenseQuery({
    queryKey: getGetFocusTodoQueryKey(),
    queryFn: ({ signal }) => getFocusTodo(undefined, signal),
    select: ({ data }) => focusViewSchema.parse(data),
  });
