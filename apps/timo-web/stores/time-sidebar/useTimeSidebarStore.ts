import { create } from "zustand";

export type TimeSidebarTab = "timebox" | "timer";

interface TimeSidebarState {
  isOpen: boolean;
  isMobileOpen: boolean;
  activeTab: TimeSidebarTab;
  toggleOpen: () => void;
  toggleMobileOpen: () => void;
  closeMobileOpen: () => void;
  setActiveTab: (tab: TimeSidebarTab) => void;
  openTimerPanel: () => void;
}

export const useTimeSidebarStore = create<TimeSidebarState>((set) => ({
  isOpen: true,
  isMobileOpen: false,
  activeTab: "timebox",
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleMobileOpen: () =>
    set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  closeMobileOpen: () => set({ isMobileOpen: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  openTimerPanel: () =>
    set({ isOpen: true, isMobileOpen: true, activeTab: "timer" }),
}));
