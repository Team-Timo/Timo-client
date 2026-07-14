import { useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";

import type { CreateTodoRequest } from "@/api/common/todo-schema";
import type { SubtaskInputEntry } from "@/utils/todo/subtask-input-list";
import type { KeyboardEvent } from "react";
import type { Control } from "react-hook-form";

import {
  addSubtaskInputOnEnter,
  removeSubtaskInputOnBackspace,
} from "@/utils/todo/subtask-input-list";

const MAX_SUBTASK_COUNT = 10;

export interface UseSubtaskFieldParams {
  control: Control<CreateTodoRequest>;
}

export const useSubtaskField = ({ control }: UseSubtaskFieldParams) => {
  const { field } = useController({ name: "subtasks", control });
  const nextEntryId = useRef(0);
  const createEntry = (value = ""): SubtaskInputEntry => ({
    id: nextEntryId.current++,
    value,
  });

  const [subtaskInputs, setSubtaskInputs] = useState<SubtaskInputEntry[]>(
    () => [createEntry()],
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

  const syncFormValue = (entries: SubtaskInputEntry[]) => {
    field.onChange(entries.map((entry) => entry.value.trim()).filter(Boolean));
  };

  const registerInputRef =
    (index: number) => (element: HTMLTextAreaElement | null) => {
      inputRefs.current[index] = element;
    };

  const handleInputChange = (index: number, value: string) => {
    setSubtaskInputs((prev) => {
      const next = prev.map((entry, i) =>
        i === index ? { ...entry, value } : entry,
      );
      syncFormValue(next);
      return next;
    });
  };

  const handleInputKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      setSubtaskInputs((prev) => {
        const { entries, focusIndex } = addSubtaskInputOnEnter(
          prev,
          index,
          createEntry,
          MAX_SUBTASK_COUNT,
        );

        if (focusIndex !== null) pendingFocusIndex.current = focusIndex;
        return entries;
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
        setSubtaskInputs(entries);
      }
    }
  };

  const reset = () => {
    setSubtaskInputs([createEntry()]);
    inputRefs.current = [];
  };

  return {
    subtaskInputs,
    registerInputRef,
    handleInputChange,
    handleInputKeyDown,
    reset,
  };
};
