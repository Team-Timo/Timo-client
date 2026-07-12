"use client";

import { DeleteIcon } from "@repo/timo-design-system/icons";
import { TODO_ICON_VALUES, TodoToolbar } from "@repo/timo-design-system/ui";
import { useState } from "react";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";
import type { TodoIconValue } from "@repo/timo-design-system/ui";

import { DetailTodoMemoField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/DetailTodoMemoField";
import { DetailTodoTaskFields } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/DetailTodoTaskFields";
import { TodoIconField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/TodoIconField";
import { convertDurationToTimeText } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/todo-time";
import { OverlayModal } from "@/components/modal/OverlayModal";

const isTodoIconValue = (icon: string | null): icon is TodoIconValue =>
  icon !== null && (TODO_ICON_VALUES as readonly string[]).includes(icon);

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
  const durationText = convertDurationToTimeText(todo.durationSeconds);
  const [icon, setIcon] = useState<TodoIconValue | null>(
    isTodoIconValue(todo.icon) ? todo.icon : null,
  );
  const [isIconPanelOpen, setIsIconPanelOpen] = useState(false);

  const openIconPanel = () => setIsIconPanelOpen(true);
  const toggleIconPanel = () => setIsIconPanelOpen((prev) => !prev);
  const selectIcon = (nextIcon: TodoIconValue) => setIcon(nextIcon);
  const removeIcon = () => setIcon(null);

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
          dateLabel="26.07.01"
          date={undefined}
          onDateChange={() => {}}
          timeLabel={durationText}
          timeOptions={[]}
          time={durationText}
          onTimeChange={() => {}}
          selectedTime={undefined}
          onSelectTime={() => {}}
          priority={todo.priority}
          onSelectPriority={() => {}}
          tagLabel={todo.tag.name}
          tags={[todo.tag.name]}
          selectedTag={todo.tag.name}
          onSelectTag={() => {}}
          onAddTagClick={() => {}}
          hasMemo={todo.hasMemo}
          isRepeatActive={todo.isRepeated}
          repeat={{
            detailHeading: "세부 설정",
            options: [
              { frequency: "DAILY", label: "매일" },
              { frequency: "WEEKLY", label: "매주" },
              { frequency: "MONTHLY", label: "매월" },
            ],
            frequency: "DAILY",
            onFrequencyChange: () => {},
            weekly: {
              weekdays: [],
              selectedWeekdayIds: [],
              onWeekdayToggle: () => {},
            },
            monthly: {
              repeatDayLabel: "일",
              repeatDay: "",
              onRepeatDayChange: () => {},
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
