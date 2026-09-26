"use client";

import { useTranslations } from "next-intl";

import { getDefaultTagLabelKey } from "@/utils/todo/tag-label";

interface TagLabelSource {
  tagId: number;
  name: string;
}

/**
 * 기본 태그는 tagId 기준으로 next-intl 번역을 사용하고,
 * 사용자 태그는 서버 이름을 그대로 사용한다.
 */
export const useTagLabel = () => {
  const tCommon = useTranslations("Common");

  return (tag: TagLabelSource) => {
    const labelKey = getDefaultTagLabelKey(tag.tagId);

    return labelKey ? tCommon(`tag.${labelKey}`) : tag.name;
  };
};
