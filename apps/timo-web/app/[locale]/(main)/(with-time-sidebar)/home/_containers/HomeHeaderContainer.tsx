"use client";

import { useState } from "react";

import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";

const VIEW_OPTIONS = ["목록형", "캘린더형"] as const;

export const HomeHeaderContainer = () => {
  const [view, setView] = useState<string>(VIEW_OPTIONS[0]);
  const { isOpen, toggle } = useNavigationSidebar();

  return (
    <Header
      left={
        <>
          <Header.SidebarButton isOpen={isOpen} onClick={toggle} />
          <Header.TodayButton />
        </>
      }
      right={
        <Header.ViewDropdown
          items={[...VIEW_OPTIONS]}
          value={view}
          onChange={setView}
        />
      }
    />
  );
};
