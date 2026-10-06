import { TODO_ICON_VALUES } from "@repo/timo-design-system/ui";
import { useController, useForm } from "react-hook-form";

import type { TodoDetailResponse, TodoUpdateRequest } from "@/generated/models";
import type { UpdateTodoSubmitHandlers } from "@/hooks/todo-modal/detail/use-update-todo-submit";
import type {
  PriorityLevel,
  RepeatFrequency,
  TimeOption,
  TimeSelection,
  TodoIconValue,
} from "@repo/timo-design-system/ui";

import { SECONDS_PER_MINUTE } from "@/constants/time";
import { useTagField } from "@/hooks/todo-modal/common/use-tag-field";
import { useDetailSubtaskField } from "@/hooks/todo-modal/detail/use-detail-subtask-field";
import { parseDateKey } from "@/utils/date/date";
import {
  getEffectiveDetailTodoRepeat,
  isSameEffectiveDetailTodoRepeat,
} from "@/utils/todo/detail-todo-repeat";
import { getRepeatDetailsReset } from "@/utils/todo/repeat-detail-reset";
import {
  TITLE_MAX_WEIGHTED_LENGTH,
  truncateToWeightedLength,
} from "@/utils/todo/text-length";
import { convertSecondsToApiDuration } from "@/utils/todo/todo-time";

interface DetailTodoFormValues {
  date: Date;
  time: string;
  priority: PriorityLevel;
  tagId: number | null;
  isRepeatActive: boolean;
  repeatFrequency: RepeatFrequency;
  selectedWeekdayIds: string[];
  repeatDay: string;
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
  todo: TodoDetailResponse;
  onUpdate: (
    data: TodoUpdateRequest,
    handlers?: UpdateTodoSubmitHandlers,
  ) => void;
}

