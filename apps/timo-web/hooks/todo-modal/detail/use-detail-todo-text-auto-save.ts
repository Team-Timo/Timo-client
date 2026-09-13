import { useCallback, useEffect, useMemo, useRef } from "react";

import type { DetailTodoSubtaskInput } from "@/components/todo-modal/detail/DetailTodoTaskFields";
import type { TodoUpdateRequest } from "@/generated/models";
import type { UpdateTodoMemoSubmitHandlers } from "@/hooks/todo-modal/detail/use-update-todo-memo-submit";
import type { UpdateTodoSubmitHandlers } from "@/hooks/todo-modal/detail/use-update-todo-submit";

import { buildDetailTodoTextUpdateRequest } from "@/utils/todo/detail-todo-update-request";

const TEXT_UPDATE_DEBOUNCE_MS = 2000;

export interface UseDetailTodoTextAutoSaveParams {
  isOpen: boolean;
  title: string;
  memo: string;
  subtasks: DetailTodoSubtaskInput[];
  onUpdate: (
    data: TodoUpdateRequest,
    handlers?: UpdateTodoSubmitHandlers,
  ) => void;
  onUpdateMemo: (memo: string, handlers?: UpdateTodoMemoSubmitHandlers) => void;
}

export const useDetailTodoTextAutoSave = ({
  isOpen,
  title,
  memo,
  subtasks,
  onUpdate,
  onUpdateMemo,
}: UseDetailTodoTextAutoSaveParams) => {
  const latestOnUpdateRef = useRef(onUpdate);
  const latestOnUpdateMemoRef = useRef(onUpdateMemo);
  const latestMemoRef = useRef(memo);
  const didStartTextUpdateRef = useRef(false);

  const textUpdateSignature = useMemo(
    () =>
      JSON.stringify({
        title,
        subtasks: subtasks.map((subtask) => ({
          id: subtask.id,
          subtaskId: subtask.subtaskId,
          value: subtask.value,
        })),
      }),
    [subtasks, title],
  );
  const lastSubmittedTextUpdateSignatureRef = useRef(textUpdateSignature);
  const lastSubmittedMemoRef = useRef(memo);

  const buildTextUpdateRequest = useCallback(
    (): TodoUpdateRequest =>
      buildDetailTodoTextUpdateRequest({
        title,
        subtasks,
      }),
    [subtasks, title],
  );
  const latestBuildTextUpdateRequestRef = useRef(buildTextUpdateRequest);

  const submitTextUpdate = useCallback(() => {
    if (!title.trim()) return;
    if (lastSubmittedTextUpdateSignatureRef.current === textUpdateSignature) {
      return;
    }

    latestOnUpdateRef.current(latestBuildTextUpdateRequestRef.current(), {
      onSuccess: () => {
        lastSubmittedTextUpdateSignatureRef.current = textUpdateSignature;
      },
    });
  }, [textUpdateSignature, title]);

  const submitMemoUpdate = useCallback(() => {
    if (lastSubmittedMemoRef.current === memo) return;

    const nextMemo = memo;

    latestOnUpdateMemoRef.current(latestMemoRef.current, {
      onSuccess: () => {
        lastSubmittedMemoRef.current = nextMemo;
      },
    });
  }, [memo]);

  const submitPendingTextAndMemoUpdates = useCallback(() => {
    submitTextUpdate();
    submitMemoUpdate();
  }, [submitMemoUpdate, submitTextUpdate]);

  useEffect(() => {
    latestOnUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    latestOnUpdateMemoRef.current = onUpdateMemo;
  }, [onUpdateMemo]);

  useEffect(() => {
    latestMemoRef.current = memo;
  }, [memo]);

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
      submitPendingTextAndMemoUpdates,
      TEXT_UPDATE_DEBOUNCE_MS,
    );

    return () => window.clearTimeout(updateTimer);
  }, [isOpen, submitPendingTextAndMemoUpdates]);

  return {
    submitTextUpdate: submitPendingTextAndMemoUpdates,
  };
};
