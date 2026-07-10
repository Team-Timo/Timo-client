const DAY_OF_WEEK_KEYS = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
] as const;

export type DayOfWeekKey = (typeof DAY_OF_WEEK_KEYS)[number];

export const getDayOfWeekKey = (date: Date): DayOfWeekKey => {
  return DAY_OF_WEEK_KEYS[date.getDay()] ?? "SUN";
};
