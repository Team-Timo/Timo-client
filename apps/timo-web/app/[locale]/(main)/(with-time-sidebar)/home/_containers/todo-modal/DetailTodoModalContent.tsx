"use client";

import { DeleteIcon } from "@repo/timo-design-system/icons";
import { TODO_ICON_VALUES, TodoToolbar } from "@repo/timo-design-system/ui";
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

import { DetailTodoMemoField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/DetailTodoMemoField";
import { DetailTodoTaskFields } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/DetailTodoTaskFields";
import { TodoIconField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/TodoIconField";
import { convertDurationToTimeText } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/todo-time";
import { OverlayModal } from "@/components/modal/OverlayModal";

const isTodoIconValue = (icon: string | null): icon is TodoIconValue =>
  icon !== null && (TODO_ICON_VALUES as readonly string[]).includes(icon);

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

const DETAIL_TODO_TIME_OPTIONS: TimeOption[] = [
  { minute: 15, value: "15", unit: "min" },
  { minute: 30, value: "30", unit: "min" },
  { minute: 45, value: "45", unit: "min" },
  { minute: 60, value: "1", unit: "h" },
  { minute: 90, value: "1.5", unit: "h" },
];

const WEEKDAYS = [
  { id: "MON", label: "월" },
  { id: "TUE", label: "화" },
  { id: "WED", label: "수" },
  { id: "THU", label: "목" },
  { id: "FRI", label: "금" },
  { id: "SAT", label: "토" },
  { id: "SUN", label: "일" },
];

const formatDateLabel = (date: Date) =>
  `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

export interface DetailTodoModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  todo: Todo;
}

export const DetailTodoModalContent = ({
  isOpen,
  onClose,
  onExited,
  todo,
}: DetailTodoModalContentProps) => {
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

  return (
    <OverlayModal
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      ariaLabel="투두 상세"
      className="w-124 items-start px-7.5 py-5"
    >
      <div className="flex w-full justify-end">
        <button type="button" aria-label="닫기" onClick={onClose}>
          <DeleteIcon />
        </button>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col">
          <p className="typo-headline-b-30 text-timo-black">22</p>
          <p className="typo-body-m-12 text-timo-gray-700">월요일</p>
        </div>

        <TodoIconField
          icon={icon}
          isIconPanelOpen={isIconPanelOpen}
          addIconLabel="아이콘 추가하기"
          onOpenPanel={openIconPanel}
          onTogglePanel={toggleIconPanel}
          onSelectIcon={selectIcon}
          onRemoveIcon={removeIcon}
        />
      </div>

      <div className="bg-timo-gray-500 mt-2 h-px w-full" />
      <DetailTodoTaskFields todo={todo} />
      <div className="mt-2 py-3">
        <TodoToolbar
          dateLabel={formatDateLabel(date)}
          date={date}
          onDateChange={setDate}
          timeLabel={time}
          timeOptions={DETAIL_TODO_TIME_OPTIONS}
          time={time}
          onTimeChange={setTime}
          selectedTime={selectedTime}
          onSelectTime={selectTime}
          priority={priority}
          onSelectPriority={setPriority}
          tagLabel={selectedTag}
          tags={[tagLabel]}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          onAddTagClick={() => {}}
          hasMemo={todo.hasMemo}
          isRepeatActive={isRepeatActive}
          repeat={{
            detailHeading: "세부 설정",
            options: [
              { frequency: "DAILY", label: "매일" },
              { frequency: "WEEKLY", label: "매주" },
              { frequency: "MONTHLY", label: "매월" },
            ],
            frequency: repeatFrequency,
            onFrequencyChange: changeRepeatFrequency,
            weekly: {
              weekdays: WEEKDAYS,
              selectedWeekdayIds,
              onWeekdayToggle: toggleWeekday,
            },
            monthly: {
              repeatDayLabel: "일",
              repeatDay,
              onRepeatDayChange: setRepeatDay,
            },
          }}
        />
      </div>
      <div className="mt-3 w-full">
        <DetailTodoMemoField
          value={null}
          placeholder="메모를 입력해 주세요..."
        />
      </div>
    </OverlayModal>
  );
};
