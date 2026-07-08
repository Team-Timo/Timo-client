const DAY_OF_WEEK_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export type DayOfWeekKey = (typeof DAY_OF_WEEK_KEYS)[number];

export const getDayOfWeekKey = (date: Date): DayOfWeekKey => {
  return DAY_OF_WEEK_KEYS[date.getDay()] ?? "sunday";
};
