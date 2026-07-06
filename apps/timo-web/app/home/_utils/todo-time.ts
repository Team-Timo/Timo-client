const SECONDS_PER_HOUR = 3600;

const SECONDS_PER_MINUTE = 60;

export const convertDurationToTimeText = (durationSeconds: number): string => {
  const hours = Math.floor(durationSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (durationSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};
