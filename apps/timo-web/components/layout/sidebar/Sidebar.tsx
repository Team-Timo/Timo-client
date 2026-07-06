"use client";

import { TogglePanel } from "@repo/timo-design-system/ui";
import { useId, useState } from "react";

import { SidebarHeader } from "@/components/layout/sidebar/SidebarHeader";
import { TimeboxPanel } from "@/components/layout/sidebar/TimeboxPanel";
import { TimerPanel } from "@/components/layout/sidebar/TimerPanel";

type SidebarTab = "timebox" | "timer";
export type SidebarSize = "sm" | "lg";

const SIDEBAR_SIZE_WIDTH_CLASS_NAME: Record<SidebarSize, string> = {
  sm: "w-76",
  lg: "w-110",
};

export interface SidebarProps {
  size?: SidebarSize;
}

export const Sidebar = ({ size = "sm" }: SidebarProps) => {
  const id = useId();
  const [activeTab, setActiveTab] = useState<SidebarTab>("timebox");

  const timeboxPanelId = `${id}-timebox-panel`;
  const timerPanelId = `${id}-timer-panel`;

  const handleChangeTab = (value: string) => {
    setActiveTab(value as SidebarTab);
  };

  return (
    <aside
      className={`border-timo-gray-500 flex h-screen ${SIDEBAR_SIZE_WIDTH_CLASS_NAME[size]} flex-col border-l bg-white`}
    >
      <SidebarHeader date={new Date()} />

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
