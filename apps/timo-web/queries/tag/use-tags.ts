"use client";

import { useGetTags } from "@/api/generated/endpoints/tag/tag";
import { tagListDataSchema } from "@/api/tag/tag-schema";

export const useTags = () =>
  useGetTags({
    query: {
      select: ({ data }) => tagListDataSchema.parse(data),
    },
  });
