import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";
import { useState } from "react";
import { useController } from "react-hook-form";

import type { Control, FieldValues, Path } from "react-hook-form";

import { tagCreateDataSchema } from "@/api/common/tag-schema";
import { CreateTagModalContainer } from "@/components/tag/CreateTagModalContainer";
import { useCreateTag } from "@/queries/tag/use-create-tag";
import { useTags } from "@/queries/tag/use-tags";
import { getTagLabelKey } from "@/utils/todo/tag-label";

const MAX_TAG_COUNT = 8;

export interface UseTagFieldParams<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name?: Path<TFieldValues>;
}

export const useTagField = <TFieldValues extends FieldValues>({
  control,
  name = "tagId" as Path<TFieldValues>,
}: UseTagFieldParams<TFieldValues>) => {
  const tCommon = useTranslations("Common");
  const { field } = useController({ name, control });
  const [isTagLimitToastOpen, setIsTagLimitToastOpen] =
    useState<boolean>(false);
  const [isCreateTagErrorToastOpen, setIsCreateTagErrorToastOpen] =
    useState<boolean>(false);

  const tagsQuery = useTags();
  const { mutate: createTag } = useCreateTag();

  const tagOptions = (tagsQuery.data?.tags ?? []).map((tag) => {
    const tagLabelKey = getTagLabelKey(tag.name);

    return {
      id: tag.tagId,
      label: tagLabelKey ? tCommon(`tag.${tagLabelKey}`) : tag.name,
    };
  });
  const tagLabels = tagOptions.map((option) => option.label);
  const selectedTagOption = tagOptions.find(
    (option) => option.id === field.value,
  );

  const handleSelectTag = (label: string) => {
    const option = tagOptions.find((item) => item.label === label);
    if (!option) return;

    field.onChange(option.id);
  };

  const handleAddTagClick = () => {
    if (tagOptions.length >= MAX_TAG_COUNT) {
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

                field.onChange(parsed.data.tagId);
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
    selectedTagLabel: selectedTagOption?.label,
    isTagLimitToastOpen,
    closeTagLimitToast: () => setIsTagLimitToastOpen(false),
    isCreateTagErrorToastOpen,
    closeCreateTagErrorToast: () => setIsCreateTagErrorToastOpen(false),
    handleSelectTag,
    handleAddTagClick,
  };
};
