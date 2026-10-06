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
  ) => boolean;
  onUpdateMemo: (
    memo: string,
    handlers?: UpdateTodoMemoSubmitHandlers,
  ) => boolean;
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
  const pendingSavesRef = useRef(new Set<Promise<boolean>>());

  const trackSave = useCallback((save: Promise<boolean>) => {
    pendingSavesRef.current.add(save);
    void save.then(() => pendingSavesRef.current.delete(save));
    return save;
  }, []);

  const buildTextUpdateRequest = useCallback(
    (): TodoUpdateRequest =>
      buildDetailTodoTextUpdateRequest({
        title,
        subtasks,
      }),
    [subtasks, title],
  );
  const latestBuildTextUpdateRequestRef = useRef(buildTextUpdateRequest);

  const submitTextUpdate = useCallback((): Promise<boolean> => {
    if (!title.trim()) return Promise.resolve(false);
    if (lastSubmittedTextUpdateSignatureRef.current === textUpdateSignature) {
      return Promise.resolve(true);
    }

    return trackSave(
      new Promise<boolean>((resolve) => {
        const accepted = latestOnUpdateRef.current(
          latestBuildTextUpdateRequestRef.current(),
          {
            onSuccess: () => {
              lastSubmittedTextUpdateSignatureRef.current = textUpdateSignature;
              resolve(true);
            },
            onError: () => resolve(false),
          },
        );
        if (!accepted) resolve(false);
      }),
    );
  }, [textUpdateSignature, title, trackSave]);

  const saveLatestMemo = useCallback(
    ({ force = false }: { force?: boolean } = {}): Promise<boolean> => {
      const memoToSave = latestMemoRef.current;

      if (savingMemoRef.current !== null) {
        // 저장 중이면 완료 후 최신값을 이어서 저장한다. 닫을 때는 후속 저장이 보장되지 않아 바로 보낸다.
        if (!force || savingMemoRef.current === memoToSave) {
          return Promise.resolve(true);
        }
      } else if (lastSavedMemoRef.current === memoToSave) {
        return Promise.resolve(true);
      }

      savingMemoRef.current = memoToSave;
      return trackSave(
        new Promise<boolean>((resolve) => {
          const accepted = latestOnUpdateMemoRef.current(memoToSave, {
            onSuccess: () => {
              lastSavedMemoRef.current = memoToSave;
              savingMemoRef.current = null;
              resolve(true);
              void saveLatestMemo();
            },
            onError: () => {
              savingMemoRef.current = null;
              resolve(false);
            },
          });
          if (!accepted) {
            savingMemoRef.current = null;
            resolve(false);
          }
        }),
      );
    },
    [trackSave],
  );

  const submitPendingUpdates = useCallback(() => {
    void submitTextUpdate();
    void saveLatestMemo({ force: true });
  }, [saveLatestMemo, submitTextUpdate]);

  const flushPendingUpdates = useCallback(async (): Promise<boolean> => {
    latestMemoRef.current = memo;

    const waitForPendingSaves = async () => {
      while (pendingSavesRef.current.size > 0) {
        const results = await Promise.all([...pendingSavesRef.current]);
        if (results.some((saved) => !saved)) return false;
      }
      return true;
    };

    if (!(await waitForPendingSaves())) return false;
    const results = await Promise.all([submitTextUpdate(), saveLatestMemo()]);
    if (results.some((saved) => !saved)) return false;
    return waitForPendingSaves();
  }, [memo, saveLatestMemo, submitTextUpdate]);

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
    flushPendingUpdates,
  };
};
