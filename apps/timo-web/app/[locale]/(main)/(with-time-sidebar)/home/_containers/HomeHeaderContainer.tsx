"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";

export const HomeHeaderContainer = () => {
  const t = useTranslations("Home");
  const basicLabel = t("viewBasic");
  const weekLabel = t("viewWeek");
  const viewOptions = [basicLabel, weekLabel];
  const [isWeekView, setIsWeekView] = useState<boolean>(false);
  const { isOpen, toggle } = useNavigationSidebar();

  const handleChangeView = (value: string) => {
    if (value === basicLabel || value === weekLabel) {
      setIsWeekView(value === weekLabel);
    }
  };

  return (
    <Header
      left={
        <>
          <Header.SidebarButton isOpen={isOpen} onClick={toggle} />
          <Header.TodayButton label={t("today")} />
        </>
      }
      right={
        <Header.ViewDropdown
          items={viewOptions}
          value={isWeekView ? weekLabel : basicLabel}
          onChange={handleChangeView}
        />
      }
    />
  );
};
