"use client";

import { useState } from "react";

import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";

const VIEW_OPTIONS = ["기본", "7일"] as const;

type ViewOption = (typeof VIEW_OPTIONS)[number];

const isViewOption = (value: string): value is ViewOption =>
  (VIEW_OPTIONS as readonly string[]).includes(value);

export const HomeHeaderContainer = () => {
  const [view, setView] = useState<ViewOption>(VIEW_OPTIONS[0]);
  const { isOpen, toggle } = useNavigationSidebar();

  const handleChangeView = (value: string) => {
    if (isViewOption(value)) {
      setView(value);
    }
  };

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
          onChange={handleChangeView}
        />
      }
    />
  );
};
