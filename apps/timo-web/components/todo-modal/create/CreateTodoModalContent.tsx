"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteIcon } from "@repo/timo-design-system/icons";
import { CreateButton, TodoToolbar } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useController, useForm } from "react-hook-form";

import type { CreateTodoRequest } from "@/api/todo/todo-schema";
import type { CreateTodoTag } from "@/hooks/todo-modal/use-create-todo-submit";
import type { PriorityLevel } from "@repo/timo-design-system/ui";

import { createTodoRequestSchema } from "@/api/todo/todo-schema";
import { formatDateToIsoDate } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { OverlayModal } from "@/components/modal/OverlayModal";
import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { TodoIconField } from "@/components/todo-modal/common/TodoIconField";
import { CreateTodoMemoField } from "@/components/todo-modal/create/CreateTodoMemoField";
import { CreateTodoTaskFields } from "@/components/todo-modal/create/CreateTodoTaskFields";
import { useIconField } from "@/hooks/todo-modal/use-icon-field";
import { useRepeatField } from "@/hooks/todo-modal/use-repeat-field";
import { useSubtaskField } from "@/hooks/todo-modal/use-subtask-field";
import { DEFAULT_TAG, useTagField } from "@/hooks/todo-modal/use-tag-field";
import { useTimeField } from "@/hooks/todo-modal/use-time-field";
import { useTitleField } from "@/hooks/todo-modal/use-title-field";

const createDefaultValues = (defaultDate?: Date): CreateTodoRequest => ({
  icon: null,
  title: "",
  subtasks: [],
  date: formatDateToIsoDate(defaultDate ?? new Date()),
  duration: "0:00",
  priority: null,
  tagId: null,
  repeatType: "NONE",
  repeatWeekdays: [],
  repeatDayOfMonth: null,
  memo: null,
});

export interface CreateTodoModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  defaultDate?: Date;
  onSubmit: (data: CreateTodoRequest, tag: CreateTodoTag) => void;
}

