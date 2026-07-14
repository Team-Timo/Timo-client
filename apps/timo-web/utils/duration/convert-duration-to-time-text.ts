import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "@/constants/time";

/** 1분 미만으로 잘려나가는 초는 버리지 않고 분 단위로 올림한다 */
export const convertDurationToTimeText = (durationSeconds: number): string => {
  const totalMinutes = Math.ceil(durationSeconds / SECONDS_PER_MINUTE);
  const hours = Math.floor(
    totalMinutes / (SECONDS_PER_HOUR / SECONDS_PER_MINUTE),
  );
  const minutes = totalMinutes % (SECONDS_PER_HOUR / SECONDS_PER_MINUTE);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
