"use client";

import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";
import { useTimeSidebarStore } from "@/stores/time-sidebar/useTimeSidebarStore";

export const TodayHeaderContainer = () => {
  const { isOpen, toggle } = useNavigationSidebar();
  const isTimeSidebarMobileOpen = useTimeSidebarStore(
    (state) => state.isMobileOpen,
  );
  const toggleTimeSidebarMobileOpen = useTimeSidebarStore(
    (state) => state.toggleMobileOpen,
  );

  return (
    <Header
      left={<Header.SidebarButton isOpen={isOpen} onClick={toggle} />}
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
