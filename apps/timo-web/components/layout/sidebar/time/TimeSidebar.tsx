"use client";

import { TogglePanel } from "@repo/timo-design-system/ui";
import { cn, useEscapeKey } from "@repo/timo-design-system/utils";
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

const noop = () => {};

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

  useEscapeKey(isOpen, onToggleCollapse ?? noop);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onToggleCollapse}
        className={cn(
          "bg-timo-overlay fixed inset-0 z-40 transition-opacity duration-200 ease-out motion-reduce:transition-none md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "border-timo-gray-500 fixed inset-y-0 right-0 z-50 flex flex-col overflow-hidden border-l bg-white transition-[width,translate] duration-200 ease-in-out motion-reduce:transition-none",
          // sm 사이즈(TIME_SIDEBAR_WIDTH_CLASS_NAME.sm === w-76)와 같은 폭(304px)을, 화면이 더 좁을 땐 1rem 여백만 남기도록 min()으로 캡핑한다.
          "w-[min(calc(100vw-1rem),calc(var(--spacing)*76))]",
          isOpen ? "translate-x-0" : "translate-x-full",
          "md:top-5 md:bottom-5 md:z-10 md:translate-x-0",
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
    </>
  );
};
