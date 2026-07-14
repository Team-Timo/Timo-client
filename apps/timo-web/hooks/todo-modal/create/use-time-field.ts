import { useState } from "react";
import { useController, useWatch } from "react-hook-form";

import type { CreateTodoRequest } from "@/api/common/todo-schema";
import type { TimeSelection } from "@repo/timo-design-system/ui";
import type { Control } from "react-hook-form";

import { recommendDurationResponseSchema } from "@/api/common/todo-schema";
import { useRecommendDuration } from "@/api/generated/endpoints/ai/ai";

const TIME_OPTIONS = [
  { minute: 15, value: "15", unit: "min" },
  { minute: 30, value: "30", unit: "min" },
  { minute: 45, value: "45", unit: "min" },
  { minute: 60, value: "1", unit: "h" },
  { minute: 90, value: "1.5", unit: "h" },
];

const MINUTES_PER_HOUR = 60;

export interface UseTimeFieldParams {
  control: Control<CreateTodoRequest>;
}

/**
 * 숫자와 콜론만 허용한다. 콜론은 첫 번째 것만 유지하고(그 뒤 콜론은 제거),
 * 시(hour) 자릿수는 제한하지 않는다. 분(minute)만 2자리로 자른다.
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

const formatMinutesToDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
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
    setTimeDisplay(duration);
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
            formatMinutesToDuration(parsed.data.recommendedMinutes),
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
        setTimeDisplay(recommendedDuration);
        field.onChange(recommendedDuration);
      }
      return;
    }

    setSelectedTime(value);

    const option = TIME_OPTIONS.find((item) => item.minute === value);
    if (!option) return;

    setTimeDisplay(`${option.value} ${option.unit}`);
    field.onChange(`${option.minute}:00`);
  };

  const handleDurationInputChange = (value: string) => {
    setSelectedTime(undefined);
    const formatted = formatDurationInput(value);
    setTimeDisplay(formatted);
    field.onChange(formatted);
  };

  const resetTime = () => {
    setSelectedTime(undefined);
    setTimeDisplay("00:00");
    setRecommendedDuration(undefined);
  };

  return {
    duration: field.value,
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
