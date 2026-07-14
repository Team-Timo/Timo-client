import { overlay } from "overlay-kit";
import { useState } from "react";
import { useController } from "react-hook-form";

import type { CreateTodoRequest } from "@/api/common/todo-schema";
import type { Control } from "react-hook-form";

import { tagCreateDataSchema } from "@/api/common/tag-schema";
import { CreateTagModalContainer } from "@/components/tag/CreateTagModalContainer";
import { useCreateTag } from "@/queries/tag/use-create-tag";
import { useTags } from "@/queries/tag/use-tags";

const MAX_TAG_COUNT = 8;

export interface UseTagFieldParams {
  control: Control<CreateTodoRequest>;
}

export const useTagField = ({ control }: UseTagFieldParams) => {
  const { field } = useController({ name: "tagId", control });
  const [isTagLimitToastOpen, setIsTagLimitToastOpen] =
    useState<boolean>(false);
  const [isCreateTagErrorToastOpen, setIsCreateTagErrorToastOpen] =
    useState<boolean>(false);

  const tagsQuery = useTags();
  const { mutate: createTag } = useCreateTag();

  const tagOptions = (tagsQuery.data?.tags ?? []).map((tag) => ({
    id: tag.tagId,
    label: tag.name,
  }));
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