export const CreateTodoModalContent = ({
  isOpen,
  onClose,
  onExited,
  defaultDate,
  onSubmit,
}: CreateTodoModalContentProps) => {
  const t = useTranslations("Home");
  const tCommon = useTranslations("Common");
  const tToast = useTranslations("Toast");

  const { control, handleSubmit, reset } = useForm<CreateTodoRequest>({
    resolver: zodResolver(createTodoRequestSchema),
    defaultValues: createDefaultValues(defaultDate),
  });

  const { field: dateField } = useController({ name: "date", control });
  const { field: memoField } = useController({ name: "memo", control });
  const { field: priorityField } = useController({
    name: "priority",
    control,
  });

  const iconField = useIconField({ control });
  const tagField = useTagField({ control });
  const timeField = useTimeField({ control });
  const repeatField = useRepeatField({ control });
  const subtaskField = useSubtaskField({ control });
  const titleField = useTitleField({ control });

  const dateValue = dateField.value
    ? new Date(`${dateField.value}T00:00:00`)
    : undefined;

  const handleFormSubmit = (data: CreateTodoRequest) => {
    const tag = tagField.selectedTagOption ?? DEFAULT_TAG;

    onSubmit(data, { id: data.tagId ?? tag.id, name: tag.name });

    reset(createDefaultValues(defaultDate));
    subtaskField.reset();
    timeField.resetTime();
    onClose();
  };

  return (
    <>
      <OverlayModal
        isOpen={isOpen}
        onClose={onClose}
        onExited={onExited}
        ariaLabel={t("createModal.title")}
        className="w-[490px] items-center gap-2.5 px-6 py-4"
      >
        <div className="flex w-full items-center justify-between">
          <p className="typo-body-sb-12 text-timo-blue-300">
            {t("createModal.title")}
          </p>
          <button
            type="button"
            aria-label={tCommon("close")}
            onClick={onClose}
            className="shrink-0"
          >
            <DeleteIcon />
          </button>
        </div>

        <div className="flex w-full flex-col items-start gap-3.5">
          <div className="flex w-full flex-col items-start gap-2">
            <TodoIconField
              icon={iconField.icon}
              isIconPanelOpen={iconField.isIconPanelOpen}
              addIconLabel={t("createModal.addIcon")}
              onOpenPanel={iconField.openIconPanel}
              onTogglePanel={iconField.toggleIconPanel}
              onSelectIcon={iconField.selectIcon}
              onRemoveIcon={iconField.removeIcon}
            />

            <CreateTodoTaskFields
              titleValue={titleField.title}
              titlePlaceholder={t("createModal.titlePlaceholder")}
              onTitleChange={titleField.handleTitleChange}
              subtaskInputs={subtaskField.subtaskInputs}
              subtaskPlaceholder={t("createModal.subtaskPlaceholder")}
              registerSubtaskInputRef={subtaskField.registerInputRef}
              onSubtaskInputChange={subtaskField.handleInputChange}
              onSubtaskInputKeyDown={subtaskField.handleInputKeyDown}
            />
          </div>

          <CreateTodoMemoField
            value={memoField.value ?? ""}
            placeholder={t("createModal.notePlaceholder")}
            onChange={memoField.onChange}
          />
        </div>

        <div className="flex w-full items-center justify-between">
          <TodoToolbar
            dateLabel={
              dateValue
                ? `${dateValue.getMonth() + 1}.${dateValue.getDate()}`
                : t("createModal.dateLabel")
            }
            date={dateValue}
            onDateChange={(next) =>
              dateField.onChange(formatDateToIsoDate(next))
            }
            timeLabel={timeField.timeDisplay}
            timeOptions={timeField.timeOptions}
            time={timeField.duration}
            onTimeChange={timeField.handleDurationInputChange}
            selectedTime={timeField.selectedTime}
            onSelectTime={timeField.handleSelectTime}
            priority={priorityField.value ?? undefined}
            priorityLabels={{
              VERY_HIGH: tCommon("priority.urgent"),
              HIGH: tCommon("priority.high"),
              MEDIUM: tCommon("priority.medium"),
              LOW: tCommon("priority.low"),
            }}
            onSelectPriority={(level: PriorityLevel) =>
              priorityField.onChange(level)
            }
            tagLabel={tagField.selectedTagLabel ?? t("createModal.tagLabel")}
            tags={tagField.tagLabels}
            selectedTag={tagField.selectedTagLabel}
            addTagLabel={t("createModal.addTag")}
            onSelectTag={tagField.handleSelectTag}
            onAddTagClick={tagField.handleAddTagClick}
            hasMemo={Boolean(memoField.value?.trim())}
            isRepeatActive={repeatField.isRepeatActive}
            repeat={{
              detailHeading: t("createModal.repeatDetailHeading"),
              options: [
                { frequency: "DAILY", label: t("createModal.repeatDaily") },
                { frequency: "WEEKLY", label: t("createModal.repeatWeekly") },
                {
                  frequency: "MONTHLY",
                  label: t("createModal.repeatMonthly"),
                },
              ],
              frequency: repeatField.uiRepeatFrequency,
              onFrequencyChange: repeatField.handleFrequencyChange,
              weekly: {
                weekdays: repeatField.weekdays,
                selectedWeekdayIds: repeatField.repeatWeekdays,
                onWeekdayToggle: repeatField.handleWeekdayToggle,
              },
              monthly: {
                repeatDayLabel: t("createModal.repeatDayUnit"),
                repeatDay: repeatField.repeatDayOfMonth
                  ? String(repeatField.repeatDayOfMonth)
                  : "",
                onRepeatDayChange: repeatField.handleRepeatDayChange,
              },
            }}
          />

          <CreateButton
            label={t("createModal.create")}
            disabled={!titleField.title.trim()}
            onClick={handleSubmit(handleFormSubmit)}
          />
        </div>
      </OverlayModal>

      <AnimatedToast
        isOpen={tagField.isTagLimitToastOpen}
        onClose={tagField.closeTagLimitToast}
        message={
          <p className="mb-0">
            {tToast.rich("tagLimit", {
              blue: (chunks) => (
                <span className="text-timo-blue-300">{chunks}</span>
              ),
            })}
          </p>
        }
      />
    </>
  );
};
