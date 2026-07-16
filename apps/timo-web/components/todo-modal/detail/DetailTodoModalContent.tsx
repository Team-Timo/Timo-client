"use client";

import timoTimerLogo from "@repo/timo-design-system/assets/images/logo/timo-timer.svg";
import { DeleteIcon, TrashOnIcon } from "@repo/timo-design-system/icons";
import { Modal, TodoToolbar } from "@repo/timo-design-system/ui";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import type {
  TodoDetailResponse,
  TodoDetailResponseTimerStatus,
  TodoUpdateRequest,
} from "@/api/generated/models";
import type { UpdateTodoSubmitHandlers } from "@/hooks/todo-modal/detail/use-update-todo-submit";

import { OverlayModal } from "@/components/modal/OverlayModal";
import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { TodoIconField } from "@/components/todo-modal/common/TodoIconField";
import { DetailTodoMemoField } from "@/components/todo-modal/detail/DetailTodoMemoField";
import { DetailTodoTaskFields } from "@/components/todo-modal/detail/DetailTodoTaskFields";
import {
  DETAIL_TODO_TIME_OPTIONS,
  DETAIL_TODO_WEEKDAY_IDS,
  useDetailTodoForm,
} from "@/hooks/todo-modal/detail/use-detail-todo-form";
import { useDetailTodoIconSubmit } from "@/hooks/todo-modal/detail/use-detail-todo-icon-submit";
import { useDetailTodoPatchHandlers } from "@/hooks/todo-modal/detail/use-detail-todo-patch-handlers";
import { useDetailTodoTextAutoSave } from "@/hooks/todo-modal/detail/use-detail-todo-text-auto-save";
import { formatShortDateLabel } from "@/utils/date/date";
import { convertApiDurationToClockTimeText } from "@/utils/todo/todo-time";

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
  isPlayHighlighted: boolean;
  onTogglePlay: () => void;
  onToggleCompleted: (completed: boolean) => void;
  onDelete: () => void;
  onUpdate: (
    data: TodoUpdateRequest,
    handlers?: UpdateTodoSubmitHandlers,
  ) => void;
  onToggleSubtask: (
    subtaskId: number,
    completed: boolean,
    handlers?: UpdateTodoSubmitHandlers,
  ) => void;
  timerStatus: TodoDetailResponseTimerStatus;
}

