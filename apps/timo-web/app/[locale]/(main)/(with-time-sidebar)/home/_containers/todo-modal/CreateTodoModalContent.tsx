"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteIcon } from "@repo/timo-design-system/icons";
import { CreateButton, TodoToolbar } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useController, useForm, useWatch } from "react-hook-form";

import type { CreateTodoRequest } from "@/api/todo/todo-schema";
import type { PriorityLevel } from "@repo/timo-design-system/ui";

import { createTodoRequestSchema } from "@/api/todo/todo-schema";
import { CreateTodoIconField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/CreateTodoIconField";
import { CreateTodoMemoField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/CreateTodoMemoField";
import { CreateTodoTaskFields } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_components/todo-modal/CreateTodoTaskFields";
import { useIconField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/todo-modal/use-icon-field";
import { useRepeatField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/todo-modal/use-repeat-field";
import {
  DEFAULT_TAG,
  useTagField,
} from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/todo-modal/use-tag-field";
import { useTimeField } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/todo-modal/use-time-field";
import { formatDateToIsoDate } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_utils/date";
import { Modal } from "@/components/modal/Modal";
import { AnimatedToast } from "@/components/toast/AnimatedToast";

export interface CreateTodoTag {
  id: number;
  name: string;
}

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
  const tToast = useTranslations("Toast");

  const [subtaskInput, setSubtaskInput] = useState("");

  const { register, control, handleSubmit, setValue, reset } =
    useForm<CreateTodoRequest>({
      resolver: zodResolver(createTodoRequestSchema),
      defaultValues: createDefaultValues(defaultDate),
    });

  const title = useWatch({ control, name: "title" });
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

  const dateValue = dateField.value
    ? new Date(`${dateField.value}T00:00:00`)
    : undefined;

  const handleSubtaskInputChange = (value: string) => {
    setSubtaskInput(value);
    setValue("subtasks", value.trim() ? [value] : [], {
      shouldValidate: true,
    });
  };

  const handleFormSubmit = (data: CreateTodoRequest) => {
    const tag = tagField.selectedTagOption ?? DEFAULT_TAG;

    onSubmit(data, { id: data.tagId ?? tag.id, name: tag.name });

    reset(createDefaultValues());
    setSubtaskInput("");
    timeField.resetTime();
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onExited={onExited}
        className="w-[490px] items-center gap-2.5 px-6 py-4"
      >
        <div className="flex w-full items-center justify-between">
          <p className="typo-body-sb-12 text-timo-blue-300">
            {t("createModal.title")}
          </p>
          <button
            type="button"
            aria-label={t("createModal.close")}
            onClick={onClose}
            className="shrink-0"
          >
            <DeleteIcon />
          </button>
        </div>

        <div className="flex w-full flex-col items-start gap-3.5">
          <div className="flex w-full flex-col items-start gap-2">
            <CreateTodoIconField
              icon={iconField.icon}
              isIconPanelOpen={iconField.isIconPanelOpen}
              addIconLabel={t("createModal.addIcon")}
              onOpenPanel={iconField.openIconPanel}
              onTogglePanel={iconField.toggleIconPanel}
              onSelectIcon={iconField.selectIcon}
              onRemoveIcon={iconField.removeIcon}
            />

            <CreateTodoTaskFields
              register={register}
              titlePlaceholder={t("createModal.titlePlaceholder")}
              subtaskInput={subtaskInput}
              subtaskPlaceholder={t("createModal.subtaskPlaceholder")}
              onSubtaskInputChange={handleSubtaskInputChange}
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
            onSelectPriority={(level: PriorityLevel) =>
              priorityField.onChange(level)
            }
            tagLabel={tagField.selectedTagLabel ?? t("createModal.tagLabel")}
            tags={tagField.tagLabels}
            selectedTag={tagField.selectedTagLabel}
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
            disabled={!title.trim()}
            onClick={handleSubmit(handleFormSubmit)}
          />
        </div>
      </Modal>

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
