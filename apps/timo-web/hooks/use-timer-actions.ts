"use client";

import type {
  useChangeStatus,
  useCompleteTimer,
  useExtendTimer,
  useStopTimer,
} from "@/api/generated/endpoints/timer/timer";
import type { useChangeTodoStatus } from "@/api/generated/endpoints/todo/todo";
import type { ActiveTimer } from "@/types/timer-type";

type ChangeStatusMutate = ReturnType<typeof useChangeStatus>["mutate"];
type ExtendTimerMutate = ReturnType<typeof useExtendTimer>["mutate"];
type CompleteTimerMutate = ReturnType<typeof useCompleteTimer>["mutate"];
type StopTimerMutate = ReturnType<typeof useStopTimer>["mutate"];
type ChangeTodoStatusMutate = ReturnType<typeof useChangeTodoStatus>["mutate"];

export interface UseTimerActionsOptions {
  timer: ActiveTimer | undefined;
  isRunning: boolean;
  isTimeUp: boolean;
  /** 정지 시 changeTodoStatus에 넘길 날짜 (포커스 페이지는 focusView.date, 사이드바는 오늘 날짜) */
  dateKey: string;
  markOvertimeStart: (timerId: number, baseSeconds: number) => void;
  changeStatus: ChangeStatusMutate;
  extendTimer: ExtendTimerMutate;
  completeTimer: CompleteTimerMutate;
  stopTimer: StopTimerMutate;
  changeTodoStatus: ChangeTodoStatusMutate;
  /** timer가 없을 때 재생을 누른 경우의 동작 (포커스 페이지의 타이머 시작 등) */
  onNoTimer?: () => void;
}

export const useTimerActions = ({
  timer,
  isRunning,
  isTimeUp,
  dateKey,
  markOvertimeStart,
  changeStatus,
  extendTimer,
  completeTimer,
  stopTimer,
  changeTodoStatus,
  onNoTimer,
}: UseTimerActionsOptions) => {
  const handleTogglePlay = () => {
    if (!timer) {
      onNoTimer?.();
      return;
    }

    changeStatus({
      timerId: timer.timerId,
      data: { action: isRunning ? "PAUSE" : "RESUME" },
    });
  };

  const handleExtendTimer = (minutes: number) => {
    if (!timer) return;

    if (isTimeUp) {
      markOvertimeStart(
        timer.timerId,
        timer.plannedSeconds + timer.extendedSeconds,
      );
      changeStatus(
        { timerId: timer.timerId, data: { action: "RESUME" } },
        {
          onSuccess: () => {
            extendTimer({
              timerId: timer.timerId,
              data: { extendMinutes: minutes },
            });
          },
        },
      );
      return;
    }

    extendTimer({ timerId: timer.timerId, data: { extendMinutes: minutes } });
  };

  const handleCompleteTimer = () => {
    if (!timer) return;

    completeTimer({ timerId: timer.timerId });
  };

  const handleStopTimer = () => {
    if (!timer) return;

    stopTimer(
      { timerId: timer.timerId },
      {
        onSuccess: () => {
          changeTodoStatus({
            todoId: timer.todoId,
            data: { isCompleted: true, date: dateKey },
          });
        },
      },
    );
  };

  return {
    handleTogglePlay,
    handleExtendTimer,
    handleCompleteTimer,
    handleStopTimer,
  };
};
