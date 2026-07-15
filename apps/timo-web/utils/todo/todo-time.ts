import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "@/constants/time";

/**
 * 초 단위 duration을 "HH:MM" 형식의 텍스트로 변환한다.
 * @param durationSeconds - 변환할 시간(초)
 * @returns "HH:MM" 형식의 시간 텍스트 (예: 7200초 -> "02:00")
 */
export const convertDurationToTimeText = (durationSeconds: number): string => {
  const hours = Math.floor(durationSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (durationSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
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

export const convertApiDurationToClockTimeText = (duration: string): string => {
  const totalSeconds = convertApiDurationToSeconds(duration);
  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

export const convertClockTimeTextToApiDuration = (timeText: string): string => {
  const [hoursText = "0", minutesText = "0"] = timeText.split(":");
  const hours = Number(hoursText) || 0;
  const minutes = Number(minutesText) || 0;

  return convertSecondsToApiDuration(
    hours * SECONDS_PER_HOUR + minutes * SECONDS_PER_MINUTE,
  );
};

export const convertTimeTextToDurationSeconds = (timeText: string): number => {
  const normalized = timeText.trim().toLowerCase();
  const hourMatch = /^(\d+(?:\.\d+)?)\s*h$/.exec(normalized);
  const minuteMatch = /^(\d+)\s*min$/.exec(normalized);
  const timeMatch = /^(\d+)\s*:\s*([0-5]?\d)$/.exec(normalized);

  if (hourMatch) {
    return Math.round(Number(hourMatch[1]) * SECONDS_PER_HOUR);
  }

  if (minuteMatch) {
    return Number(minuteMatch[1]) * SECONDS_PER_MINUTE;
  }

  if (timeMatch) {
    const [, hoursText, minutesText] = timeMatch;
    return (
      Number(hoursText) * SECONDS_PER_HOUR +
      Number(minutesText) * SECONDS_PER_MINUTE
    );
  }

  return 0;
};
