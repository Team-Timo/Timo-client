"use client";

import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";
import { useState } from "react";

import { SettingsProfileView } from "@/app/[locale]/(main)/settings/_components/account/SettingsProfileView";
import { useSettingsProfile } from "@/app/[locale]/(main)/settings/_hooks/account/use-settings-profile";
import { useSettingsProfileLabels } from "@/app/[locale]/(main)/settings/_hooks/account/use-settings-profile-labels";
import { CreateTagModalContainer } from "@/components/tag/CreateTagModalContainer";
import { AnimatedToast } from "@/components/toast/AnimatedToast";

export const SettingsProfileContainer = () => {
  const tToast = useTranslations("Toast");

  const { profileState, profileActions } = useSettingsProfile();
  const labels = useSettingsProfileLabels();

  const [isCalendarConnected, setIsCalendarConnected] = useState(
    profileState.calendarConnected,
  );
  const [isTagErrorToastOpen, setIsTagErrorToastOpen] = useState(false);
  const [isLanguageErrorToastOpen, setIsLanguageErrorToastOpen] =
    useState(false);

  const handleConnectCalendar = () => {
    profileActions.onConnectCalendar(isCalendarConnected, {
      onConnect: () => setIsCalendarConnected(true),
      onDisconnect: () => setIsCalendarConnected(false),
    });
  };

  const handleChangeLanguage = (next: typeof profileState.language) => {
    profileActions.onChangeLanguage(next, {
      onError: () => setIsLanguageErrorToastOpen(true),
    });
  };

  const handleAddTag = () => {
    const existingLabels = profileState.tags.map((tag) => tag.label);

    overlay.open(({ isOpen, close, unmount }) => (
      <CreateTagModalContainer
        isOpen={isOpen}
        onClose={close}
        onExited={unmount}
        existingLabels={existingLabels}
        onCreate={(label: string) => {
          profileActions.onCreateTag(label, {
            onSuccess: close,
            onError: () => setIsTagErrorToastOpen(true),
          });
        }}
      />
    ));
  };

  const handleRemoveTag = (tagId: number) => {
    profileActions.onRemoveTag(tagId, {
      onError: () => setIsTagErrorToastOpen(true),
    });
  };

  return (
    <div className="px-15 pt-7.5">
      <SettingsProfileView
        name={profileState.name}
        googleEmail={profileState.googleEmail}
        profileImageUrl={profileState.profileImageUrl}
        isCalendarConnected={isCalendarConnected}
        language={profileState.language}
        tags={profileState.tags}
        labels={labels}
        onConnectCalendar={handleConnectCalendar}
        onChangeLanguage={handleChangeLanguage}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onLogout={profileActions.onLogout}
      />

      <AnimatedToast
        isOpen={isTagErrorToastOpen}
        onClose={() => setIsTagErrorToastOpen(false)}
        message={tToast("tagActionFailed")}
      />

      <AnimatedToast
        isOpen={isLanguageErrorToastOpen}
        onClose={() => setIsLanguageErrorToastOpen(false)}
        message={tToast("languageChangeFailed")}
      />
    </div>
  );
};
