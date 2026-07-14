import { TODO_ICON_VALUES } from "@repo/timo-design-system/ui";
import { useController, useForm } from "react-hook-form";

import type { TodoDetailResponse } from "@/api/generated/models";
import type {
  PriorityLevel,
  RepeatFrequency,
  TimeOption,
  TimeSelection,
  TodoIconValue,
} from "@repo/timo-design-system/ui";

import { useDetailSubtaskField } from "@/hooks/todo-modal/use-detail-subtask-field";
import { useTagField } from "@/hooks/todo-modal/use-tag-field";
import { parseDateKey } from "@/utils/date/date";
import {
  TITLE_MAX_WEIGHTED_LENGTH,
  truncateToWeightedLength,
} from "@/utils/todo/text-length";
import { convertDurationToTimeText } from "@/utils/todo/todo-time";

interface DetailTodoFormValues {
  date: Date;
  time: string;
  priority: PriorityLevel;
  tagId: number | null;
  isRepeatActive: boolean;
  repeatFrequency: RepeatFrequency;
  selectedWeekdayIds: string[];
  repeatDay: string;
  isCompleted: boolean;
  title: string;
  memo: string;
  icon: TodoIconValue | null;
}

const isTodoIconValue = (icon: string | null): icon is TodoIconValue =>
  icon !== null && (TODO_ICON_VALUES as readonly string[]).includes(icon);

const isPriorityLevel = (
  priority: string | undefined,
): priority is PriorityLevel =>
  priority === "VERY_HIGH" ||
  priority === "HIGH" ||
  priority === "MEDIUM" ||
  priority === "LOW";

const isRepeatFrequency = (
  repeatType: string | undefined,
): repeatType is RepeatFrequency =>
  repeatType === "DAILY" || repeatType === "WEEKLY" || repeatType === "MONTHLY";

export const DETAIL_TODO_TIME_OPTIONS: TimeOption[] = [
  { minute: 15, value: "15", unit: "min" },
  { minute: 30, value: "30", unit: "min" },
  { minute: 45, value: "45", unit: "min" },
  { minute: 60, value: "1", unit: "h" },
  { minute: 90, value: "1.5", unit: "h" },
];

export const DETAIL_TODO_WEEKDAY_IDS = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
] as const;

export interface UseDetailTodoFormParams {
  todo: TodoDetailResponse;
}

export const useDetailTodoForm = ({ todo }: UseDetailTodoFormParams) => {
  const durationText = convertDurationToTimeText(todo.durationSeconds ?? 0);
  const todoIcon = todo.icon ?? null;
  const todoDate = parseDateKey(todo.date) ?? new Date();
  const repeatType = isRepeatFrequency(todo.repeat.type)
    ? todo.repeat.type
    : "DAILY";

  const { control, handleSubmit, formState } = useForm<DetailTodoFormValues>({
    defaultValues: {
      date: todoDate,
      time: durationText,
      priority: isPriorityLevel(todo.priority) ? todo.priority : "MEDIUM",
      tagId: todo.tag?.tagId ?? null,
      isRepeatActive: todo.repeat.type !== "NONE",
      repeatFrequency: repeatType,
      selectedWeekdayIds: todo.repeat.weekdays ?? [],
      repeatDay: todo.repeat.dayOfMonth?.toString() ?? "",
      isCompleted: todo.completed,
      title: todo.title,
      memo: todo.memo ?? "",
      icon: isTodoIconValue(todoIcon) ? todoIcon : null,
    },
  });

  const { field: dateField } = useController({ name: "date", control });
  const { field: timeField } = useController({ name: "time", control });
  const { field: priorityField } = useController({
    name: "priority",
    control,
  });
  const { field: isRepeatActiveField } = useController({
    name: "isRepeatActive",
    control,
  });
  const { field: repeatFrequencyField } = useController({
    name: "repeatFrequency",
    control,
  });
  const { field: selectedWeekdayIdsField } = useController({
    name: "selectedWeekdayIds",
    control,
  });
  const { field: repeatDayField } = useController({
    name: "repeatDay",
    control,
  });
  const { field: isCompletedField } = useController({
    name: "isCompleted",
    control,
  });
  const { field: titleField } = useController({ name: "title", control });
  const { field: memoField } = useController({ name: "memo", control });
  const { field: iconField } = useController({ name: "icon", control });

  const subtaskField = useDetailSubtaskField({ subtasks: todo.subtasks });
  const tagField = useTagField({ control });

  const selectIcon = (nextIcon: TodoIconValue) => iconField.onChange(nextIcon);
  const removeIcon = () => iconField.onChange(null);

  const changeTitle = (value: string) => {
    titleField.onChange(
      truncateToWeightedLength(value, TITLE_MAX_WEIGHTED_LENGTH),
    );
  };

  const selectTime = (nextTime: TimeSelection) => {
    if (nextTime === "ai") return;

    const option = DETAIL_TODO_TIME_OPTIONS.find(
      (item) => item.minute === nextTime,
    );

    if (!option) return;

    timeField.onChange(`${option.value} ${option.unit}`);
  };

  const changeRepeatFrequency = (frequency: RepeatFrequency) => {
    isRepeatActiveField.onChange(true);
    repeatFrequencyField.onChange(frequency);
  };

  const toggleWeekday = (weekdayId: string) => {
    selectedWeekdayIdsField.onChange(
      selectedWeekdayIdsField.value.includes(weekdayId)
        ? selectedWeekdayIdsField.value.filter((item) => item !== weekdayId)
        : [...selectedWeekdayIdsField.value, weekdayId],
    );
  };

  return {
    date: dateField.value,
    setDate: dateField.onChange,
    time: timeField.value,
    setTime: timeField.onChange,
    priority: priorityField.value,
    setPriority: priorityField.onChange,
    tagLabels: tagField.tagLabels,
    selectedTagLabel: tagField.selectedTagLabel,
    handleSelectTag: tagField.handleSelectTag,
    isRepeatActive: isRepeatActiveField.value,
    repeatFrequency: repeatFrequencyField.value,
    selectedWeekdayIds: selectedWeekdayIdsField.value,
    repeatDay: repeatDayField.value,
    setRepeatDay: repeatDayField.onChange,
    isCompleted: isCompletedField.value,
    setIsCompleted: isCompletedField.onChange,
    title: titleField.value,
    changeTitle,
    subtaskInputs: subtaskField.subtaskInputs,
    registerSubtaskInputRef: subtaskField.registerInputRef,
    changeSubtaskInput: subtaskField.handleInputChange,
    changeSubtaskCompleted: subtaskField.handleCompletedChange,
    handleSubtaskInputKeyDown: subtaskField.handleInputKeyDown,
    memo: memoField.value,
    setMemo: memoField.onChange,
    icon: iconField.value,
    selectIcon,
    removeIcon,
    selectTime,
    changeRepeatFrequency,
    toggleWeekday,
    handleSubmit,
    dirtyFields: formState.dirtyFields,
  };
};
