export const formatStatisticsDate = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
};

export const formatStatisticsMonth = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(date);
};
