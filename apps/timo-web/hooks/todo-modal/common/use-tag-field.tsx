import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";
import { useState } from "react";
import { useController } from "react-hook-form";

import type { Control, FieldValues, Path } from "react-hook-form";

import { CreateTagModalContainer } from "@/components/tag/CreateTagModalContainer";
import { useCreateTagMutation } from "@/queries/tag/use-create-tag-mutation";
import { useTagsQuery } from "@/queries/tag/use-tags-query";
import {
  MAX_CUSTOM_TAG_COUNT,
  tagCreateDataSchema,
} from "@/schemas/tag/tag-schema";
import { getDefaultTagLabelKey, isDefaultTagId } from "@/utils/todo/tag-label";

export interface UseTagFieldParams<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name?: Path<TFieldValues>;
  onTagCreated?: (tagId: number, syncLocal: () => void) => void;
}

export interface UseTagFieldResult {
  tagOptions: Array<{ id: number; label: string }>;
  tagLabels: string[];
  selectedTagOption?: { id: number; label: string };
  selectedTagId: number | null;
  selectedTagLabel?: string;
  isTagLimitToastOpen: boolean;
  closeTagLimitToast: () => void;
  isCreateTagErrorToastOpen: boolean;
  closeCreateTagErrorToast: () => void;
  handleSelectTag: (label: string) => void;
  handleSelectTagById: (tagId: number) => void;
  handleAddTagClick: () => void;
}

export const useTagField = <TFieldValues extends FieldValues>({
  control,
  name = "tagId" as Path<TFieldValues>,
  onTagCreated,
}: UseTagFieldParams<TFieldValues>): UseTagFieldResult => {
  const tCommon = useTranslations("Common");
  const { field } = useController({ name, control });
  const [isTagLimitToastOpen, setIsTagLimitToastOpen] =
    useState<boolean>(false);
  const [isCreateTagErrorToastOpen, setIsCreateTagErrorToastOpen] =
    useState<boolean>(false);

  const tagsQuery = useTagsQuery();
  const { mutate: createTag } = useCreateTagMutation();

  const tagOptions = (tagsQuery.data?.tags ?? []).map((tag) => {
    const defaultLabelKey = getDefaultTagLabelKey(tag.tagId);

    return {
      id: tag.tagId,
      label: defaultLabelKey ? tCommon(`tag.${defaultLabelKey}`) : tag.name,
    };
  });
  const tagLabels = tagOptions.map((option) => option.label);
  const selectedTagOption = tagOptions.find(
    (option) => option.id === field.value,
  );
  const customTagCount = (tagsQuery.data?.tags ?? []).filter(
    (tag) => !isDefaultTagId(tag.tagId),
  ).length;

  const handleSelectTag = (label: string) => {
    const option = tagOptions.find((item) => item.label === label);
    if (!option) return;

    field.onChange(option.id);
  };

  const handleSelectTagById = (tagId: number) => {
    field.onChange(tagId);
  };

  const handleAddTagClick = () => {
    if (customTagCount >= MAX_CUSTOM_TAG_COUNT) {
      setIsTagLimitToastOpen(true);
      return;
    }

    overlay.open(({ isOpen, close, unmount }) => (
      <CreateTagModalContainer
        isOpen={isOpen}
        onClose={close}
        onExited={unmount}
        existingLabels={tagLabels}
        onCreate={(label: string) => {
          createTag(
            { name: label },
            {
              onSuccess: (response) => {
                const parsed = tagCreateDataSchema.safeParse(response.data);

                if (!parsed.success) {
                  setIsCreateTagErrorToastOpen(true);
                  return;
                }

                const tagId = parsed.data.tagId;

                if (onTagCreated) {
                  onTagCreated(tagId, () => field.onChange(tagId));
                } else {
                  field.onChange(tagId);
                }
                close();
              },
              onError: () => {
                setIsCreateTagErrorToastOpen(true);
              },
            },
          );
        }}
      />
    ));
  };

  return {
    tagOptions,
    tagLabels,
    selectedTagOption,
    selectedTagId: typeof field.value === "number" ? field.value : null,
    selectedTagLabel: selectedTagOption?.label,
    isTagLimitToastOpen,
    closeTagLimitToast: () => setIsTagLimitToastOpen(false),
    isCreateTagErrorToastOpen,
    closeCreateTagErrorToast: () => setIsCreateTagErrorToastOpen(false),
    handleSelectTag,
    handleSelectTagById,
    handleAddTagClick,
  };
};
