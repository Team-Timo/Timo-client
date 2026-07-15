"use client";

import { useGetTags } from "@/api/generated/endpoints/tag/tag";
import { tagListDataSchema } from "@/schemas/tag/tag-schema";

export const useTagsQuery = () =>
  useGetTags({
    query: {
      select: ({ data }) => tagListDataSchema.parse(data),
    },
  });
