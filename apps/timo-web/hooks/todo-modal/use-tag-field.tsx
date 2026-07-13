import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";
import { useState } from "react";
import { useController } from "react-hook-form";

import type { CreateTodoRequest } from "@/api/todo/todo-schema";
import type { Control } from "react-hook-form";

import { CreateTagModalContainer } from "@/components/tag-modal/CreateTagModalContainer";

const TAG_NAMES = [
  "dailyLife",
  "work",
  "exercise",
  "assignment",
  "additional",
] as const;

type PresetTagName = (typeof TAG_NAMES)[number];

// 태그 관리 API가 아직 없어, 목데이터 용도로 태그 이름 순서에 고정 tagId를 매핑한다.
const TAG_ID_BY_NAME: Record<PresetTagName, number> = {
  dailyLife: 1,
  work: 2,
  exercise: 3,
  assignment: 4,
  additional: 5,
};

// 사용자가 새로 만든 태그는 고정 프리셋에 없으므로, 입력한 이름을 그대로 name으로 저장한다.
const MAX_TAG_COUNT = 8;

export const DEFAULT_TAG: { id: number; name: string } = {
  id: TAG_ID_BY_NAME.dailyLife,
  name: "dailyLife",
};

export interface UseTagFieldParams {
  control: Control<CreateTodoRequest>;
}

export const useTagField = ({ control }: UseTagFieldParams) => {
  const tCommon = useTranslations("Common");
  const { field } = useController({ name: "tagId", control });
  const [customTags, setCustomTags] = useState<{ id: number; label: string }[]>(
    [],
  );
  const [isTagLimitToastOpen, setIsTagLimitToastOpen] = useState(false);

  const tagOptions = [
    ...TAG_NAMES.map((name) => ({
      id: TAG_ID_BY_NAME[name],
      label: tCommon(`tag.${name}`),
      name,
    })),
    ...customTags.map((tag) => ({ ...tag, name: tag.label })),
  ];
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
          const nextId =
            Math.max(0, ...tagOptions.map((option) => option.id)) + 1;

          setCustomTags((prev) => [...prev, { id: nextId, label }]);
          field.onChange(nextId);
          close();
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
    handleSelectTag,
    handleAddTagClick,
  };
};
