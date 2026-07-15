"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { BodyType } from "@/api/client/custom-instance";
import type { TagCreateRequest } from "@/api/generated/models";

import {
  createTag,
  getGetTagsQueryKey,
} from "@/api/generated/endpoints/tag/tag";

export const useCreateTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BodyType<TagCreateRequest>) => createTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGetTagsQueryKey() });
    },
  });
};
