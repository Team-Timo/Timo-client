import { create } from "zustand";

import {
  getOvertimeBase,
  setOvertimeBase,
} from "@/utils/timer/overtime-storage";

interface TimerOvertimeState {
  timerId: number | null;
  baseSeconds: number | null;
  markOvertimeStart: (timerId: number, baseSeconds: number) => void;
}

const stored = getOvertimeBase();

export const useTimerOvertimeStore = create<TimerOvertimeState>((set) => ({
  timerId: stored?.timerId ?? null,
  baseSeconds: stored?.baseSeconds ?? null,
  markOvertimeStart: (timerId, baseSeconds) => {
    setOvertimeBase(timerId, baseSeconds);
    set({ timerId, baseSeconds });
  },
}));
