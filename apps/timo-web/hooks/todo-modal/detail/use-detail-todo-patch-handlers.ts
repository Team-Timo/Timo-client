import { useState } from "react";

import type { TodoUpdateRequest } from "@/api/generated/models";
import type { UseDetailTodoFormReturn } from "@/hooks/todo-modal/detail/use-detail-todo-form";
import type { UpdateTodoSubmitHandlers } from "@/hooks/todo-modal/detail/use-update-todo-submit";
import type {
  PriorityLevel,
  RepeatFrequency,
  TimeSelection,
} from "@repo/timo-design-system/ui";

import { formatDateKey } from "@/utils/date/date";
import { isTodoUpdateRepeatWeekday } from "@/utils/todo/detail-todo-update-request";
import {
  convertApiDurationToSeconds,
  convertClockTimeTextToApiDuration,
} from "@/utils/todo/todo-time";

export interface UseDetailTodoPatchHandlersParams {
  form: UseDetailTodoFormReturn;
  onUpdate: (
    data: TodoUpdateRequest,
    handlers?: UpdateTodoSubmitHandlers,
  ) => void;
  onToggleSubtask: (
    subtaskId: number,
    completed: boolean,
    handlers?: UpdateTodoSubmitHandlers,
  ) => void;
}

export const useDetailTodoPatchHandlers = ({
  form,
  onUpdate,
  onToggleSubtask,
}: UseDetailTodoPatchHandlersParams) => {
  const [selectedTime, setSelectedTime] = useState<TimeSelection>();

  const updateTodo = (
    updateData: TodoUpdateRequest,
    handlers?: UpdateTodoSubmitHandlers,
  ) => {
    if ("title" in updateData && !updateData.title?.trim()) return;
    onUpdate(updateData, handlers);
  };

  const handleSelectTime = (nextTime: TimeSelection) => {
    const time = form.selectTime(nextTime);

    const durationSeconds = time ? convertApiDurationToSeconds(time) : 0;

    if (durationSeconds) {
      updateTodo(
        { durationSeconds },
        {
          onSuccess: () => {
            setSelectedTime(nextTime);
            form.setTime(time);
          },
        },
      );
    }
  };

  const handleDateChange = (nextDate: Date) => {
    updateTodo(
      { date: formatDateKey(nextDate) },
      { onSuccess: () => form.setDate(nextDate) },
    );
  };

  const handleTimeChange = (time: string) => {
    const apiDuration = convertClockTimeTextToApiDuration(time);
    const durationSeconds = convertApiDurationToSeconds(apiDuration);

    if (durationSeconds) {
      updateTodo(
        { durationSeconds },
        { onSuccess: () => form.setTime(apiDuration) },
      );
    }
  };

  const handleSelectPriority = (priority: PriorityLevel) => {
    updateTodo({ priority }, { onSuccess: () => form.setPriority(priority) });
  };

  const handleSelectTag = (label: string) => {
    const tagId = form.getTagIdByLabel(label);

    if (tagId !== null) {
      updateTodo({ tagId }, { onSuccess: () => form.setTagId(tagId) });
    }
  };

  const handleRepeatFrequencyChange = (repeatFrequency: RepeatFrequency) => {
    updateTodo(
      { repeatType: repeatFrequency },
      { onSuccess: () => form.changeRepeatFrequency(repeatFrequency) },
    );
  };

  const handleWeekdaysChange = (weekdayIds: string[]) => {
    updateTodo(
      {
        repeatType: "WEEKLY",
        repeatWeekdays: weekdayIds.filter(isTodoUpdateRepeatWeekday),
      },
      {
        onSuccess: () => form.setSelectedWeekdayIds(weekdayIds),
      },
    );
  };

  const handleRepeatDayChange = (repeatDay: string) => {
    const repeatDayOfMonth = Number(repeatDay);

    if (
      Number.isInteger(repeatDayOfMonth) &&
      repeatDayOfMonth >= 1 &&
      repeatDayOfMonth <= 31
    ) {
      updateTodo(
        { repeatType: "MONTHLY", repeatDayOfMonth },
        { onSuccess: () => form.setRepeatDay(repeatDay) },
      );
    }
  };

  const handleSubtaskCompletedChange = (id: number, completed: boolean) => {
    const subtask = form.subtaskInputs.find((item) => item.id === id);
    if (!subtask || subtask.subtaskId === null) return;

    onToggleSubtask(subtask.subtaskId, completed, {
      onSuccess: () => form.setSubtaskCompleted(id, completed),
    });
  };

  return {
    selectedTime,
    updateTodo,
    handleSelectTime,
    handleDateChange,
    handleTimeChange,
    handleSelectPriority,
    handleSelectTag,
    handleRepeatFrequencyChange,
    handleWeekdaysChange,
    handleRepeatDayChange,
    handleSubtaskCompletedChange,
  };
};