export const DetailTodoModalContent = ({
  isOpen,
  onClose,
  onExited,
  todo,
  isPlayHighlighted,
  onTogglePlay,
  onToggleCompleted,
  onDelete,
  onUpdate,
  onToggleSubtask,
  timerStatus,
}: DetailTodoModalContentProps) => {
  const t = useTranslations("Home.detailModal");
  const tCreateModal = useTranslations("Home.createModal");
  const tCommon = useTranslations("Common");
  const tToast = useTranslations("Toast");
  const detailTodoForm = useDetailTodoForm({ todo, onUpdate });
  const dateNumber = detailTodoForm.date.getDate();
  const dayOfWeek = isDetailTodoWeekdayId(todo.dayOfWeek)
    ? todo.dayOfWeek
    : "MON";
  const weekdays = DETAIL_TODO_WEEKDAY_IDS.map((weekdayId) => ({
    id: weekdayId,
    label: tCommon(`weekday.${weekdayId}`),
  }));
  const displayTime = convertApiDurationToClockTimeText(detailTodoForm.time);
  const canUpdateTodo = timerStatus === "STOPPED";
  const patchHandlers = useDetailTodoPatchHandlers({
    form: detailTodoForm,
    onUpdate,
    onToggleSubtask,
  });
  const iconField = useDetailTodoIconSubmit({
    icon: detailTodoForm.icon,
    selectIcon: detailTodoForm.selectIcon,
    removeIcon: detailTodoForm.removeIcon,
    onUpdate: patchHandlers.updateTodo,
  });
  const { submitTextUpdate } = useDetailTodoTextAutoSave({
    isOpen,
    title: detailTodoForm.title,
    memo: detailTodoForm.memo,
    subtasks: detailTodoForm.subtaskInputs,
    onUpdate: patchHandlers.updateTodo,
  });

  const handleClose = () => {
    submitTextUpdate();
    onClose();
  };

  const deleteModalTriggerRef = useRef<HTMLButtonElement>(null);
  const handleRequestDelete = () => {
    deleteModalTriggerRef.current?.click();
  };

  return (
    <>
      <OverlayModal
        isOpen={isOpen}
        onClose={handleClose}
        onExited={onExited}
        ariaLabel={t("ariaLabel")}
        className="w-124 items-start px-7.5 py-5"
      >
        <div className="flex w-full justify-end">
          <button
            type="button"
            aria-label={tCommon("close")}
            onClick={handleClose}
          >
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

            <div className={canUpdateTodo ? undefined : "pointer-events-none"}>
              <TodoIconField
                icon={iconField.icon}
                isIconPanelOpen={iconField.isIconPanelOpen}
                addIconLabel={tCreateModal("addIcon")}
                onOpenPanel={iconField.handleOpenIconPanel}
                onTogglePanel={iconField.handleToggleIconPanel}
                onSelectIcon={iconField.handleSelectIcon}
                onRemoveIcon={iconField.handleRemoveIcon}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full flex-col gap-3">
              <div className="bg-timo-gray-500 h-px w-full" />
              <DetailTodoTaskFields
                titleValue={detailTodoForm.title}
                isCompleted={todo.completed}
                disabled={!canUpdateTodo}
                timerStatus={timerStatus}
                isPlayHighlighted={isPlayHighlighted}
                subtaskInputs={detailTodoForm.subtaskInputs}
                onTitleChange={detailTodoForm.changeTitle}
                onTitleEnter={detailTodoForm.focusFirstSubtaskInput}
                onToggleCompleted={onToggleCompleted}
                onTogglePlay={onTogglePlay}
                onSubtaskInputChange={detailTodoForm.changeSubtaskInput}
                onToggleSubtaskCompleted={
                  patchHandlers.handleSubtaskCompletedChange
                }
                registerSubtaskInputRef={detailTodoForm.registerSubtaskInputRef}
                onSubtaskInputKeyDown={detailTodoForm.handleSubtaskInputKeyDown}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div
                className={
                  canUpdateTodo
                    ? "flex items-center gap-2 py-3"
                    : "pointer-events-none flex items-center gap-2 py-3"
                }
              >
                <TodoToolbar
                  dateLabel={formatShortDateLabel(detailTodoForm.date)}
                  date={detailTodoForm.date}
                  onDateChange={patchHandlers.handleDateChange}
                  timeLabel={displayTime}
                  timeOptions={DETAIL_TODO_TIME_OPTIONS}
                  time={displayTime}
                  onTimeChange={patchHandlers.handleTimeChange}
                  selectedTime={patchHandlers.selectedTime}
                  onSelectTime={patchHandlers.handleSelectTime}
                  priority={detailTodoForm.priority}
                  priorityLabels={{
                    VERY_HIGH: tCommon("priority.VERY_HIGH"),
                    HIGH: tCommon("priority.HIGH"),
                    MEDIUM: tCommon("priority.MEDIUM"),
                    LOW: tCommon("priority.LOW"),
                  }}
                  onSelectPriority={patchHandlers.handleSelectPriority}
                  tagLabel={
                    detailTodoForm.selectedTagLabel ?? tCreateModal("tagLabel")
                  }
                  tags={detailTodoForm.tagLabels}
                  selectedTag={detailTodoForm.selectedTagLabel}
                  addTagLabel={tCreateModal("addTag")}
                  onSelectTag={patchHandlers.handleSelectTag}
                  onAddTagClick={detailTodoForm.handleAddTagClick}
                  hasMemo={Boolean(todo.memo?.trim())}
                  isRepeatActive={detailTodoForm.isRepeatActive}
                  repeat={{
                    frequencyHeading: t("repeatFrequencyHeading"),
                    detailHeading: tCreateModal("repeatDetailHeading"),
                    options: [
                      {
                        frequency: "DAILY",
                        label: tCreateModal("repeatDaily"),
                      },
                      {
                        frequency: "WEEKLY",
                        label: tCreateModal("repeatWeekly"),
                      },
                      {
                        frequency: "MONTHLY",
                        label: tCreateModal("repeatMonthly"),
                      },
                    ],
                    frequency: detailTodoForm.repeatFrequency,
                    onFrequencyChange:
                      patchHandlers.handleRepeatFrequencyChange,
                    weekly: {
                      weekdays,
                      selectedWeekdayIds: detailTodoForm.selectedWeekdayIds,
                      onWeekdaysChange: patchHandlers.handleWeekdaysChange,
                    },
                    monthly: {
                      repeatDayLabel: t("repeatDayLabel"),
                      repeatDay: detailTodoForm.repeatDay,
                      onRepeatDayChange: patchHandlers.handleRepeatDayChange,
                    },
                  }}
                />
                <button
                  type="button"
                  aria-label={t("delete")}
                  onClick={handleRequestDelete}
                >
                  <TrashOnIcon />
                </button>
              </div>

              <DetailTodoMemoField
                value={detailTodoForm.memo}
                placeholder={tCreateModal("notePlaceholder")}
                onChange={detailTodoForm.setMemo}
                maxLength={DETAIL_TODO_MEMO_MAX_LENGTH}
                disabled={!canUpdateTodo}
              />
            </div>
          </div>
        </div>
      </OverlayModal>

      <Modal>
        <Modal.Trigger
          ref={deleteModalTriggerRef}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
        <Modal.Overlay />
        <Modal.Panel>
          <Modal.Icon>
            <Image src={timoTimerLogo} alt="" width={40} height={40} />
          </Modal.Icon>
          <Modal.Title>{t("deleteConfirmTitle")}</Modal.Title>
          <Modal.Description>{t("deleteConfirmDescription")}</Modal.Description>
          <Modal.Footer>
            <Modal.BorderButton>{t("deleteConfirmCancel")}</Modal.BorderButton>
            <Modal.FillButton onClick={onDelete}>
              {t("deleteConfirmConfirm")}
            </Modal.FillButton>
          </Modal.Footer>
        </Modal.Panel>
      </Modal>

      <AnimatedToast
        isOpen={detailTodoForm.isTagLimitToastOpen}
        onClose={detailTodoForm.closeTagLimitToast}
        message={
          <p className="mb-0">
            {tToast.rich("tagLimit", {
              count: 8,
              blue: (chunks) => (
                <span className="text-timo-blue-300">{chunks}</span>
              ),
            })}
          </p>
        }
      />

      <AnimatedToast
        isOpen={detailTodoForm.isCreateTagErrorToastOpen}
        onClose={detailTodoForm.closeCreateTagErrorToast}
        message={tToast("tagCreateFailed")}
      />
    </>
  );
};
