"use client";

import { useEffect, useState } from "react";

import type { ActiveTimer } from "@/types/timer-type";

const STORAGE_KEY_PREFIX = "timo:overtime-base:";

const readStoredBase = (timerId: number): number | null => {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(`${STORAGE_KEY_PREFIX}${timerId}`);
  if (raw === null) return null;

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
};

export const useTimerOvertime = (timer: ActiveTimer | undefined) => {
  const timerId = timer?.timerId;
  const [overtimeBaseSeconds, setOvertimeBaseSeconds] = useState<number | null>(
    null,
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
