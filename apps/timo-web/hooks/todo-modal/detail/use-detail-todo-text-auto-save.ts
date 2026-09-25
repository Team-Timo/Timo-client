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
  const latestMemoRef = useRef(memo);
  const lastSavedMemoRef = useRef(memo);
  const savingMemoRef = useRef<string | null>(null);

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

  const saveLatestMemo = useCallback(
    ({ force = false }: { force?: boolean } = {}) => {
      const memoToSave = latestMemoRef.current;

      if (savingMemoRef.current !== null) {
        // 저장 중이면 완료 후 최신값을 이어서 저장한다. 닫을 때는 후속 저장이 보장되지 않아 바로 보낸다.
        if (!force || savingMemoRef.current === memoToSave) return;
      } else if (lastSavedMemoRef.current === memoToSave) {
        return;
      }

      savingMemoRef.current = memoToSave;
      latestOnUpdateMemoRef.current(memoToSave, {
        onSuccess: () => {
          lastSavedMemoRef.current = memoToSave;
          savingMemoRef.current = null;
          saveLatestMemo();
        },
        onError: () => {
          savingMemoRef.current = null;
        },
      });
    },
    [],
  );

  const submitPendingUpdates = useCallback(() => {
    submitTextUpdate();
    saveLatestMemo({ force: true });
  }, [saveLatestMemo, submitTextUpdate]);

  useEffect(() => {
    latestOnUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    latestOnUpdateMemoRef.current = onUpdateMemo;
  }, [onUpdateMemo]);

  useEffect(() => {
    latestBuildTextUpdateRequestRef.current = buildTextUpdateRequest;
  }, [buildTextUpdateRequest]);

  useEffect(() => {
    latestMemoRef.current = memo;
  }, [memo]);

  useEffect(() => {
    if (!isOpen) return;

    if (!didStartTextUpdateRef.current) {
      didStartTextUpdateRef.current = true;
      return;
    }

    const updateTimer = window.setTimeout(() => {
      submitTextUpdate();
      saveLatestMemo();
    }, TEXT_UPDATE_DEBOUNCE_MS);

    return () => window.clearTimeout(updateTimer);
  }, [isOpen, memo, saveLatestMemo, submitTextUpdate]);

  return {
    submitPendingUpdates,
  };
};
