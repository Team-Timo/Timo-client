import { useCallback, useEffect, useMemo, useRef } from "react";

import type { TodoUpdateRequest } from "@/api/generated/models";
import type { DetailTodoSubtaskInput } from "@/hooks/todo-modal/detail/use-detail-subtask-field";

import { buildDetailTodoTextUpdateRequest } from "@/utils/todo/detail-todo-update-request";

const TEXT_UPDATE_DEBOUNCE_MS = 2000;

export interface UseDetailTodoTextAutoSaveParams {
  isOpen: boolean;
  title: string;
  memo: string;
  subtasks: DetailTodoSubtaskInput[];
  onUpdate: (data: TodoUpdateRequest) => void;
}

export const useDetailTodoTextAutoSave = ({
  isOpen,
  title,
  memo,
  subtasks,
  onUpdate,
}: UseDetailTodoTextAutoSaveParams) => {
  const latestOnUpdateRef = useRef(onUpdate);
  const didStartTextUpdateRef = useRef(false);
  const textUpdateSignature = useMemo(
    () =>
      JSON.stringify({
        title,
        memo,
        subtasks: subtasks.map((subtask) => ({
          id: subtask.id,
          subtaskId: subtask.subtaskId,
          value: subtask.value,
        })),
      }),
    [memo, subtasks, title],
  );
  const lastSubmittedTextUpdateSignatureRef = useRef(textUpdateSignature);

  const buildTextUpdateRequest = useCallback(
    (): TodoUpdateRequest =>
      buildDetailTodoTextUpdateRequest({
        title,
        memo,
        subtasks,
      }),
    [memo, subtasks, title],
  );
  const latestBuildTextUpdateRequestRef = useRef(buildTextUpdateRequest);

  const submitTextUpdate = useCallback(() => {
    if (!title.trim()) return;
    if (lastSubmittedTextUpdateSignatureRef.current === textUpdateSignature) {
      return;
    }

    latestOnUpdateRef.current(latestBuildTextUpdateRequestRef.current());
    lastSubmittedTextUpdateSignatureRef.current = textUpdateSignature;
  }, [textUpdateSignature, title]);

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

    const updateTimer = window.setTimeout(
      submitTextUpdate,
      TEXT_UPDATE_DEBOUNCE_MS,
    );

    return () => window.clearTimeout(updateTimer);
  }, [isOpen, submitTextUpdate]);

  return {
    submitTextUpdate,
  };
};
