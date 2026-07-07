"use client";

import { cn } from "@repo/timo-design-system/utils";
import { useState } from "react";

import {
  TIME_SIDEBAR_COLLAPSED_MARGIN_CLASS_NAME,
  TIME_SIDEBAR_MARGIN_CLASS_NAME,
} from "@/components/layout/sidebar/time/time-sidebar-size";
import { TimeSidebar } from "@/components/layout/sidebar/time/TimeSidebar";

interface WithTimeSidebarContainerProps {
  children: React.ReactNode;
}

export const WithTimeSidebarContainer = ({
  children,
}: WithTimeSidebarContainerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <div
        className={cn(
          "transition-[margin-right] duration-200 ease-in-out",
          isOpen
            ? TIME_SIDEBAR_MARGIN_CLASS_NAME.sm
            : TIME_SIDEBAR_COLLAPSED_MARGIN_CLASS_NAME,
        )}
      >
        {children}
      </div>

      <TimeSidebar
        isOpen={isOpen}
        onToggleCollapse={() => setIsOpen((prev) => !prev)}
      />
    </>
  );
};
