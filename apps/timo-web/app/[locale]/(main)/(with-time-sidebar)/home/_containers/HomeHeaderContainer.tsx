"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Header } from "@/components/layout/header/Header";

export const HomeHeaderContainer = () => {
  const t = useTranslations("Home");
  const basicLabel = t("viewBasic");
  const weekLabel = t("viewWeek");
  const viewOptions = [basicLabel, weekLabel];
  const [isWeekView, setIsWeekView] = useState<boolean>(false);

  const handleChangeView = (value: string) => {
    if (value === basicLabel || value === weekLabel) {
      setIsWeekView(value === weekLabel);
    }
  };

  return (
    <Header
      left={<Header.TodayButton label={t("today")} />}
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
