"use client";

import { TogglePanel } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import { useEffect, useId, useRef } from "react";

import {
  TIME_SIDEBAR_COLLAPSED_WIDTH_CLASS_NAME,
  TIME_SIDEBAR_WIDTH_CLASS_NAME,
  type TimeSidebarSize,
} from "@/components/layout/sidebar/time/time-sidebar-size";
import { TimeboxPanel } from "@/components/layout/sidebar/time/TimeboxPanel";
import { TimerPanel } from "@/components/layout/sidebar/time/TimerPanel";
import { TimeSidebarHeader } from "@/components/layout/sidebar/time/TimeSidebarHeader";
import {
  type TimeSidebarTab,
  useTimeSidebarStore,
} from "@/stores/time-sidebar/useTimeSidebarStore";

export interface TimeSidebarProps {
  size?: TimeSidebarSize;
  isOpen?: boolean;
  onToggleCollapse?: () => void;
}

export const TimeSidebar = ({
  size = "sm",
  isOpen = true,
  onToggleCollapse,
}: TimeSidebarProps) => {
  const id = useId();
  const activeTab = useTimeSidebarStore((state) => state.activeTab);
  const setActiveTab = useTimeSidebarStore((state) => state.setActiveTab);

  const timeboxScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || activeTab !== "timebox") return;
    const container = timeboxScrollRef.current;
    if (!container) return;
    const now = new Date();
    const offset = (now.getHours() + now.getMinutes() / 60) * 50;
    container.scrollTo({
      top: Math.max(0, offset - container.clientHeight / 2),
      behavior: "smooth",
    });
  }, [activeTab, isOpen]);

  const timeboxPanelId = `${id}-timebox-panel`;
  const timerPanelId = `${id}-timer-panel`;

  const handleChangeTab = (value: string) => {
    setActiveTab(value as TimeSidebarTab);
  };

  return (
    <aside
      className={cn(
        "border-timo-gray-500 fixed top-5 right-0 bottom-5 z-10 flex flex-col overflow-hidden border-l bg-white transition-[width] duration-200 ease-in-out",
        isOpen
          ? TIME_SIDEBAR_WIDTH_CLASS_NAME[size]
          : TIME_SIDEBAR_COLLAPSED_WIDTH_CLASS_NAME,
      )}
    >
      <TimeSidebarHeader
        date={new Date()}
        isOpen={isOpen}
        onToggleCollapse={onToggleCollapse}
      />

      {isOpen && (
        <>
          <div className="px-4.5">
            <TogglePanel
              id={id}
              value={activeTab}
              onChange={handleChangeTab}
              options={[
                {
                  value: "timebox",
                  label: "Timebox",
                  controls: timeboxPanelId,
                },
                { value: "timer", label: "Timer", controls: timerPanelId },
              ]}
            />
          </div>

          <div
            ref={timeboxScrollRef}
            id={timeboxPanelId}
            role="tabpanel"
            aria-labelledby={`${id}-timebox-tab`}
            hidden={activeTab !== "timebox"}
            className="min-h-0 flex-1 overflow-y-auto px-4.5 pt-[21px]"
          >
            <TimeboxPanel />
          </div>

          <div
            id={timerPanelId}
            role="tabpanel"
            aria-labelledby={`${id}-timer-tab`}
            hidden={activeTab !== "timer"}
            className="flex min-h-0 flex-1 justify-center overflow-y-auto pt-43.25"
          >
            <TimerPanel />
          </div>
        </>
      )}
    </aside>
  );
};
