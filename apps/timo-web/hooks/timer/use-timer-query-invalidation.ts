"use client";

import { useQueryClient } from "@tanstack/react-query";

import { getGetFocusTodoQueryKey } from "@/api/generated/endpoints/focus/focus";
import {
  getGetHomeQueryKey,
  getGetTodayQueryKey,
} from "@/api/generated/endpoints/home/home";
import { getGetTimeBoxesQueryKey } from "@/api/generated/endpoints/time-box/time-box";
import { getGetActiveTimerQueryKey } from "@/api/generated/endpoints/timer/timer";
import { getGetTodoDetailQueryKey } from "@/api/generated/endpoints/todo/todo";
import { useStatisticsQueryInvalidation } from "@/hooks/statistics/use-statistics-query-invalidation";

export const useTimerQueryInvalidation = () => {
  const queryClient = useQueryClient();
  const { invalidateStatistics } = useStatisticsQueryInvalidation();

  const invalidateActiveTimer = () =>
    queryClient.invalidateQueries({ queryKey: getGetActiveTimerQueryKey() });
  const invalidateHomeView = () =>
    queryClient.invalidateQueries({ queryKey: getGetHomeQueryKey() });
  const invalidateTimeBoxes = () =>
    queryClient.invalidateQueries({ queryKey: getGetTimeBoxesQueryKey() });
  const invalidateTodayView = () =>
    queryClient.invalidateQueries({ queryKey: getGetTodayQueryKey() });
  const invalidateFocusTodo = () =>
    queryClient.invalidateQueries({ queryKey: getGetFocusTodoQueryKey() });
  const invalidateTodoDetail = (todoId: number) =>
    queryClient.invalidateQueries({
      queryKey: getGetTodoDetailQueryKey(todoId),
    });

  /**
   * 일시정지/재개/연장처럼 타이머가 계속 진행 중인 액션 이후 무효화
   */
  const invalidateTimerProgress = () => {
    invalidateActiveTimer();
    invalidateHomeView();
    invalidateTimeBoxes();
    invalidateStatistics();
  };

  /**
   * 완료/중지처럼 타이머가 종료되는 액션 이후 무효화
   *
   * @param todoId - 투두 상세 쿼리를 무효화할 투두 ID. 없으면 투두 상세는 건너뜁니다.
   */
  const invalidateTimerFinish = (todoId?: number) => {
    invalidateActiveTimer();
    invalidateHomeView();
    invalidateTimeBoxes();
    invalidateTodayView();
    invalidateStatistics();
    invalidateFocusTodo();
    if (todoId) invalidateTodoDetail(todoId);
  };

  return {
    invalidateActiveTimer,
    invalidateHomeView,
    invalidateStatistics,
    invalidateTimeBoxes,
    invalidateTodayView,
    invalidateFocusTodo,
    invalidateTodoDetail,
    invalidateTimerProgress,
    invalidateTimerFinish,
  };
};
