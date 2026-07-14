import { DeleteIcon, TrashOnIcon } from "@repo/timo-design-system/icons";
import { TodoToolbar } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  TodoDetailResponse,
  TodoUpdateRequest,
} from "@/api/generated/models";
import type {
  PriorityLevel,
  RepeatFrequency,
  TimeSelection,
  TodoIconValue,
} from "@repo/timo-design-system/ui";

import { OverlayModal } from "@/components/modal/OverlayModal";
import { TodoIconField } from "@/components/todo-modal/common/TodoIconField";
import { DetailTodoMemoField } from "@/components/todo-modal/detail/DetailTodoMemoField";
import { DetailTodoTaskFields } from "@/components/todo-modal/detail/DetailTodoTaskFields";
import {
  DETAIL_TODO_TIME_OPTIONS,
  DETAIL_TODO_WEEKDAY_IDS,
  useDetailTodoForm,
} from "@/hooks/todo-modal/detail/use-detail-todo-form";
import { formatDateKey, formatShortDateLabel } from "@/utils/date/date";
import {
  buildDetailTodoSubtasksUpdateRequest,
  buildDetailTodoTextUpdateRequest,
  isTodoUpdateRepeatWeekday,
} from "@/utils/todo/detail-todo-update-request";
import { convertTimeTextToDurationSeconds } from "@/utils/todo/todo-time";

const DETAIL_TODO_MEMO_MAX_LENGTH = 300;
const TEXT_UPDATE_DEBOUNCE_MS = 2000;
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
  onToggleCompleted: (completed: boolean) => void;
  onDelete: () => void;
  onUpdate: (data: TodoUpdateRequest) => void;
}

