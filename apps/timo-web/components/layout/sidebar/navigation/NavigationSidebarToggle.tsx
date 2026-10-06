"use client";

import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";

export const NavigationSidebarToggle = () => {
  const { isOpen, isMobileOpen, toggle, toggleMobile } = useNavigationSidebar();

  return (
    <>
      <Header.SidebarButton
        isOpen={isOpen}
        onClick={toggle}
        className="hidden md:flex"
      />
      <Header.SidebarButton
        isOpen={isMobileOpen}
        onClick={toggleMobile}
        className="md:hidden"
      />
    </>
  );
};
