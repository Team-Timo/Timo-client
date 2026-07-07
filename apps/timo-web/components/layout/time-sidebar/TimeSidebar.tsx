"use client";

import { TogglePanel } from "@repo/timo-design-system/ui";
import { useId, useState } from "react";

import { TimeboxPanel } from "@/components/layout/time-sidebar/TimeboxPanel";
import { TimerPanel } from "@/components/layout/time-sidebar/TimerPanel";
import { TimeSidebarHeader } from "@/components/layout/time-sidebar/TimeSidebarHeader";

type TimeSidebarTab = "timebox" | "timer";
type TimeSidebarSize = "sm" | "lg";

const TIME_SIDEBAR_SIZE_WIDTH_CLASS_NAME: Record<TimeSidebarSize, string> = {
  sm: "w-76",
  lg: "w-110",
};

export interface TimeSidebarProps {
  size?: TimeSidebarSize;
}

export const TimeSidebar = ({ size = "sm" }: TimeSidebarProps) => {
  const id = useId();
  const [activeTab, setActiveTab] = useState<TimeSidebarTab>("timebox");

  const timeboxPanelId = `${id}-timebox-panel`;
  const timerPanelId = `${id}-timer-panel`;

  const handleChangeTab = (value: string) => {
    setActiveTab(value as TimeSidebarTab);
  };

  return (
    <aside
      className={`border-timo-gray-500 flex h-screen ${TIME_SIDEBAR_SIZE_WIDTH_CLASS_NAME[size]} flex-col border-l bg-white`}
    >
      <TimeSidebarHeader date={new Date()} />

      <div className="px-4.5">
        <TogglePanel
          id={id}
          value={activeTab}
          onChange={handleChangeTab}
          options={[
            { value: "timebox", label: "Timebox", controls: timeboxPanelId },
            { value: "timer", label: "Timer", controls: timerPanelId },
          ]}
        />
      </div>

      <div
        id={timeboxPanelId}
        role="tabpanel"
        aria-labelledby={`${id}-timebox-tab`}
        hidden={activeTab !== "timebox"}
        className="min-h-0 flex-1 overflow-y-auto px-4.5 pt-3"
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
    </aside>
  );
};
