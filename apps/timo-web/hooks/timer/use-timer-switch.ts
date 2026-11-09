"use client";

import type { ApiError } from "@/http/api-error";

import { useSwitchTimer } from "@/generated/endpoints/timer/timer";
import { useActiveTimer } from "@/hooks/timer/use-active-timer";
import { useTimerQueryInvalidation } from "@/hooks/timer/use-timer-query-invalidation";
import { useTimeSidebarStore } from "@/stores/time-sidebar/useTimeSidebarStore";

export interface TimerSwitchTodo {
  todoId: number;
  date: string;
}

export interface TimerSwitchHandlers {
  onPreviousCompleted?: (previous: TimerSwitchTodo) => void;
  onError?: (message: string | undefined) => void;
}

/**
 * 실행 중인 타이머를 종료하고 다른 투두의 타이머로 전환합니다.
 * 서버가 이전 투두를 완료 처리하며, 완료 팝업은 띄우지 않습니다.
 */
export const useTimerSwitch = () => {
  const openTimerPanel = useTimeSidebarStore((state) => state.openTimerPanel);
  const { data: activeTimer } = useActiveTimer();
  const { invalidateTimerFinish, invalidateTodoDetail } =
    useTimerQueryInvalidation();
  // 전환 도중 화면이 언마운트돼도 캐시가 갱신되도록 전역 후처리는 mutation 옵션에서 처리합니다.
  const { mutate: switchTimer, isPending: isSwitchPending } =
    useSwitchTimer<ApiError>({
      mutation: {
        onSuccess: (response, variables) => {
          openTimerPanel();
          invalidateTimerFinish(response.data?.stopped.todoId);
          invalidateTodoDetail(variables.data.todoId);
        },
      },
    });

  const handleSwitchTimer = (
    target: TimerSwitchTodo,
    { onPreviousCompleted, onError }: TimerSwitchHandlers = {},
  ) => {
    if (!activeTimer || isSwitchPending) return;

    const previous: TimerSwitchTodo = {
      todoId: activeTimer.todoId,
      date: activeTimer.date,
    };

    switchTimer(
      { timerId: activeTimer.timerId, data: target },
      {
        onSuccess: () => {
          onPreviousCompleted?.(previous);
        },
        onError: (error) => onError?.(error.message),
      },
    );
  };

  return {
    isSwitchPending,
    handleSwitchTimer,
  };
};
