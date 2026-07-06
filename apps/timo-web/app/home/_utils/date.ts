const DAY_OF_WEEK_LABELS = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

export const convertDateToDayOfWeek = (date: Date): string => {
  return DAY_OF_WEEK_LABELS[date.getDay()] ?? "";
};

export const convertDateToDateText = (date: Date): string => {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};
