"use client";

import { SettingsProfileContainer } from "@/app/[locale]/(main)/settings/_containers/SettingsProfileContainer";
import { SettingsTermsContainer } from "@/app/[locale]/(main)/settings/_containers/SettingsTermsContainer";
import { useSettingsTab } from "@/app/[locale]/(main)/settings/_hooks/useSettingsTab";
import { SettingsWithdrawalContainer } from "@/app/[locale]/(main)/settings/withdrawal/_containers/SettingsWithdrawalContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";

export const SettingsTabsContainer = () => {
  const tab = useSettingsTab();

  if (tab === "policy" || tab === "privacy") {
    return (
      <AsyncBoundary>
        <SettingsTermsContainer
          type={tab === "policy" ? "SERVICE" : "PRIVACY"}
        />
      </AsyncBoundary>
    );
  }
  if (tab === "withdrawal") return <SettingsWithdrawalContainer />;
  return (
    <AsyncBoundary>
      <SettingsProfileContainer />
    </AsyncBoundary>
  );
};
