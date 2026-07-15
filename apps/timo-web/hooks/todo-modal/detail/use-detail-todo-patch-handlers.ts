import { useState } from "react";

import type { TodoUpdateRequest } from "@/api/generated/models";
import type { UseDetailTodoFormReturn } from "@/hooks/todo-modal/detail/use-detail-todo-form";
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
import { convertTimeTextToDurationSeconds } from "@/utils/todo/todo-time";

export interface UseDetailTodoPatchHandlersParams {
  form: UseDetailTodoFormReturn;
  onUpdate: (data: TodoUpdateRequest) => void;
}

export const useDetailTodoPatchHandlers = ({
  form,
  onUpdate,
}: UseDetailTodoPatchHandlersParams) => {
  const [selectedTime, setSelectedTime] = useState<TimeSelection>();

  const updateTodo = (updateData: TodoUpdateRequest) => {
    if ("title" in updateData && !updateData.title?.trim()) return;
    onUpdate(updateData);
  };

  const handleSelectTime = (nextTime: TimeSelection) => {
    setSelectedTime(nextTime);
    const time = form.selectTime(nextTime);

    const durationSeconds = time
      ? convertTimeTextToDurationSeconds(time)
      : undefined;

    if (durationSeconds) updateTodo({ durationSeconds });
  };

  const handleDateChange = (nextDate: Date) => {
    form.setDate(nextDate);
    updateTodo({ date: formatDateKey(nextDate) });
  };

  const handleTimeChange = (time: string) => {
    form.setTime(time);
    const durationSeconds = convertTimeTextToDurationSeconds(time);

    if (durationSeconds) updateTodo({ durationSeconds });
  };

  const handleSelectPriority = (priority: PriorityLevel) => {
    form.setPriority(priority);
    updateTodo({ priority });
  };

  const handleSelectTag = (label: string) => {
    const tagId = form.handleSelectTag(label);

    if (tagId !== null) updateTodo({ tagId });
  };

  const handleRepeatFrequencyChange = (repeatFrequency: RepeatFrequency) => {
    form.changeRepeatFrequency(repeatFrequency);
    updateTodo({ repeatType: repeatFrequency });
  };

  const handleWeekdayToggle = (weekdayId: string) => {
    const selectedWeekdayIds = form.toggleWeekday(weekdayId);
    updateTodo({
      repeatType: "WEEKLY",
      repeatWeekdays: selectedWeekdayIds.filter(isTodoUpdateRepeatWeekday),
    });
  };

  const handleRepeatDayChange = (repeatDay: string) => {
    form.setRepeatDay(repeatDay);
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
    const subtasks = form.changeSubtaskCompleted(id, completed);
    updateTodo({ subtasks: buildDetailTodoSubtasksUpdateRequest(subtasks) });
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
