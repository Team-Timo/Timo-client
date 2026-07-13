"use client";

import { DeleteIcon, TrashOnIcon } from "@repo/timo-design-system/icons";
import { TodoToolbar } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";

import type { Todo } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_types/todo-type";

import { OverlayModal } from "@/components/modal/OverlayModal";
import { TodoIconField } from "@/components/todo-modal/common/TodoIconField";
import { DetailTodoMemoField } from "@/components/todo-modal/detail/DetailTodoMemoField";
import { DetailTodoTaskFields } from "@/components/todo-modal/detail/DetailTodoTaskFields";
import {
  DETAIL_TODO_TIME_OPTIONS,
  DETAIL_TODO_WEEKDAYS,
  formatDetailTodoDateLabel,
  useDetailTodoForm,
} from "@/hooks/todo-modal/use-detail-todo-form";

const DETAIL_TODO_MEMO_MAX_LENGTH = 300;

export interface DetailTodoModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  todo: Todo;
  onTogglePlay: () => void;
  onDelete: () => void;
}

export const DetailTodoModalContent = ({
  isOpen,
  onClose,
  onExited,
  todo,
  onTogglePlay,
  onDelete,
}: DetailTodoModalContentProps) => {
  const t = useTranslations("Home.detailModal");
  const tCreateModal = useTranslations("Home.createModal");
  const tCommon = useTranslations("Common");
  const detailTodoForm = useDetailTodoForm({ todo });
  const handleTogglePlay = () => {
    onTogglePlay();
    onClose();
  };
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <OverlayModal
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      ariaLabel={t("ariaLabel")}
      className="w-124 items-start px-7.5 py-5"
    >
      <div className="flex w-full justify-end">
        <button type="button" aria-label={tCommon("close")} onClick={onClose}>
          <DeleteIcon />
        </button>
      </div>

      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col">
            <p className="typo-headline-b-30 text-timo-black">22</p>
            <p className="typo-body-m-12 text-timo-gray-700">
              {tCommon("weekday.MON")}
            </p>
          </div>

          <TodoIconField
            icon={detailTodoForm.icon}
            isIconPanelOpen={detailTodoForm.isIconPanelOpen}
            addIconLabel={tCreateModal("addIcon")}
            onOpenPanel={detailTodoForm.openIconPanel}
            onTogglePanel={detailTodoForm.toggleIconPanel}
            onSelectIcon={detailTodoForm.selectIcon}
            onRemoveIcon={detailTodoForm.removeIcon}
          />
        </div>

        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col gap-3">
            <div className="bg-timo-gray-500 h-px w-full" />
            <DetailTodoTaskFields
              titleValue={detailTodoForm.title}
              isCompleted={detailTodoForm.isCompleted}
              timerStatus={todo.timerStatus}
              subtaskInputs={detailTodoForm.subtaskInputs}
              onTitleChange={detailTodoForm.changeTitle}
              onToggleCompleted={detailTodoForm.setIsCompleted}
              onTogglePlay={handleTogglePlay}
              onSubtaskInputChange={detailTodoForm.changeSubtaskInput}
              onToggleSubtaskCompleted={detailTodoForm.changeSubtaskCompleted}
              registerSubtaskInputRef={detailTodoForm.registerSubtaskInputRef}
              onSubtaskInputKeyDown={detailTodoForm.handleSubtaskInputKeyDown}
            />
          </div>

          <div className="flex items-center gap-2 py-3">
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
              priorityLabels={{
                VERY_HIGH: tCommon("priority.urgent"),
                HIGH: tCommon("priority.high"),
                MEDIUM: tCommon("priority.medium"),
                LOW: tCommon("priority.low"),
              }}
              onSelectPriority={detailTodoForm.setPriority}
              tagLabel={detailTodoForm.selectedTag}
              tags={[detailTodoForm.tagLabel]}
              selectedTag={detailTodoForm.selectedTag}
              addTagLabel={tCreateModal("addTag")}
              onSelectTag={detailTodoForm.setSelectedTag}
              onAddTagClick={() => {}}
              hasMemo={todo.hasMemo}
              isRepeatActive={detailTodoForm.isRepeatActive}
              repeat={{
                frequencyHeading: t("repeatFrequencyHeading"),
                detailHeading: tCreateModal("repeatDetailHeading"),
                options: [
                  { frequency: "DAILY", label: tCreateModal("repeatDaily") },
                  { frequency: "WEEKLY", label: tCreateModal("repeatWeekly") },
                  {
                    frequency: "MONTHLY",
                    label: tCreateModal("repeatMonthly"),
                  },
                ],
                frequency: detailTodoForm.repeatFrequency,
                onFrequencyChange: detailTodoForm.changeRepeatFrequency,
                weekly: {
                  weekdays: DETAIL_TODO_WEEKDAYS,
                  selectedWeekdayIds: detailTodoForm.selectedWeekdayIds,
                  onWeekdayToggle: detailTodoForm.toggleWeekday,
                },
                monthly: {
                  repeatDayLabel: t("repeatDayLabel"),
                  repeatDay: detailTodoForm.repeatDay,
                  onRepeatDayChange: detailTodoForm.setRepeatDay,
                },
              }}
            />
            <button
              type="button"
              aria-label={t("delete")}
              onClick={handleDelete}
            >
              <TrashOnIcon />
            </button>
          </div>

          <DetailTodoMemoField
            value={detailTodoForm.memo}
            placeholder={tCreateModal("notePlaceholder")}
            onChange={detailTodoForm.setMemo}
            maxLength={DETAIL_TODO_MEMO_MAX_LENGTH}
          />
        </div>
      </div>
    </OverlayModal>
  );
};
