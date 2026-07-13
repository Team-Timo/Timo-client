"use client";

import { SettingsProfileContainer } from "@/app/[locale]/(main)/settings/_containers/SettingsProfileContainer";
import { useSettingsTab } from "@/app/[locale]/(main)/settings/_hooks/useSettingsTab";
import { SettingsPolicyContainer } from "@/app/[locale]/(main)/settings/policy/_containers/SettingsPolicyContainer";
import { SettingsPrivacyContainer } from "@/app/[locale]/(main)/settings/privacy/_containers/SettingsPrivacyContainer";
import { SettingsWithdrawalContainer } from "@/app/[locale]/(main)/settings/withdrawal/_containers/SettingsWithdrawalContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";

export const SettingsTabsContainer = () => {
  const tab = useSettingsTab();

  if (tab === "policy") {
    return (
      <AsyncBoundary>
        <SettingsPolicyContainer />
      </AsyncBoundary>
    );
  }
  if (tab === "privacy") {
    return (
      <AsyncBoundary>
        <SettingsPrivacyContainer />
      </AsyncBoundary>
    );
  }
  if (tab === "withdrawal") return <SettingsWithdrawalContainer />;
  return <SettingsProfileContainer />;
};
