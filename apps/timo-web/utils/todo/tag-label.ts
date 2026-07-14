export const TAG_LABEL_KEYS = [
  "dailyLife",
  "work",
  "exercise",
  "assignment",
  "additional",
] as const;

export type TagLabelKey = (typeof TAG_LABEL_KEYS)[number];

export const isTagLabelKey = (value: string): value is TagLabelKey =>
  (TAG_LABEL_KEYS as readonly string[]).includes(value);
