export const convertDateToDateText = (date: Date): string => {
  const day = date.getDate();

  if (day === 1) {
    return `${date.getMonth() + 1}.${day}`;
  }

  return `${day}`;
};
