export const TAG_LABEL_KEYS = [
  "dailyLife",
  "work",
  "exercise",
  "assignment",
] as const;

export type TagLabelKey = (typeof TAG_LABEL_KEYS)[number];

/**
 * 기본 태그 4종은 서버 tagId가 고정값으로 내려오므로,
 * 이름 문자열이 아닌 tagId로 매핑해 프론트에서 next-intl로 렌더링한다.
 */
const DEFAULT_TAG_ID_TO_LABEL_KEY: Record<number, TagLabelKey> = {
  1: "dailyLife",
  2: "work",
  3: "exercise",
  4: "assignment",
};

export const getDefaultTagLabelKey = (tagId: number): TagLabelKey | undefined =>
  DEFAULT_TAG_ID_TO_LABEL_KEY[tagId];

export const isDefaultTagId = (tagId: number): boolean =>
  getDefaultTagLabelKey(tagId) !== undefined;
