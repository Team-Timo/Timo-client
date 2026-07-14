import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "@/constants/time";

export const convertDurationToTimeText = (durationSeconds: number): string => {
  const totalMinutes = Math.ceil(durationSeconds / SECONDS_PER_MINUTE);
  const hours = Math.floor(
    totalMinutes / (SECONDS_PER_HOUR / SECONDS_PER_MINUTE),
  );
  const minutes = totalMinutes % (SECONDS_PER_HOUR / SECONDS_PER_MINUTE);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
