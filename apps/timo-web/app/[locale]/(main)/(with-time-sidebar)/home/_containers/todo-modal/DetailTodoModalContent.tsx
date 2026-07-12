"use client";

import { DeleteIcon } from "@repo/timo-design-system/icons";
import { TodoToolbar } from "@repo/timo-design-system/ui";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { DetailTodoMemoField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/DetailTodoMemoField";
import { DetailTodoTaskFields } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/DetailTodoTaskFields";
import { TodoIconField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/TodoIconField";
import {
  DETAIL_TODO_TIME_OPTIONS,
  DETAIL_TODO_WEEKDAYS,
  formatDetailTodoDateLabel,
  useDetailTodoForm,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/todo-modal/use-detail-todo-form";
import { OverlayModal } from "@/components/modal/OverlayModal";

const DETAIL_TODO_MEMO_MAX_LENGTH = 300;

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
  const detailTodoForm = useDetailTodoForm({ todo });

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
          icon={detailTodoForm.icon}
          isIconPanelOpen={detailTodoForm.isIconPanelOpen}
          addIconLabel="아이콘 추가하기"
          onOpenPanel={detailTodoForm.openIconPanel}
          onTogglePanel={detailTodoForm.toggleIconPanel}
          onSelectIcon={detailTodoForm.selectIcon}
          onRemoveIcon={detailTodoForm.removeIcon}
        />
      </div>

      <div className="bg-timo-gray-500 mt-2 h-px w-full" />
      <DetailTodoTaskFields
        title={todo.title}
        isCompleted={detailTodoForm.isCompleted}
        timerStatus={todo.timerStatus}
        subtasks={detailTodoForm.subtasks}
        onToggleCompleted={detailTodoForm.setIsCompleted}
        onToggleSubtaskCompleted={detailTodoForm.toggleSubtaskCompleted}
      />
      <div className="mt-2 py-3">
        <TodoToolbar
          dateLabel={formatDetailTodoDateLabel(detailTodoForm.date)}
          date={detailTodoForm.date}
          onDateChange={detailTodoForm.setDate}
          timeLabel={detailTodoForm.time}
          timeOptions={DETAIL_TODO_TIME_OPTIONS}
          time={detailTodoForm.time}
          onTimeChange={detailTodoForm.setTime}
          selectedTime={detailTodoForm.selectedTime}
          onSelectTime={detailTodoForm.selectTime}
          priority={detailTodoForm.priority}
          onSelectPriority={detailTodoForm.setPriority}
          tagLabel={detailTodoForm.selectedTag}
          tags={[detailTodoForm.tagLabel]}
          selectedTag={detailTodoForm.selectedTag}
          onSelectTag={detailTodoForm.setSelectedTag}
          onAddTagClick={() => {}}
          hasMemo={todo.hasMemo}
          isRepeatActive={detailTodoForm.isRepeatActive}
          repeat={{
            detailHeading: "세부 설정",
            options: [
              { frequency: "DAILY", label: "매일" },
              { frequency: "WEEKLY", label: "매주" },
              { frequency: "MONTHLY", label: "매월" },
            ],
            frequency: detailTodoForm.repeatFrequency,
            onFrequencyChange: detailTodoForm.changeRepeatFrequency,
            weekly: {
              weekdays: DETAIL_TODO_WEEKDAYS,
              selectedWeekdayIds: detailTodoForm.selectedWeekdayIds,
              onWeekdayToggle: detailTodoForm.toggleWeekday,
            },
            monthly: {
              repeatDayLabel: "일",
              repeatDay: detailTodoForm.repeatDay,
              onRepeatDayChange: detailTodoForm.setRepeatDay,
            },
          }}
        />
      </div>
      <div className="mt-3 w-full">
        <DetailTodoMemoField
          value={detailTodoForm.memo}
          placeholder="메모를 입력해 주세요..."
          onChange={detailTodoForm.setMemo}
          maxLength={DETAIL_TODO_MEMO_MAX_LENGTH}
        />
      </div>
    </OverlayModal>
  );
};
