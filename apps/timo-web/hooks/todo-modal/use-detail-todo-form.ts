import { TODO_ICON_VALUES } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useController, useForm } from "react-hook-form";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";
import type {
  PriorityLevel,
  RepeatFrequency,
  TimeOption,
  TimeSelection,
  TodoIconValue,
} from "@repo/timo-design-system/ui";

import { SECONDS_PER_MINUTE } from "@/constants/time";
import { useDetailSubtaskField } from "@/hooks/todo-modal/use-detail-subtask-field";
import { getDefaultTagLabelKey } from "@/utils/todo/tag-label";
import {
  TITLE_MAX_WEIGHTED_LENGTH,
  truncateToWeightedLength,
} from "@/utils/todo/text-length";
import {
  convertDurationToTimeText,
  convertSecondsToApiDuration,
} from "@/utils/todo/todo-time";

interface DetailTodoFormValues {
  date: Date;
  time: string;
  priority: PriorityLevel;
  selectedTag: string;
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

export const DETAIL_TODO_TIME_OPTIONS: TimeOption[] = [
  { minute: 15, value: "15", unit: "min" },
  { minute: 30, value: "30", unit: "min" },
  { minute: 45, value: "45", unit: "min" },
  { minute: 60, value: "60", unit: "min" },
  { minute: 90, value: "90", unit: "min" },
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
  todo: Todo;
}

export const useDetailTodoForm = ({ todo }: UseDetailTodoFormParams) => {
  const tCommon = useTranslations("Common");

  const durationText = convertDurationToTimeText(todo.durationSeconds);
  const todoTagName = todo.tag?.name ?? "";
  const todoIcon = todo.icon ?? null;
  const todoTagLabelKey = todo.tag
    ? getDefaultTagLabelKey(todo.tag.tagId)
    : undefined;
  const tagLabel = todoTagLabelKey
    ? tCommon(`tag.${todoTagLabelKey}`)
    : todoTagName;

  const { control, handleSubmit, formState } = useForm<DetailTodoFormValues>({
    defaultValues: {
      date: new Date(2026, 6, 1),
      time: durationText,
      priority: todo.priority,
      selectedTag: tagLabel,
      isRepeatActive: todo.isRepeated,
      repeatFrequency: "DAILY",
      selectedWeekdayIds: [],
      repeatDay: "",
      isCompleted: todo.completed,
      title: todo.title,
      memo: "",
      icon: isTodoIconValue(todoIcon) ? todoIcon : null,
    },
  });

  const { field: dateField } = useController({ name: "date", control });
  const { field: timeField } = useController({ name: "time", control });
  const { field: priorityField } = useController({
    name: "priority",
    control,
  });
  const { field: selectedTagField } = useController({
    name: "selectedTag",
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

    timeField.onChange(
      convertSecondsToApiDuration(option.minute * SECONDS_PER_MINUTE),
    );
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
    tagLabel,
    selectedTag: selectedTagField.value,
    setSelectedTag: selectedTagField.onChange,
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
