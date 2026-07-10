export const formatStatisticsMonth = (date: Date, locale = "ko") => {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(date);
};

export const formatStatisticsCalendarDate = (date: Date, locale = "ko") => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
};
