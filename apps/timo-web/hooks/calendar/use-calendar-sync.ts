"use client";

import { useQuery } from "@tanstack/react-query";

import { syncCalendarEvents } from "@/generated/endpoints/calendar/calendar";
import { useTodoQueryInvalidation } from "@/hooks/todo/use-todo-query-invalidation";

const CALENDAR_SYNC_STALE_TIME = 60 * 1000;

export interface UseCalendarSyncParams {
  filter: "DEFAULT" | "WEEK";
  baseDate: string;
  enabled: boolean;
}

/**
 * 연동된 캘린더 일정을 투두로 동기화한 뒤 홈·오늘 조회를 다시 불러옵니다.
 * 같은 범위의 중복 호출을 막기 위해 쿼리로 관리합니다.
 */
export const useCalendarSync = ({
  filter,
  baseDate,
  enabled,
}: UseCalendarSyncParams) => {
  const { invalidateHome, invalidateToday } = useTodoQueryInvalidation();

  return useQuery({
    queryKey: ["calendar-sync", { filter, baseDate }],
    queryFn: async ({ signal }) => {
      const response = await syncCalendarEvents(
        { filter, baseDate },
        undefined,
        signal,
      );
      invalidateHome();
      invalidateToday();
      return response.data ?? null;
    },
    enabled,
    staleTime: CALENDAR_SYNC_STALE_TIME,
  });
};
