const MINUTES_PER_HOUR = 60;

export const formatDurationLabel = (
  totalMinutes: number,
  hourUnit: string,
  minuteUnit: string,
): string => {
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;

  if (hours === 0) return `${minutes}${minuteUnit}`;
  if (minutes === 0) return `${hours}${hourUnit}`;

  return `${hours}${hourUnit} ${minutes}${minuteUnit}`;
};
