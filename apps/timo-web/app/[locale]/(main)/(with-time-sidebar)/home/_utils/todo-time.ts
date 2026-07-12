const SECONDS_PER_HOUR = 3600;

const SECONDS_PER_MINUTE = 60;

/**
 * 초 단위 duration을 "H:MM" 형식의 텍스트로 변환한다.
 * @param durationSeconds - 변환할 시간(초)
 * @returns "H:MM" 형식의 시간 텍스트 (예: 7200초 → "2:00")
 */
export const convertDurationToTimeText = (durationSeconds: number): string => {
  const hours = Math.floor(durationSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (durationSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

// API duration 필드(mm:ss, 분 단위가 60을 넘을 수 있음)와 durationSeconds 간 변환
export const convertSecondsToApiDuration = (
  durationSeconds: number,
): string => {
  const minutes = Math.floor(durationSeconds / SECONDS_PER_MINUTE);
  const seconds = durationSeconds % SECONDS_PER_MINUTE;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const convertApiDurationToSeconds = (duration: string): number => {
  const [minutesText, secondsText] = duration.split(":");
  const minutes = Number(minutesText) || 0;
  const seconds = Number(secondsText) || 0;
  return minutes * SECONDS_PER_MINUTE + seconds;
};
