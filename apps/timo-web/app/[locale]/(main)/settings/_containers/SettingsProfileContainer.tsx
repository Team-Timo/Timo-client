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
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleConnectCalendar = () => {
    if (profile.isCalendarConnected) {
      // TODO: 실제 확인 모달로 교체
      const confirmed = window.confirm("구글 캘린더 연동을 해제하시겠습니까?");
      if (!confirmed) return;

      // TODO: API - 연동 토큰 파기
      console.log("구글 캘린더 연동 토큰을 파기합니다.");
      setProfile((prev) => ({ ...prev, isCalendarConnected: false }));
      return;
    }

    // TODO: Google 계정 인증 및 캘린더 접근 권한 동의 팝업 호출
    console.log("Google Calendar 연동 인증 팝업을 호출합니다.");
    setProfile((prev) => ({ ...prev, isCalendarConnected: true }));
  };

  const handleChangeLanguage = (language: SettingsLanguage) => {
    // TODO: next-intl 로케일 전환 연동
    setProfile((prev) => ({ ...prev, language }));
    setIsDirty(true);
  };

  const handleAddTag = () => {
    // TODO: 실제 태그 추가 모달로 교체
    const newTag = window.prompt("추가할 태그를 입력해주세요")?.trim();
    if (!newTag || profile.tags.includes(newTag)) return;

    setProfile((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
    setIsDirty(true);
  };

  const handleRemoveTag = (tag: string) => {
    setProfile((prev) => ({
      ...prev,
      tags: prev.tags.filter((existingTag) => existingTag !== tag),
    }));
    setIsDirty(true);
  };

  const handleLogout = () => {
    // TODO: API
    console.log("로그아웃 API 호출");
  };

  const handleSave = async () => {
    if (!isDirty || isSaving) return;

    setIsSaving(true);

    try {
      // TODO: API 연동
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsDirty(false);
    } catch {
      // TODO: 실제 토스트 컴포넌트로 교체
      window.alert("저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="px-15 pt-7.5">
      <SettingsProfileForm
        name={profile.name}
        googleEmail={profile.googleEmail}
        isCalendarConnected={profile.isCalendarConnected}
        language={profile.language}
        tags={profile.tags}
        isSaveDisabled={!isDirty || isSaving}
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
