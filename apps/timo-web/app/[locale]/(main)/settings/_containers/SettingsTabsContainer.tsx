"use client";

import { SettingsPolicyContainer } from "@/app/[locale]/(main)/settings/_containers/SettingsPolicyContainer";
import { SettingsProfileContainer } from "@/app/[locale]/(main)/settings/_containers/SettingsProfileContainer";
import { SettingsWithdrawalContainer } from "@/app/[locale]/(main)/settings/_containers/SettingsWithdrawalContainer";
import { useSettingsTab } from "@/app/[locale]/(main)/settings/_hooks/useSettingsTab";

export const SettingsTabsContainer = () => {
  const tab = useSettingsTab();

  if (tab === "policy") return <SettingsPolicyContainer />;
  if (tab === "withdrawal") return <SettingsWithdrawalContainer />;
  return <SettingsProfileContainer />;
};
