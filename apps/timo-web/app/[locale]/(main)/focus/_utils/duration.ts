const SECONDS_PER_MINUTE = 60;

export const convertDurationToMinutes = (durationSeconds: number): number =>
  Math.round(durationSeconds / SECONDS_PER_MINUTE);
