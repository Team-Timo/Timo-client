import { TODO_ICON_VALUES } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";
import type {
  PriorityLevel,
  RepeatFrequency,
  TimeOption,
  TimeSelection,
  TodoIconValue,
} from "@repo/timo-design-system/ui";

import { convertDurationToTimeText } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/todo-time";

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
  const [subtasks, setSubtasks] = useState(todo.subtasks);
  const [memo, setMemo] = useState("");
  const [icon, setIcon] = useState<TodoIconValue | null>(
    isTodoIconValue(todo.icon) ? todo.icon : null,
  );
  const [isIconPanelOpen, setIsIconPanelOpen] = useState(false);

  const openIconPanel = () => setIsIconPanelOpen(true);
  const toggleIconPanel = () => setIsIconPanelOpen((prev) => !prev);
  const selectIcon = (nextIcon: TodoIconValue) => setIcon(nextIcon);
  const removeIcon = () => setIcon(null);

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

  const toggleSubtaskCompleted = (subtaskId: number, completed: boolean) => {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.subtaskId === subtaskId ? { ...subtask, completed } : subtask,
      ),
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
    subtasks,
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
    toggleSubtaskCompleted,
  };
};
