import { useState } from "react";
import { useController } from "react-hook-form";

import type { CreateTodoRequest } from "@/api/todo/todo-schema";
import type { TimeSelection } from "@repo/timo-design-system/ui";
import type { Control } from "react-hook-form";

const TIME_OPTIONS = [
  { minute: 15, value: "15", unit: "min" },
  { minute: 30, value: "30", unit: "min" },
  { minute: 45, value: "45", unit: "min" },
  { minute: 60, value: "1", unit: "h" },
  { minute: 90, value: "1.5", unit: "h" },
];

export interface UseTimeFieldParams {
  control: Control<CreateTodoRequest>;
}

export const useTimeField = ({ control }: UseTimeFieldParams) => {
  const { field } = useController({ name: "duration", control });
  const [selectedTime, setSelectedTime] = useState<TimeSelection>();
  const [timeDisplay, setTimeDisplay] = useState("0:00");

  const handleSelectTime = (value: TimeSelection) => {
    setSelectedTime(value);

    if (value === "ai") return;

    const option = TIME_OPTIONS.find((item) => item.minute === value);
    if (!option) return;

    setTimeDisplay(`${option.value} ${option.unit}`);
    field.onChange(`${option.minute}:00`);
  };

  const handleDurationInputChange = (value: string) => {
    setSelectedTime(undefined);
    setTimeDisplay(value);
    field.onChange(value);
  };

  const resetTime = () => {
    setSelectedTime(undefined);
    setTimeDisplay("0:00");
  };

  return {
    duration: field.value,
    timeOptions: TIME_OPTIONS,
    selectedTime,
    timeDisplay,
    handleSelectTime,
    handleDurationInputChange,
    resetTime,
  };
};
