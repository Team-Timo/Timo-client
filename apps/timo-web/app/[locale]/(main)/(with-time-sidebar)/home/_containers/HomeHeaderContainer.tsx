"use client";

import { useTranslations } from "next-intl";

import { triggerScrollToToday } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/use-home-today-scroll";
import { useHomeViewMode } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_hooks/use-home-view-mode";
import { Header } from "@/components/layout/header/Header";
import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";

export const HomeHeaderContainer = () => {
  const t = useTranslations("Home");
  const basicLabel = t("viewBasic");
  const weekLabel = t("viewWeek");

  const viewOptions = [basicLabel, weekLabel];

  const { isOpen, toggle } = useNavigationSidebar();
  const { isWeekView, setViewMode, goToNextWeek, goToPrevWeek, goToToday } =
    useHomeViewMode();

  const handleChangeView = (value: string) => {
    if (value === basicLabel) {
      setViewMode("basic");
    } else if (value === weekLabel) {
      setViewMode("week");
    }
  };

  const handleGoToToday = () => {
    goToToday();
    triggerScrollToToday();
  };

  return (
    <Header
      left={
        <>
          <Header.SidebarButton isOpen={isOpen} onClick={toggle} />
          {isWeekView ? (
            <Header.WeeklyNav onPrev={goToPrevWeek} onNext={goToNextWeek} />
          ) : (
            <Header.TodayButton label={t("today")} onClick={handleGoToToday} />
          )}
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
