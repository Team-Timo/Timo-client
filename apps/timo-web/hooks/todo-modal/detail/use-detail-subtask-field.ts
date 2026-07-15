import { useEffect, useRef, useState } from "react";

import type { TodoSubtask } from "@/api/common/todo-schema";
import type { SubtaskInputEntry } from "@/utils/todo/subtask-input-list";
import type { KeyboardEvent } from "react";

import {
  addSubtaskInputOnEnter,
  removeSubtaskInputOnBackspace,
} from "@/utils/todo/subtask-input-list";

const MAX_DETAIL_SUBTASK_COUNT = 10;

export interface DetailTodoSubtaskInput extends SubtaskInputEntry {
  subtaskId: number | null;
  completed: boolean;
}

export interface UseDetailSubtaskFieldParams {
  subtasks: TodoSubtask[];
}

export const useDetailSubtaskField = ({
  subtasks,
}: UseDetailSubtaskFieldParams) => {
  const nextInputId = useRef(0);
  const createInput = (value = ""): DetailTodoSubtaskInput => ({
    id: nextInputId.current++,
    subtaskId: null,
    completed: false,
    value,
  });

  const [subtaskInputs, setSubtaskInputs] = useState<DetailTodoSubtaskInput[]>(
    () =>
      subtasks.length > 0
        ? subtasks.map((subtask) => ({
            id: nextInputId.current++,
            subtaskId: subtask.subtaskId,
            completed: subtask.completed,
            value: subtask.content,
          }))
        : [createInput()],
  );
  const inputRefs = useRef<Array<HTMLTextAreaElement | null>>([]);
  const pendingFocusIndex = useRef<number | null>(null);

  useEffect(() => {
    if (pendingFocusIndex.current === null) return;

    const index = pendingFocusIndex.current;
    pendingFocusIndex.current = null;

    const element = inputRefs.current[index];
    if (!element) return;

    element.focus();
    const caretPosition = element.value.length;
    element.setSelectionRange(caretPosition, caretPosition);
  }, [subtaskInputs.length]);

  const registerInputRef =
    (index: number) => (element: HTMLTextAreaElement | null) => {
      inputRefs.current[index] = element;
    };

  const handleInputChange = (id: number, value: string) => {
    setSubtaskInputs((prev) =>
      prev.map((subtask) =>
        subtask.id === id ? { ...subtask, value } : subtask,
      ),
    );
  };

  const handleCompletedChange = (id: number, completed: boolean) => {
    setSubtaskInputs((prev) =>
      prev.map((subtask) =>
        subtask.id === id ? { ...subtask, completed } : subtask,
      ),
    );
  };

  const handleInputKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (event.nativeEvent.isComposing) return;

      event.preventDefault();

      setSubtaskInputs((prev) => {
        const { entries, focusIndex } = addSubtaskInputOnEnter(
          prev,
          index,
          createInput,
          MAX_DETAIL_SUBTASK_COUNT,
        );

        if (focusIndex !== null) pendingFocusIndex.current = focusIndex;
        return entries as DetailTodoSubtaskInput[];
      });
      return;
    }

    if (event.key === "Backspace") {
      const { entries, focusIndex } = removeSubtaskInputOnBackspace(
        subtaskInputs,
        index,
      );

      if (focusIndex !== null) {
        event.preventDefault();
        pendingFocusIndex.current = focusIndex;
        setSubtaskInputs(entries as DetailTodoSubtaskInput[]);
      }
    }
  };

  return {
    subtaskInputs,
    registerInputRef,
    handleInputChange,
    handleCompletedChange,
    handleInputKeyDown,
  };
};
