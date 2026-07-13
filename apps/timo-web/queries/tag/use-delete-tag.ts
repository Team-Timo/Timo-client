"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteTag,
  getGetTagsQueryKey,
} from "@/api/generated/endpoints/tag/tag";

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tagId: number) => deleteTag(tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGetTagsQueryKey() });
    },
  });
};
