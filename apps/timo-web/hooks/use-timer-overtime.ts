"use client";

import { useEffect, useState } from "react";

import type { ActiveTimer } from "@/types/timer-type";

const STORAGE_KEY_PREFIX = "timo:overtime-base:";

const readStoredBase = (timerId: number): number | null => {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(`${STORAGE_KEY_PREFIX}${timerId}`);
  return raw === null ? null : Number(raw);
};

/**
 * 타이머가 시간 소진 후 연장(오버타임)된 지점을 sessionStorage에 타이머별로 저장해,
 * 새로고침·페이지 이동으로 컴포넌트가 리마운트돼도 오버타임 링 상태가 유지되도록 한다.
 */
export const useTimerOvertime = (timer: ActiveTimer | undefined) => {
  const timerId = timer?.timerId;
  const [overtimeBaseSeconds, setOvertimeBaseSeconds] = useState<number | null>(
    () => (timerId ? readStoredBase(timerId) : null),
  );

  useEffect(() => {
    setOvertimeBaseSeconds(timerId ? readStoredBase(timerId) : null);
  }, [timerId]);

  const markOvertimeStart = (timerId: number, baseSeconds: number) => {
    setOvertimeBaseSeconds(baseSeconds);
    window.sessionStorage.setItem(
      `${STORAGE_KEY_PREFIX}${timerId}`,
      String(baseSeconds),
    );
  };

  return { overtimeBaseSeconds, markOvertimeStart };
};
