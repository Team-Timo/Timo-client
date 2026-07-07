"use client";

import { useState } from "react";

import { TimeSidebar } from "@/components/layout/sidebar/time/TimeSidebar";

interface WithTimeSidebarContainerProps {
  children: React.ReactNode;
}

const CONTENT_MARGIN_CLASS_NAME = {
  open: "mr-76",
  collapsed: "mr-18",
} as const;

export const WithTimeSidebarContainer = ({
  children,
}: WithTimeSidebarContainerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <div
        className={`h-full overflow-y-auto transition-[margin-right] duration-200 ease-in-out ${
          isOpen
            ? CONTENT_MARGIN_CLASS_NAME.open
            : CONTENT_MARGIN_CLASS_NAME.collapsed
        }`}
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
