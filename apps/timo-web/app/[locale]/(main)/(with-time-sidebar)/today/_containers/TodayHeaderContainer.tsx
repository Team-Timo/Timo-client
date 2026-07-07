"use client";

import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";

export const TodayHeaderContainer = () => {
  const { isOpen, toggle } = useNavigationSidebar();

  return (
    <Header left={<Header.SidebarButton isOpen={isOpen} onClick={toggle} />} />
  );
};
