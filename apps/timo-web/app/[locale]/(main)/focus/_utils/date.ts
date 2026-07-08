const DAY_OF_WEEK_LABELS = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

export const convertDateToDayNumberText = (date: Date): string => {
  return `${date.getDate()}`;
};

export const convertDateToDayOfWeekText = (date: Date): string => {
  return DAY_OF_WEEK_LABELS[date.getDay()] ?? "";
};

export const convertDateToBadgeText = (date: Date): string => {
  const year = `${date.getFullYear()}`.slice(-2);
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}.${month}.${day}`;
};
