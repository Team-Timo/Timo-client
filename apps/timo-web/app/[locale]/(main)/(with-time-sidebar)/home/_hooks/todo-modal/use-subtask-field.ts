import { useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";

import type { CreateTodoRequest } from "@/api/todo/todo-schema";
import type { KeyboardEvent } from "react";
import type { Control } from "react-hook-form";

const MAX_SUBTASK_COUNT = 10;

export interface UseSubtaskFieldParams {
  control: Control<CreateTodoRequest>;
}

export const useSubtaskField = ({ control }: UseSubtaskFieldParams) => {
  const { field } = useController({ name: "subtasks", control });
  const [subtaskInputs, setSubtaskInputs] = useState<string[]>([""]);
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

  const syncFormValue = (inputs: string[]) => {
    field.onChange(inputs.map((input) => input.trim()).filter(Boolean));
  };

  const registerInputRef =
    (index: number) => (element: HTMLTextAreaElement | null) => {
      inputRefs.current[index] = element;
    };

  const handleInputChange = (index: number, value: string) => {
    setSubtaskInputs((prev) => {
      const next = prev.map((input, i) => (i === index ? value : input));
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
        const hasValue = Boolean(prev[index]?.trim());
        const canAddMore = prev.length < MAX_SUBTASK_COUNT;

        if (!isLastField || !hasValue || !canAddMore) return prev;

        pendingFocusIndex.current = prev.length;
        return [...prev, ""];
      });
      return;
    }

    const isFieldEmpty = subtaskInputs[index] === "";
    const canMergeIntoPrevious = index > 0;

    if (event.key === "Backspace" && isFieldEmpty && canMergeIntoPrevious) {
      event.preventDefault();
      pendingFocusIndex.current = index - 1;
      setSubtaskInputs((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const reset = () => {
    setSubtaskInputs([""]);
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
