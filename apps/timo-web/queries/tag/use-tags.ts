"use client";

import { tagListDataSchema } from "@/api/common/tag-schema";
import { useGetTags } from "@/api/generated/endpoints/tag/tag";

export const useTags = () =>
  useGetTags({
    query: {
      select: ({ data }) => tagListDataSchema.parse(data),
    },
  });
