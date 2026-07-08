"use client";

import { cn } from "@repo/timo-design-system/utils";

import {
  TIME_SIDEBAR_COLLAPSED_MARGIN_CLASS_NAME,
  TIME_SIDEBAR_MARGIN_CLASS_NAME,
  type TimeSidebarSize,
} from "@/components/layout/sidebar/time/time-sidebar-size";
import { TimeSidebar } from "@/components/layout/sidebar/time/TimeSidebar";
import { ROUTES } from "@/constants/routes";
import { usePathname } from "@/i18n/navigation";
import { useTimeSidebarStore } from "@/stores/time-sidebar/useTimeSidebarStore";

interface WithTimeSidebarContainerProps {
  children: React.ReactNode;
}

export const WithTimeSidebarContainer = ({
  children,
}: WithTimeSidebarContainerProps) => {
  const isOpen = useTimeSidebarStore((state) => state.isOpen);
  const toggleOpen = useTimeSidebarStore((state) => state.toggleOpen);

  const pathname = usePathname();

  const size: TimeSidebarSize = pathname.startsWith(ROUTES.TODAY) ? "lg" : "sm";

  return (
    <>
      <div
        className={cn(
          "h-full transition-[margin-right] duration-200 ease-in-out",
          isOpen
            ? TIME_SIDEBAR_MARGIN_CLASS_NAME[size]
            : TIME_SIDEBAR_COLLAPSED_MARGIN_CLASS_NAME,
        )}
      >
        {children}
      </div>

      <TimeSidebar size={size} isOpen={isOpen} onToggleCollapse={toggleOpen} />
    </>
  );
};
