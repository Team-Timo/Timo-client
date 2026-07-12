import { useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";

import type { CreateTodoRequest } from "@/api/todo/todo-schema";
import type { KeyboardEvent } from "react";
import type { Control } from "react-hook-form";

const MAX_SUBTASK_COUNT = 10;

export interface SubtaskInputEntry {
  id: number;
  value: string;
}

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
        const isLastField = index === prev.length - 1;
        const hasValue = Boolean(prev[index]?.value.trim());
        const canAddMore = prev.length < MAX_SUBTASK_COUNT;

        if (!isLastField || !hasValue || !canAddMore) return prev;

        pendingFocusIndex.current = prev.length;
        return [...prev, createEntry()];
      });
      return;
    }

    const isFieldEmpty = subtaskInputs[index]?.value === "";
    const canMergeIntoPrevious = index > 0;

    if (event.key === "Backspace" && isFieldEmpty && canMergeIntoPrevious) {
      event.preventDefault();
      pendingFocusIndex.current = index - 1;
      setSubtaskInputs((prev) => prev.filter((_, i) => i !== index));
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
