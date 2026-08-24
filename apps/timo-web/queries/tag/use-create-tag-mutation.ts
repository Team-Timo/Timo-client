"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { TagCreateRequest } from "@/generated/models";
import type { BodyType } from "@/http/custom-instance";

import { createTag, getGetTagsQueryKey } from "@/generated/endpoints/tag/tag";

export const useCreateTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BodyType<TagCreateRequest>) => createTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGetTagsQueryKey() });
    },
  });
};
