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
  const day = date.getDate();

  if (day === 1) {
    return `${date.getMonth() + 1}.${day}`;
  }

  return `${day}`;
};
