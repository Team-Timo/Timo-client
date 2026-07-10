import { create } from "zustand";

export type TimeSidebarTab = "timebox" | "timer";

interface TimeSidebarState {
  isOpen: boolean;
  activeTab: TimeSidebarTab;
  toggleOpen: () => void;
  setActiveTab: (tab: TimeSidebarTab) => void;
  openTimerPanel: () => void;
}

export const useTimeSidebarStore = create<TimeSidebarState>((set) => ({
  isOpen: true,
  activeTab: "timebox",
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  openTimerPanel: () => set({ isOpen: true, activeTab: "timer" }),
}));
