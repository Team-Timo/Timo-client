"use client";

import { useState } from "react";

import type {
  SettingsLanguage,
  SettingsProfile,
} from "@/app/[locale]/(main)/settings/_types/profile-type";

import { SettingsProfileForm } from "@/app/[locale]/(main)/settings/_components/SettingsProfileForm";
import { settingsProfileMock } from "@/app/[locale]/(main)/settings/_mocks/profile-mock";

export const SettingsProfileContainer = () => {
  const [profile, setProfile] = useState<SettingsProfile>(settingsProfileMock);

  const handleConnectCalendar = () => {
    // TODO: API
    setProfile((prev) => ({
      ...prev,
      isCalendarConnected: !prev.isCalendarConnected,
    }));
  };

  const handleChangeLanguage = (language: SettingsLanguage) => {
    // TODO: next-intl 로케일 전환 연동
    setProfile((prev) => ({ ...prev, language }));
  };

  const handleAddTag = () => {
    // TODO: API
  };

  const handleRemoveTag = (tag: string) => {
    // TODO: API
    setProfile((prev) => ({
      ...prev,
      tags: prev.tags.filter((existingTag) => existingTag !== tag),
    }));
  };

  const handleLogout = () => {
    // TODO: API
  };

  const handleSave = () => {
    // TODO: API
  };

  return (
    <div className="px-15 pt-7.5">
      <SettingsProfileForm
        name={profile.name}
        googleEmail={profile.googleEmail}
        isCalendarConnected={profile.isCalendarConnected}
        language={profile.language}
        tags={profile.tags}
        onConnectCalendar={handleConnectCalendar}
        onChangeLanguage={handleChangeLanguage}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onLogout={handleLogout}
        onSave={handleSave}
      />
    </div>
  );
};
