"use client";

import { Header } from "@/components/layout/header/Header";
import { NavigationSidebarToggle } from "@/components/layout/sidebar/navigation/NavigationSidebarToggle";
import { useTimeSidebarStore } from "@/stores/time-sidebar/useTimeSidebarStore";

export const TodayHeaderContainer = () => {
  const isTimeSidebarMobileOpen = useTimeSidebarStore(
    (state) => state.isMobileOpen,
  );
  const toggleTimeSidebarMobileOpen = useTimeSidebarStore(
    (state) => state.toggleMobileOpen,
  );

  return (
    <Header
      left={<NavigationSidebarToggle />}
      right={
        <Header.SidebarButton
          isOpen={isTimeSidebarMobileOpen}
          onClick={toggleTimeSidebarMobileOpen}
          label="시간 패널"
          className="md:hidden"
        />
      }
    />
  );
};
