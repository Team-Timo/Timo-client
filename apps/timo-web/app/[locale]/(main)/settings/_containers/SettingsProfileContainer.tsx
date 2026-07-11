"use client";

import { SettingsProfileForm } from "@/app/[locale]/(main)/settings/_components/SettingsProfileForm";
import { useSettingsProfile } from "@/app/[locale]/(main)/settings/_hooks/useSettingsProfile";
import { useSettingsProfileLabels } from "@/app/[locale]/(main)/settings/_hooks/useSettingsProfileLabels";

export const SettingsProfileContainer = () => {
  const { profileState, profileActions } = useSettingsProfile();
  const labels = useSettingsProfileLabels();

  return (
    <div className="px-15 pt-7.5">
      <SettingsProfileForm
        name={profileState.name}
        googleEmail={profileState.googleEmail}
        isCalendarConnected={profileState.isCalendarConnected}
        language={profileState.language}
        tags={profileState.tags}
        isSaveDisabled={profileState.isSaveDisabled}
        labels={labels}
        onConnectCalendar={profileActions.onConnectCalendar}
        onChangeLanguage={profileActions.onChangeLanguage}
        onAddTag={profileActions.onAddTag}
        onRemoveTag={profileActions.onRemoveTag}
        onLogout={profileActions.onLogout}
        onSave={profileActions.onSave}
      />
    </div>
  );
};
