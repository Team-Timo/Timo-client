"use client";

import { SettingsProfileContainer } from "@/app/[locale]/(main)/settings/_containers/SettingsProfileContainer";
import { useSettingsTab } from "@/app/[locale]/(main)/settings/_hooks/useSettingsTab";
import { SettingsPolicyContainer } from "@/app/[locale]/(main)/settings/policy/_containers/SettingsPolicyContainer";
import { SettingsWithdrawalContainer } from "@/app/[locale]/(main)/settings/withdrawal/_containers/SettingsWithdrawalContainer";

export const SettingsTabsContainer = () => {
  const tab = useSettingsTab();

  if (tab === "policy") return <SettingsPolicyContainer />;
  if (tab === "withdrawal") return <SettingsWithdrawalContainer />;
  return <SettingsProfileContainer />;
};
