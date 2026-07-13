"use client";

import { useTranslations } from "next-intl";

import { SettingsProfileForm } from "@/app/[locale]/(main)/settings/_components/SettingsProfileForm";
import { useSettingsProfile } from "@/app/[locale]/(main)/settings/_hooks/useSettingsProfile";
import { useSettingsProfileLabels } from "@/app/[locale]/(main)/settings/_hooks/useSettingsProfileLabels";
import { AnimatedToast } from "@/components/toast/AnimatedToast";

export const SettingsProfileContainer = () => {
  const tToast = useTranslations("Toast");
  const {
    profileState,
    profileActions,
    isTagErrorToastOpen,
    closeTagErrorToast,
  } = useSettingsProfile();
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

      <AnimatedToast
        isOpen={isTagErrorToastOpen}
        onClose={closeTagErrorToast}
        message={tToast("tagActionFailed")}
      />
    </div>
  );
};
