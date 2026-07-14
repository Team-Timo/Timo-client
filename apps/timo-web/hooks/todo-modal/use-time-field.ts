import { useState } from "react";
import { useController, useWatch } from "react-hook-form";

import type { CreateTodoRequest } from "@/api/common/todo-schema";
import type { TimeSelection } from "@repo/timo-design-system/ui";
import type { Control } from "react-hook-form";

import { recommendDurationResponseSchema } from "@/api/common/todo-schema";
import { useRecommendDuration } from "@/api/generated/endpoints/ai/ai";
import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "@/constants/time";
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

/**
 * 숫자와 콜론만 허용한다. 콜론은 첫 번째 것만 유지하고(그 뒤 콜론은 제거),
 * 분(minute) 자릿수는 제한하지 않는다. 초(second)만 2자리로 자른다.
 */
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

/**
 * "mm:ss" duration 문자열을 트리거에 보여줄 "h:mm" 시계 표기로 변환한다.
 * 분(minute)·초(second) 두 자리를 모두 반영해 전체 길이를 기준으로 계산한다.
 * @example formatDurationAsClockLabel("90:00") // "1:30"
 */
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
  const [timeDisplay, setTimeDisplay] = useState("00:00");
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
    const formatted = formatDurationInput(value);
    setRecommendedDuration(formatted);
    setTimeDisplay(formatDurationAsClockLabel(formatted));
    field.onChange(formatted);
  };

  const resetTime = () => {
    setSelectedTime(undefined);
    setTimeDisplay("00:00");
    setRecommendedDuration(undefined);
  };

  return {
    duration: recommendedDuration ?? field.value,
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
