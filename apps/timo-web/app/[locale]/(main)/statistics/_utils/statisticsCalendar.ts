export interface CalendarDate {
  date: Date;
  day: number;
}

export const getLastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getCalendarDates = (month: Date): CalendarDate[] => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const lastDay = getLastDayOfMonth(month);

  return Array.from({ length: lastDay }, (_, index) => {
    const day = index + 1;

    return {
      date: new Date(year, monthIndex, day),
      day,
    };
  });
};

export const getFirstDayOffset = (month: Date) => {
  const firstDate = new Date(month.getFullYear(), month.getMonth(), 1);

  return (firstDate.getDay() + 6) % 7;
};

export const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};
