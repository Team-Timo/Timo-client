"use client";

import { useTranslations } from "next-intl";
import { overlay } from "overlay-kit";
import { useState } from "react";

import { TagLimitToastContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/toast/TagLimitToastContainer";
import { SettingsCalendarDisconnectModal } from "@/app/[locale]/(main)/settings/_components/account/SettingsCalendarDisconnectModal";
import { SettingsProfileView } from "@/app/[locale]/(main)/settings/_components/account/SettingsProfileView";
import { useSettingsProfile } from "@/app/[locale]/(main)/settings/_hooks/account/use-settings-profile";
import { useSettingsProfileLabels } from "@/app/[locale]/(main)/settings/_hooks/account/use-settings-profile-labels";
import { CreateTagModalContainer } from "@/components/tag/CreateTagModalContainer";
import { AnimatedToast } from "@/components/toast/AnimatedToast";
import { MAX_CUSTOM_TAG_COUNT } from "@/schemas/tag/tag-schema";

export const SettingsProfileContainer = () => {
  const tToast = useTranslations("Toast");

  const { profileState, profileActions } = useSettingsProfile();
  const labels = useSettingsProfileLabels();

  const [isCalendarConnected, setIsCalendarConnected] = useState(
    profileState.calendarConnected,
  );
  const [isCalendarConnectErrorToastOpen, setIsCalendarConnectErrorToastOpen] =
    useState(false);
  const [
    isCalendarDisconnectErrorToastOpen,
    setIsCalendarDisconnectErrorToastOpen,
  ] = useState(false);
  const [isTagErrorToastOpen, setIsTagErrorToastOpen] = useState(false);
  const [isTagLimitToastOpen, setIsTagLimitToastOpen] = useState(false);
  const [isLanguageErrorToastOpen, setIsLanguageErrorToastOpen] =
    useState(false);

  const handleConnectCalendar = () => {
    if (isCalendarConnected) {
      overlay.open(({ isOpen, close, unmount }) => (
        <SettingsCalendarDisconnectModal
          isOpen={isOpen}
          onClose={close}
          onExited={unmount}
          labels={labels}
          onDisconnect={() =>
            profileActions.onConnectCalendar(true, {
              onConnect: () => setIsCalendarConnected(true),
              onDisconnect: () => setIsCalendarConnected(false),
              onDisconnectError: () =>
                setIsCalendarDisconnectErrorToastOpen(true),
            })
          }
        />
      ));
      return;
    }

    profileActions.onConnectCalendar(false, {
      onConnect: () => setIsCalendarConnected(true),
      onDisconnect: () => setIsCalendarConnected(false),
      onConnectError: () => setIsCalendarConnectErrorToastOpen(true),
      onDisconnectError: () => setIsCalendarDisconnectErrorToastOpen(true),
    });
  };

  const handleChangeLanguage = (next: typeof profileState.language) => {
    profileActions.onChangeLanguage(next, {
      onError: () => setIsLanguageErrorToastOpen(true),
    });
  };

  const handleAddTag = () => {
    const customTagCount = profileState.tags.filter(
      (tag) => !tag.isDefault,
    ).length;

    if (customTagCount >= MAX_CUSTOM_TAG_COUNT) {
      setIsTagLimitToastOpen(true);
      return;
    }

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

      {isTagLimitToastOpen && (
        <TagLimitToastContainer onClose={() => setIsTagLimitToastOpen(false)} />
      )}

      <AnimatedToast
        isOpen={isCalendarConnectErrorToastOpen}
        onClose={() => setIsCalendarConnectErrorToastOpen(false)}
        message={tToast("calendarConnectFailed")}
      />

      <AnimatedToast
        isOpen={isCalendarDisconnectErrorToastOpen}
        onClose={() => setIsCalendarDisconnectErrorToastOpen(false)}
        message={tToast("calendarDisconnectFailed")}
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
