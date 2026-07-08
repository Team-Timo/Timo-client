const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const convertDateToDateText = (date: Date): string => {
  const day = date.getDate();

  if (day === 1) {
    return `${date.getMonth() + 1}.${day}`;
  }

  return `${day}`;
};

const getStartOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getToday = (): Date => getStartOfDay(new Date());

export const addDays = (date: Date, amount: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};

export const isSameDate = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const buildDateRange = (start: Date, length: number): Date[] =>
  Array.from({ length }, (_, index) => addDays(start, index));

export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const parseDateKey = (value: string): Date | null => {
  const match = DATE_KEY_PATTERN.exec(value);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
};
