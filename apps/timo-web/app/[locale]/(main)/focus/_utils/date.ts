export type WeekdayKey = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

const WEEKDAY_KEYS: WeekdayKey[] = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];

export const convertDateToDayNumberText = (date: Date): string => {
  return `${date.getDate()}`;
};

export const convertDateToDayOfWeekKey = (date: Date): WeekdayKey => {
  return WEEKDAY_KEYS[date.getDay()] ?? "SUN";
};

export const convertDateToBadgeText = (date: Date): string => {
  const year = `${date.getFullYear()}`.slice(-2);
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}.${month}.${day}`;
};
