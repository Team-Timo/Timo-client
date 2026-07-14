import { DeleteIcon, TrashOnIcon } from "@repo/timo-design-system/icons";
import { CreateButton, TodoToolbar } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import type {
  TodoDetailResponse,
  TodoUpdateRequest,
} from "@/api/generated/models";
import type { TimeSelection } from "@repo/timo-design-system/ui";

import { OverlayModal } from "@/components/modal/OverlayModal";
import { TodoIconField } from "@/components/todo-modal/common/TodoIconField";
import { DetailTodoMemoField } from "@/components/todo-modal/detail/DetailTodoMemoField";
import { DetailTodoTaskFields } from "@/components/todo-modal/detail/DetailTodoTaskFields";
import {
  DETAIL_TODO_TIME_OPTIONS,
  DETAIL_TODO_WEEKDAY_IDS,
  useDetailTodoForm,
} from "@/hooks/todo-modal/use-detail-todo-form";
import { formatShortDateLabel } from "@/utils/date/date";

const DETAIL_TODO_MEMO_MAX_LENGTH = 300;
type DetailTodoWeekdayId = (typeof DETAIL_TODO_WEEKDAY_IDS)[number];

const isDetailTodoWeekdayId = (
  dayOfWeek: string,
): dayOfWeek is DetailTodoWeekdayId =>
  (DETAIL_TODO_WEEKDAY_IDS as readonly string[]).includes(dayOfWeek);

export interface DetailTodoModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  todo: TodoDetailResponse;
  onTogglePlay: () => void;
  onDelete: () => void;
  onSubmit: (data: TodoUpdateRequest) => void;
}

export const DetailTodoModalContent = ({
  isOpen,
  onClose,
  onExited,
  todo,
  onTogglePlay,
  onDelete,
  onSubmit,
}: DetailTodoModalContentProps) => {
  const t = useTranslations("Home.detailModal");
  const tCreateModal = useTranslations("Home.createModal");
  const tCommon = useTranslations("Common");
  const detailTodoForm = useDetailTodoForm({ todo });
  const [selectedTime, setSelectedTime] = useState<TimeSelection>();
  const [isIconPanelOpen, setIsIconPanelOpen] = useState(false);
  const dateNumber = detailTodoForm.date.getDate();
  const dayOfWeek = isDetailTodoWeekdayId(todo.dayOfWeek)
    ? todo.dayOfWeek
    : "MON";
  const weekdays = DETAIL_TODO_WEEKDAY_IDS.map((weekdayId) => ({
    id: weekdayId,
    label: tCommon(`weekday.${weekdayId}`),
  }));

  const handleTogglePlay = () => {
    onTogglePlay();
    onClose();
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleSelectTime = (nextTime: TimeSelection) => {
    setSelectedTime(nextTime);
    detailTodoForm.selectTime(nextTime);
  };

  const handleSubmit = () => {
    onSubmit(detailTodoForm.buildUpdateRequest());
  };

  return (
    <OverlayModal
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      ariaLabel={t("ariaLabel")}
      className="w-124 items-start px-7.5 py-5"
    >
      <div className="flex w-full justify-between">
        <CreateButton
          label={t("save")}
          disabled={!detailTodoForm.title.trim()}
          onClick={handleSubmit}
        />
        <button type="button" aria-label={tCommon("close")} onClick={onClose}>
          <DeleteIcon />
        </button>
      </div>

      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col">
            <p className="typo-headline-b-30 text-timo-black">{dateNumber}</p>
            <p className="typo-body-m-12 text-timo-gray-700">
              {tCommon(`weekday.${dayOfWeek}`)}
            </p>
          </div>

          <TodoIconField
            icon={detailTodoForm.icon}
            isIconPanelOpen={isIconPanelOpen}
            addIconLabel={tCreateModal("addIcon")}
            onOpenPanel={() => setIsIconPanelOpen(true)}
            onTogglePanel={() => setIsIconPanelOpen((prev) => !prev)}
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
              dateLabel={formatShortDateLabel(detailTodoForm.date)}
              date={detailTodoForm.date}
              onDateChange={detailTodoForm.setDate}
              timeLabel={detailTodoForm.time}
              timeOptions={DETAIL_TODO_TIME_OPTIONS}
              time={detailTodoForm.time}
              onTimeChange={detailTodoForm.setTime}
              selectedTime={selectedTime}
              onSelectTime={handleSelectTime}
              priority={detailTodoForm.priority}
              priorityLabels={{
                VERY_HIGH: tCommon("priority.urgent"),
                HIGH: tCommon("priority.high"),
                MEDIUM: tCommon("priority.medium"),
                LOW: tCommon("priority.low"),
              }}
              onSelectPriority={detailTodoForm.setPriority}
              tagLabel={
                detailTodoForm.selectedTagLabel ?? tCreateModal("tagLabel")
              }
              tags={detailTodoForm.tagLabels}
              selectedTag={detailTodoForm.selectedTagLabel}
              addTagLabel={tCreateModal("addTag")}
              onSelectTag={detailTodoForm.handleSelectTag}
              onAddTagClick={() => {}}
              hasMemo={Boolean(todo.memo?.trim())}
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
                  weekdays,
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
