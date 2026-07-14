export const TAG_LABEL_KEYS = [
  "dailyLife",
  "work",
  "exercise",
  "assignment",
  "additional",
] as const;

export type TagLabelKey = (typeof TAG_LABEL_KEYS)[number];

const TAG_LABEL_KEY_BY_NAME: Record<string, TagLabelKey> = {
  dailyLife: "dailyLife",
  work: "work",
  exercise: "exercise",
  assignment: "assignment",
  additional: "additional",
  Daily: "dailyLife",
  Work: "work",
  Exercise: "exercise",
  Assignment: "assignment",
  Additional: "additional",
  일상: "dailyLife",
  업무: "work",
  운동: "exercise",
  과제: "assignment",
  기타: "additional",
};

export const isTagLabelKey = (value: string): value is TagLabelKey =>
  (TAG_LABEL_KEYS as readonly string[]).includes(value);

export const getTagLabelKey = (value: string): TagLabelKey | undefined =>
  TAG_LABEL_KEY_BY_NAME[value];