export const DetailTodoModalContent = ({
  isOpen,
  onClose,
  onExited,
  todo,
  onTogglePlay,
  onToggleCompleted,
  onDelete,
  onUpdate,
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
  const latestOnUpdateRef = useRef(onUpdate);
  const buildTextUpdateRequest = useCallback(
    (): TodoUpdateRequest =>
      buildDetailTodoTextUpdateRequest({
        title: detailTodoForm.title,
        memo: detailTodoForm.memo,
        subtasks: detailTodoForm.subtaskInputs,
      }),
    [detailTodoForm.memo, detailTodoForm.subtaskInputs, detailTodoForm.title],
  );
  const latestBuildTextUpdateRequestRef = useRef(buildTextUpdateRequest);
  const didStartTextUpdateRef = useRef(false);
  const textUpdateSignature = useMemo(
    () =>
      JSON.stringify({
        title: detailTodoForm.title,
        memo: detailTodoForm.memo,
        subtasks: detailTodoForm.subtaskInputs.map((subtask) => ({
          id: subtask.id,
          subtaskId: subtask.subtaskId,
          value: subtask.value,
        })),
      }),
    [detailTodoForm.memo, detailTodoForm.subtaskInputs, detailTodoForm.title],
  );
  useEffect(() => {
    latestOnUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    latestBuildTextUpdateRequestRef.current = buildTextUpdateRequest;
  }, [buildTextUpdateRequest]);

  useEffect(() => {
    if (!isOpen) return;

    if (!didStartTextUpdateRef.current) {
      didStartTextUpdateRef.current = true;
      return;
    }

    if (!detailTodoForm.title.trim()) return;

    const updateTimer = window.setTimeout(() => {
      latestOnUpdateRef.current(latestBuildTextUpdateRequestRef.current());
    }, TEXT_UPDATE_DEBOUNCE_MS);

    return () => window.clearTimeout(updateTimer);
  }, [detailTodoForm.title, isOpen, textUpdateSignature]);

  const updateTodo = (updateData: TodoUpdateRequest) => {
    if ("title" in updateData && !updateData.title?.trim()) return;
    onUpdate(updateData);
  };

  const handleSelectIcon = (nextIcon: TodoIconValue) => {
    detailTodoForm.selectIcon(nextIcon);
    updateTodo({ icon: nextIcon });
  };

  const handleRemoveIcon = () => {
    detailTodoForm.removeIcon();
  };

  const handleSelectTime = (nextTime: TimeSelection) => {
    setSelectedTime(nextTime);
    const time = detailTodoForm.selectTime(nextTime);

    const durationSeconds = time
      ? convertTimeTextToDurationSeconds(time)
      : undefined;

    if (durationSeconds) updateTodo({ durationSeconds });
  };

  const handleDateChange = (nextDate: Date) => {
    detailTodoForm.setDate(nextDate);
    updateTodo({ date: formatDateKey(nextDate) });
  };

  const handleTimeChange = (time: string) => {
    detailTodoForm.setTime(time);
    const durationSeconds = convertTimeTextToDurationSeconds(time);

    if (durationSeconds) updateTodo({ durationSeconds });
  };

  const handleSelectPriority = (priority: PriorityLevel) => {
    detailTodoForm.setPriority(priority);
    updateTodo({ priority });
  };

  const handleSelectTag = (label: string) => {
    const tagId = detailTodoForm.handleSelectTag(label);

    if (tagId !== null) updateTodo({ tagId });
  };

  const handleRepeatFrequencyChange = (repeatFrequency: RepeatFrequency) => {
    detailTodoForm.changeRepeatFrequency(repeatFrequency);
    updateTodo({ repeatType: repeatFrequency });
  };

  const handleWeekdayToggle = (weekdayId: string) => {
    const selectedWeekdayIds = detailTodoForm.toggleWeekday(weekdayId);
    updateTodo({
      repeatType: "WEEKLY",
      repeatWeekdays: selectedWeekdayIds.filter(isTodoUpdateRepeatWeekday),
    });
  };

  const handleRepeatDayChange = (repeatDay: string) => {
    detailTodoForm.setRepeatDay(repeatDay);
    const repeatDayOfMonth = Number(repeatDay);

    if (
      Number.isInteger(repeatDayOfMonth) &&
      repeatDayOfMonth >= 1 &&
      repeatDayOfMonth <= 31
    ) {
      updateTodo({ repeatType: "MONTHLY", repeatDayOfMonth });
    }
  };

  const handleSubtaskCompletedChange = (id: number, completed: boolean) => {
    const subtasks = detailTodoForm.changeSubtaskCompleted(id, completed);
    updateTodo({ subtasks: buildDetailTodoSubtasksUpdateRequest(subtasks) });
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
            <p className="typo-headline-b-30 text-timo-black">{dateNumber}</p>
            <p className="typo-body-m-12 text-timo-gray-700">
              {tCommon(`weekday.${dayOfWeek}`)}
            </p>
          </div>

          <div>
            <TodoIconField
              icon={detailTodoForm.icon}
              isIconPanelOpen={isIconPanelOpen}
              addIconLabel={tCreateModal("addIcon")}
              onOpenPanel={() => setIsIconPanelOpen(true)}
              onTogglePanel={() => setIsIconPanelOpen((prev) => !prev)}
              onSelectIcon={handleSelectIcon}
              onRemoveIcon={handleRemoveIcon}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-3">
            <div className="bg-timo-gray-500 h-px w-full" />
            <DetailTodoTaskFields
              titleValue={detailTodoForm.title}
              isCompleted={todo.completed}
              timerStatus={todo.timerStatus}
              subtaskInputs={detailTodoForm.subtaskInputs}
              onTitleChange={detailTodoForm.changeTitle}
              onToggleCompleted={onToggleCompleted}
              onTogglePlay={onTogglePlay}
              onSubtaskInputChange={detailTodoForm.changeSubtaskInput}
              onToggleSubtaskCompleted={handleSubtaskCompletedChange}
              registerSubtaskInputRef={detailTodoForm.registerSubtaskInputRef}
              onSubtaskInputKeyDown={detailTodoForm.handleSubtaskInputKeyDown}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 py-3">
              <TodoToolbar
                dateLabel={formatShortDateLabel(detailTodoForm.date)}
                date={detailTodoForm.date}
                onDateChange={handleDateChange}
                timeLabel={detailTodoForm.time}
                timeOptions={DETAIL_TODO_TIME_OPTIONS}
                time={detailTodoForm.time}
                onTimeChange={handleTimeChange}
                selectedTime={selectedTime}
                onSelectTime={handleSelectTime}
                priority={detailTodoForm.priority}
                priorityLabels={{
                  VERY_HIGH: tCommon("priority.urgent"),
                  HIGH: tCommon("priority.high"),
                  MEDIUM: tCommon("priority.medium"),
                  LOW: tCommon("priority.low"),
                }}
                onSelectPriority={handleSelectPriority}
                tagLabel={
                  detailTodoForm.selectedTagLabel ?? tCreateModal("tagLabel")
                }
                tags={detailTodoForm.tagLabels}
                selectedTag={detailTodoForm.selectedTagLabel}
                addTagLabel={tCreateModal("addTag")}
                onSelectTag={handleSelectTag}
                onAddTagClick={() => {}}
                hasMemo={Boolean(todo.memo?.trim())}
                isRepeatActive={detailTodoForm.isRepeatActive}
                repeat={{
                  frequencyHeading: t("repeatFrequencyHeading"),
                  detailHeading: tCreateModal("repeatDetailHeading"),
                  options: [
                    { frequency: "DAILY", label: tCreateModal("repeatDaily") },
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
                  onFrequencyChange: handleRepeatFrequencyChange,
                  weekly: {
                    weekdays,
                    selectedWeekdayIds: detailTodoForm.selectedWeekdayIds,
                    onWeekdayToggle: handleWeekdayToggle,
                  },
                  monthly: {
                    repeatDayLabel: t("repeatDayLabel"),
                    repeatDay: detailTodoForm.repeatDay,
                    onRepeatDayChange: handleRepeatDayChange,
                  },
                }}
              />
              <button type="button" aria-label={t("delete")} onClick={onDelete}>
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
      </div>
    </OverlayModal>
  );
};
