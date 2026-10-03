"use client";

import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";
import { useTimeSidebarStore } from "@/stores/time-sidebar/useTimeSidebarStore";

export const TodayHeaderContainer = () => {
  const { isOpen, toggle } = useNavigationSidebar();
  const isTimeSidebarOpen = useTimeSidebarStore((state) => state.isOpen);
  const toggleTimeSidebarOpen = useTimeSidebarStore(
    (state) => state.toggleOpen,
  );

  return (
    <Header
      left={<Header.SidebarButton isOpen={isOpen} onClick={toggle} />}
      right={
        <Header.SidebarButton
          isOpen={isTimeSidebarOpen}
          onClick={toggleTimeSidebarOpen}
          label="시간 패널"
          className="md:hidden"
        />
      }
    />
  );
};
