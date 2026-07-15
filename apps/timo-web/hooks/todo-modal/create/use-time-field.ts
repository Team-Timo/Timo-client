import { useState } from "react";
import { useController, useWatch } from "react-hook-form";

import type { CreateTodoRequest } from "@/schemas/todo/todo-schema";
import type { TimeSelection } from "@repo/timo-design-system/ui";
import type { Control } from "react-hook-form";

import { useRecommendDuration } from "@/api/generated/endpoints/ai/ai";
import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "@/constants/time";
import { recommendDurationResponseSchema } from "@/schemas/todo/todo-schema";
import {
  convertApiDurationToSeconds,
  convertSecondsToApiDuration,
} from "@/utils/todo/todo-time";

const TIME_OPTIONS = [
  { minute: 15, value: "15", unit: "min" },
  { minute: 30, value: "30", unit: "min" },
  { minute: 45, value: "45", unit: "min" },
  { minute: 60, value: "60", unit: "min" },
  { minute: 90, value: "90", unit: "min" },
];

export interface UseTimeFieldParams {
  control: Control<CreateTodoRequest>;
}

// 숫자와 첫 번째 콜론만 남기고, 분(minute) 부분만 2자리로 자른다.
const formatDurationInput = (raw: string): string => {
  const sanitized = raw.replace(/[^\d:]/g, "");
  const colonIndex = sanitized.indexOf(":");

  if (colonIndex === -1) {
    return sanitized;
  }

  const hours = sanitized.slice(0, colonIndex).replace(/:/g, "");
  const minutes = sanitized
    .slice(colonIndex + 1)
    .replace(/:/g, "")
    .slice(0, 2);

  return `${hours}:${minutes}`;
};

// "mm:ss" duration을 트리거용 "h:mm" 시계 표기로 변환한다. (예: "90:00" → "1:30")
const formatDurationAsClockLabel = (duration: string): string => {
  const totalSeconds = convertApiDurationToSeconds(duration);
  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

export const useTimeField = ({ control }: UseTimeFieldParams) => {
  const { field } = useController({ name: "duration", control });
  const title = useWatch({ control, name: "title" });
  const tagId = useWatch({ control, name: "tagId" });
  const [selectedTime, setSelectedTime] = useState<TimeSelection>();
  const [timeDisplay, setTimeDisplay] = useState("0:00");
  const [recommendedDuration, setRecommendedDuration] = useState<string>();
  const [isAiDurationErrorToastOpen, setIsAiDurationErrorToastOpen] =
    useState(false);
  const { mutate: recommendDuration, isPending: isRecommendingDuration } =
    useRecommendDuration();

  const applyRecommendedDuration = (duration: string) => {
    setRecommendedDuration(duration);
    setSelectedTime("ai");
    setTimeDisplay(formatDurationAsClockLabel(duration));
    field.onChange(duration);
  };

  const handleTimeSelectorOpen = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || isRecommendingDuration) return;

    recommendDuration(
      { data: { title: trimmedTitle, tagId: tagId ?? undefined } },
      {
        onSuccess: (response) => {
          const parsed = recommendDurationResponseSchema.safeParse(
            response.data,
          );

          if (!parsed.success) {
            setIsAiDurationErrorToastOpen(true);
            return;
          }

          applyRecommendedDuration(
            convertSecondsToApiDuration(
              parsed.data.recommendedMinutes * SECONDS_PER_MINUTE,
            ),
          );
        },
        onError: () => {
          setIsAiDurationErrorToastOpen(true);
        },
      },
    );
  };

  const handleSelectTime = (value: TimeSelection) => {
    if (value === "ai") {
      setSelectedTime(value);
      if (recommendedDuration) {
        setTimeDisplay(formatDurationAsClockLabel(recommendedDuration));
        field.onChange(recommendedDuration);
      }
      return;
    }

    setSelectedTime(value);

    const option = TIME_OPTIONS.find((item) => item.minute === value);
    if (!option) return;

    const formatted = convertSecondsToApiDuration(
      option.minute * SECONDS_PER_MINUTE,
    );
    setTimeDisplay(formatDurationAsClockLabel(formatted));
    field.onChange(formatted);
  };

  const handleDurationInputChange = (value: string) => {
    setSelectedTime(undefined);

    // TimeSelector 입력창은 h:mm을 그대로 편집하므로 타이핑한 값을 트리거 라벨에 즉시 반영한다.
    const formatted = formatDurationInput(value);
    setTimeDisplay(formatted);

    const [hoursText, minutesText = "0"] = formatted.split(":");
    const hours = Number(hoursText) || 0;
    const minutes = Number(minutesText) || 0;
    const totalSeconds =
      hours * SECONDS_PER_HOUR + minutes * SECONDS_PER_MINUTE;

    // 서버로 전송하는 duration 필드는 "총분:초" 형식이므로 변환해서 저장한다.
    const apiDuration = convertSecondsToApiDuration(totalSeconds);
    setRecommendedDuration(apiDuration);
    field.onChange(apiDuration);
  };

  const resetTime = () => {
    setSelectedTime(undefined);
    setTimeDisplay("0:00");
    setRecommendedDuration(undefined);
  };

  return {
    duration: timeDisplay,
    timeOptions: TIME_OPTIONS,
    selectedTime,
    timeDisplay,
    handleSelectTime,
    handleDurationInputChange,
    handleTimeSelectorOpen,
    resetTime,
    isAiDurationErrorToastOpen,
    closeAiDurationErrorToast: () => setIsAiDurationErrorToastOpen(false),
  };
};
