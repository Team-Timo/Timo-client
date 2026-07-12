import { TODO_ICON_VALUES } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";
import type { SubtaskInputEntry } from "@/utils/todo/subtask-input-list";
import type {
  PriorityLevel,
  RepeatFrequency,
  TimeOption,
  TimeSelection,
  TodoIconValue,
} from "@repo/timo-design-system/ui";
import type { KeyboardEvent } from "react";

import {
  TITLE_MAX_WEIGHTED_LENGTH,
  truncateToWeightedLength,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/text-length";
import { convertDurationToTimeText } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/todo-time";
import {
  addSubtaskInputOnEnter,
  removeSubtaskInputOnBackspace,
} from "@/utils/todo/subtask-input-list";

const MAX_DETAIL_SUBTASK_COUNT = 10;

export interface DetailTodoSubtaskInput extends SubtaskInputEntry {
  subtaskId: number | null;
  completed: boolean;
}

const TAG_LABEL_KEYS = [
  "dailyLife",
  "work",
  "exercise",
  "assignment",
  "additional",
] as const;

type TagLabelKey = (typeof TAG_LABEL_KEYS)[number];

const isTagLabelKey = (value: string): value is TagLabelKey =>
  (TAG_LABEL_KEYS as readonly string[]).includes(value);

const isTodoIconValue = (icon: string | null): icon is TodoIconValue =>
  icon !== null && (TODO_ICON_VALUES as readonly string[]).includes(icon);

export const DETAIL_TODO_TIME_OPTIONS: TimeOption[] = [
  { minute: 15, value: "15", unit: "min" },
  { minute: 30, value: "30", unit: "min" },
  { minute: 45, value: "45", unit: "min" },
  { minute: 60, value: "1", unit: "h" },
  { minute: 90, value: "1.5", unit: "h" },
];

export const DETAIL_TODO_WEEKDAYS = [
  { id: "MON", label: "월" },
  { id: "TUE", label: "화" },
  { id: "WED", label: "수" },
  { id: "THU", label: "목" },
  { id: "FRI", label: "금" },
  { id: "SAT", label: "토" },
  { id: "SUN", label: "일" },
];

export const formatDetailTodoDateLabel = (date: Date) =>
  `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

export interface UseDetailTodoFormParams {
  todo: Todo;
}

export const useDetailTodoForm = ({ todo }: UseDetailTodoFormParams) => {
  const tCommon = useTranslations("Common");
  const durationText = convertDurationToTimeText(todo.durationSeconds);
  const tagLabel = isTagLabelKey(todo.tag.name)
    ? tCommon(`tag.${todo.tag.name}`)
    : todo.tag.name;

  const [date, setDate] = useState(new Date(2026, 6, 1));
  const [time, setTime] = useState(durationText);
  const [selectedTime, setSelectedTime] = useState<TimeSelection>();
  const [priority, setPriority] = useState<PriorityLevel>(todo.priority);
  const [selectedTag, setSelectedTag] = useState(tagLabel);
  const [isRepeatActive, setIsRepeatActive] = useState(todo.isRepeated);
  const [repeatFrequency, setRepeatFrequency] =
    useState<RepeatFrequency>("DAILY");
  const [selectedWeekdayIds, setSelectedWeekdayIds] = useState<string[]>([]);
  const [repeatDay, setRepeatDay] = useState("");
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);
  const nextSubtaskInputId = useRef(0);
  const createSubtaskInput = (value = ""): DetailTodoSubtaskInput => ({
    id: nextSubtaskInputId.current++,
    subtaskId: null,
    completed: false,
    value,
  });
  const [subtaskInputs, setSubtaskInputs] = useState<DetailTodoSubtaskInput[]>(
    () =>
      todo.subtasks.length > 0
        ? todo.subtasks.map((subtask) => ({
            id: nextSubtaskInputId.current++,
            subtaskId: subtask.subtaskId,
            completed: subtask.completed,
            value: subtask.content,
          }))
        : [createSubtaskInput()],
  );
  const subtaskInputRefs = useRef<Array<HTMLTextAreaElement | null>>([]);
  const pendingSubtaskFocusIndex = useRef<number | null>(null);
  const [memo, setMemo] = useState("");
  const [icon, setIcon] = useState<TodoIconValue | null>(
    isTodoIconValue(todo.icon) ? todo.icon : null,
  );
  const [isIconPanelOpen, setIsIconPanelOpen] = useState(false);

  useEffect(() => {
    if (pendingSubtaskFocusIndex.current === null) return;

    const index = pendingSubtaskFocusIndex.current;
    pendingSubtaskFocusIndex.current = null;

    const element = subtaskInputRefs.current[index];
    if (!element) return;

    element.focus();
    const caretPosition = element.value.length;
    element.setSelectionRange(caretPosition, caretPosition);
  }, [subtaskInputs.length]);

  const openIconPanel = () => setIsIconPanelOpen(true);
  const toggleIconPanel = () => setIsIconPanelOpen((prev) => !prev);
  const selectIcon = (nextIcon: TodoIconValue) => setIcon(nextIcon);
  const removeIcon = () => setIcon(null);
  const changeTitle = (value: string) => {
    setTitle(truncateToWeightedLength(value, TITLE_MAX_WEIGHTED_LENGTH));
  };

  const registerSubtaskInputRef =
    (index: number) => (element: HTMLTextAreaElement | null) => {
      subtaskInputRefs.current[index] = element;
    };

  const changeSubtaskInput = (id: number, value: string) => {
    setSubtaskInputs((prev) =>
      prev.map((subtask) =>
        subtask.id === id ? { ...subtask, value } : subtask,
      ),
    );
  };

  const changeSubtaskCompleted = (id: number, completed: boolean) => {
    setSubtaskInputs((prev) =>
      prev.map((subtask) =>
        subtask.id === id ? { ...subtask, completed } : subtask,
      ),
    );
  };

  const handleSubtaskInputKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      setSubtaskInputs((prev) => {
        const { entries, focusIndex } = addSubtaskInputOnEnter(
          prev,
          index,
          createSubtaskInput,
          MAX_DETAIL_SUBTASK_COUNT,
        );

        if (focusIndex !== null) pendingSubtaskFocusIndex.current = focusIndex;
        return entries as DetailTodoSubtaskInput[];
      });
      return;
    }

    if (event.key === "Backspace") {
      const { entries, focusIndex } = removeSubtaskInputOnBackspace(
        subtaskInputs,
        index,
      );

      if (focusIndex !== null) {
        event.preventDefault();
        pendingSubtaskFocusIndex.current = focusIndex;
        setSubtaskInputs(entries as DetailTodoSubtaskInput[]);
      }
    }
  };

  const selectTime = (nextTime: TimeSelection) => {
    setSelectedTime(nextTime);

    if (nextTime === "ai") return;

    const option = DETAIL_TODO_TIME_OPTIONS.find(
      (item) => item.minute === nextTime,
    );

    if (!option) return;

    setTime(`${option.value} ${option.unit}`);
  };

  const changeRepeatFrequency = (frequency: RepeatFrequency) => {
    setIsRepeatActive(true);
    setRepeatFrequency(frequency);
  };

  const toggleWeekday = (weekdayId: string) => {
    setSelectedWeekdayIds((prev) =>
      prev.includes(weekdayId)
        ? prev.filter((item) => item !== weekdayId)
        : [...prev, weekdayId],
    );
  };

  return {
    date,
    setDate,
    time,
    setTime,
    selectedTime,
    priority,
    setPriority,
    tagLabel,
    selectedTag,
    setSelectedTag,
    isRepeatActive,
    repeatFrequency,
    selectedWeekdayIds,
    repeatDay,
    setRepeatDay,
    isCompleted,
    setIsCompleted,
    title,
    changeTitle,
    subtaskInputs,
    registerSubtaskInputRef,
    changeSubtaskInput,
    changeSubtaskCompleted,
    handleSubtaskInputKeyDown,
    memo,
    setMemo,
    icon,
    isIconPanelOpen,
    openIconPanel,
    toggleIconPanel,
    selectIcon,
    removeIcon,
    selectTime,
    changeRepeatFrequency,
    toggleWeekday,
  };
};
