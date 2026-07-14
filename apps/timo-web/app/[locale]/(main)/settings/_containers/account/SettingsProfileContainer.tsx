"use client";

import { useTranslations } from "next-intl";

import { SettingsProfileView } from "@/app/[locale]/(main)/settings/_components/account/SettingsProfileView";
import { useSettingsProfile } from "@/app/[locale]/(main)/settings/_hooks/account/useSettingsProfile";
import { useSettingsProfileLabels } from "@/app/[locale]/(main)/settings/_hooks/account/useSettingsProfileLabels";
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
      <SettingsProfileView
        name={profileState.name}
        googleEmail={profileState.googleEmail}
        isCalendarConnected={profileState.isCalendarConnected}
        language={profileState.language}
        tags={profileState.tags}
        labels={labels}
        onConnectCalendar={profileActions.onConnectCalendar}
        onChangeLanguage={profileActions.onChangeLanguage}
        onAddTag={profileActions.onAddTag}
        onRemoveTag={profileActions.onRemoveTag}
        onLogout={profileActions.onLogout}
      />

      <AnimatedToast
        isOpen={isTagErrorToastOpen}
        onClose={closeTagErrorToast}
        message={tToast("tagActionFailed")}
      />
    </div>
  );
};
