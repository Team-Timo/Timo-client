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
import {
  buildDetailTodoSubtasksUpdateRequest,
  isTodoUpdateRepeatWeekday,
} from "@/utils/todo/detail-todo-update-request";
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
}

export const useDetailTodoPatchHandlers = ({
  form,
  onUpdate,
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

  const handleWeekdayToggle = (weekdayId: string) => {
    const selectedWeekdayIds = form.toggleWeekday(weekdayId);
    updateTodo(
      {
        repeatType: "WEEKLY",
        repeatWeekdays: selectedWeekdayIds.filter(isTodoUpdateRepeatWeekday),
      },
      {
        onSuccess: () => form.setSelectedWeekdayIds(selectedWeekdayIds),
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
    const subtasks = form.changeSubtaskCompleted(id, completed);
    updateTodo(
      { subtasks: buildDetailTodoSubtasksUpdateRequest(subtasks) },
      { onSuccess: () => form.setSubtaskCompleted(id, completed) },
    );
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
    handleWeekdayToggle,
    handleRepeatDayChange,
    handleSubtaskCompletedChange,
  };
};