export const useDetailTodoForm = ({
  todo,
  onUpdate,
}: UseDetailTodoFormParams) => {
  const durationText = convertSecondsToApiDuration(todo.durationSeconds ?? 0);
  const todoIcon = todo.icon ?? null;
  const todoDate = parseDateKey(todo.date) ?? new Date();
  const repeatType = isRepeatFrequency(todo.repeat.type)
    ? todo.repeat.type
    : "DAILY";

  const { control, handleSubmit, formState, getValues } =
    useForm<DetailTodoFormValues>({
      defaultValues: {
        date: todoDate,
        time: durationText,
        priority: isPriorityLevel(todo.priority) ? todo.priority : "MEDIUM",
        tagId: todo.tag?.tagId ?? null,
        isRepeatActive: todo.repeat.type !== "NONE",
        repeatFrequency: repeatType,
        selectedWeekdayIds: todo.repeat.weekdays ?? [],
        repeatDay: todo.repeat.dayOfMonth?.toString() ?? "",
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
  const { field: titleField } = useController({ name: "title", control });
  const { field: memoField } = useController({ name: "memo", control });
  const { field: iconField } = useController({ name: "icon", control });

  const subtaskField = useDetailSubtaskField({ subtasks: todo.subtasks });
  const tagField = useTagField({
    control,
    onTagCreated: (tagId, syncLocal) =>
      onUpdate({ tagId }, { onSuccess: syncLocal }),
  });

  const selectIcon = (nextIcon: TodoIconValue) => iconField.onChange(nextIcon);
  const removeIcon = () => iconField.onChange(null);
  const setTagId = (tagId: number) => tagField.handleSelectTagById(tagId);
  const setSelectedWeekdayIds = (weekdayIds: string[]) =>
    selectedWeekdayIdsField.onChange(weekdayIds);
  const setSubtaskCompleted = (id: number, completed: boolean) =>
    subtaskField.handleCompletedChange(id, completed);

  const changeTitle = (value: string) => {
    titleField.onChange(
      truncateToWeightedLength(value, TITLE_MAX_WEIGHTED_LENGTH),
    );
  };

  const selectTime = (nextTime: TimeSelection) => {
    if (nextTime === "ai") return undefined;

    const option = DETAIL_TODO_TIME_OPTIONS.find(
      (item) => item.minute === nextTime,
    );

    if (!option) return undefined;

    return convertSecondsToApiDuration(option.minute * SECONDS_PER_MINUTE);
  };

  const changeRepeatFrequency = (frequency: RepeatFrequency) => {
    const reset = getRepeatDetailsReset({
      currentFrequency: repeatFrequencyField.value,
      nextFrequency: frequency,
      isRepeatActive: isRepeatActiveField.value,
      emptyDay: "",
    });

    if (reset) {
      selectedWeekdayIdsField.onChange(reset.weekdays);
      repeatDayField.onChange(reset.day);
    }
    isRepeatActiveField.onChange(true);
    repeatFrequencyField.onChange(frequency);
  };

  const effectiveRepeat = getEffectiveDetailTodoRepeat({
    isRepeatActive: isRepeatActiveField.value,
    repeatFrequency: repeatFrequencyField.value,
    selectedWeekdayIds: selectedWeekdayIdsField.value ?? [],
    repeatDay: repeatDayField.value,
  });
  const initialEffectiveRepeat = getEffectiveDetailTodoRepeat({
    isRepeatActive: todo.repeat.type !== "NONE",
    repeatFrequency: repeatType,
    selectedWeekdayIds: todo.repeat.weekdays ?? [],
    repeatDay: todo.repeat.dayOfMonth?.toString() ?? "",
  });
  const getRepeatChange = () => {
    const values = getValues();
    const repeat = getEffectiveDetailTodoRepeat({
      isRepeatActive: values.isRepeatActive,
      repeatFrequency: values.repeatFrequency,
      selectedWeekdayIds: values.selectedWeekdayIds ?? [],
      repeatDay: values.repeatDay,
    });

    if (repeat === null) return { isValid: false } as const;

    return {
      isValid: true,
      repeat,
      hasChanges:
        initialEffectiveRepeat === null ||
        !isSameEffectiveDetailTodoRepeat(repeat, initialEffectiveRepeat),
    } as const;
  };

  const getTagIdByLabel = (label: string) => {
    const option = tagField.tagOptions.find((item) => item.label === label);
    if (!option) return null;

    return option.id;
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
    getTagIdByLabel,
    setTagId,
    handleAddTagClick: tagField.handleAddTagClick,
    isTagLimitToastOpen: tagField.isTagLimitToastOpen,
    closeTagLimitToast: tagField.closeTagLimitToast,
    isCreateTagErrorToastOpen: tagField.isCreateTagErrorToastOpen,
    closeCreateTagErrorToast: tagField.closeCreateTagErrorToast,
    isRepeatEffective:
      effectiveRepeat !== null && effectiveRepeat.repeatType !== "NONE",
    repeatFrequency: repeatFrequencyField.value,
    selectedWeekdayIds: selectedWeekdayIdsField.value,
    setSelectedWeekdayIds,
    repeatDay: repeatDayField.value,
    setRepeatDay: repeatDayField.onChange,
    title: titleField.value,
    changeTitle,
    subtaskInputs: subtaskField.subtaskInputs,
    registerSubtaskInputRef: subtaskField.registerInputRef,
    changeSubtaskInput: subtaskField.handleInputChange,
    setSubtaskCompleted,
    handleSubtaskInputKeyDown: subtaskField.handleInputKeyDown,
    focusFirstSubtaskInput: subtaskField.focusFirstInput,
    memo: memoField.value,
    setMemo: memoField.onChange,
    icon: iconField.value,
    selectIcon,
    removeIcon,
    selectTime,
    changeRepeatFrequency,
    getRepeatChange,
    handleSubmit,
    dirtyFields: formState.dirtyFields,
  };
};

export type UseDetailTodoFormReturn = ReturnType<typeof useDetailTodoForm>;
