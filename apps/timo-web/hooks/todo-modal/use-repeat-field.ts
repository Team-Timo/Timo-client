import { useTranslations } from "next-intl";
import { useController } from "react-hook-form";

import type {
  CreateTodoRequest,
  TodoRepeatWeekday,
} from "@/api/todo/todo-schema";
import type { RepeatFrequency } from "@repo/timo-design-system/ui";
import type { Control } from "react-hook-form";

const WEEKDAY_CODES: TodoRepeatWeekday[] = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];

export interface UseRepeatFieldParams {
  control: Control<CreateTodoRequest>;
}

export const useRepeatField = ({ control }: UseRepeatFieldParams) => {
  const tCommon = useTranslations("Common");
  const repeatTypeField = useController({ name: "repeatType", control });
  const repeatWeekdaysField = useController({
    name: "repeatWeekdays",
    control,
  });
  const repeatDayField = useController({
    name: "repeatDayOfMonth",
    control,
  });

  const weekdays = WEEKDAY_CODES.map((code) => ({
    id: code,
    label: tCommon(`weekday.${code}`),
  }));

  const repeatType = repeatTypeField.field.value;
  const repeatWeekdays = repeatWeekdaysField.field.value ?? [];

  const isRepeatActive = repeatType !== "NONE";
  const uiRepeatFrequency: RepeatFrequency =
    repeatType === "NONE" ? "DAILY" : repeatType;

  const handleFrequencyChange = (frequency: RepeatFrequency) => {
    repeatTypeField.field.onChange(frequency);
  };

  const handleWeekdayToggle = (id: string) => {
    const day = id as TodoRepeatWeekday;
    const next = repeatWeekdays.includes(day)
      ? repeatWeekdays.filter((item) => item !== day)
      : [...repeatWeekdays, day];

    repeatWeekdaysField.field.onChange(next);
  };

  const handleRepeatDayChange = (value: string) => {
    const parsed = Number(value);
    repeatDayField.field.onChange(
      value.trim() && Number.isFinite(parsed) ? parsed : null,
    );
  };

  return {
    repeatType,
    repeatWeekdays,
    repeatDayOfMonth: repeatDayField.field.value,
    weekdays,
    isRepeatActive,
    uiRepeatFrequency,
    handleFrequencyChange,
    handleWeekdayToggle,
    handleRepeatDayChange,
  };
};
