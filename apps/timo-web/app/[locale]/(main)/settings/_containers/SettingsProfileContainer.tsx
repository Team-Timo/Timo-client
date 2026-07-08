"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import type {
  SettingsDefaultTagKey,
  SettingsLanguage,
  SettingsProfile,
  SettingsProfileLabels,
} from "@/app/[locale]/(main)/settings/_types/profile-type";

import { SettingsProfileForm } from "@/app/[locale]/(main)/settings/_components/SettingsProfileForm";
import { settingsProfileMock } from "@/app/[locale]/(main)/settings/_mocks/profile-mock";
import { usePathname, useRouter } from "@/i18n/navigation";

const DEFAULT_TAG_KEYS: SettingsDefaultTagKey[] = [
  "assignment",
  "work",
  "exercise",
  "dailyLife",
];

const isDefaultTagKey = (tag: string): tag is SettingsDefaultTagKey =>
  DEFAULT_TAG_KEYS.includes(tag as SettingsDefaultTagKey);

export const SettingsProfileContainer = () => {
  const tCommon = useTranslations("Common");
  const tSettings = useTranslations("Settings");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState<SettingsProfile>(settingsProfileMock);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const tagItems = profile.tags.map((tag) => {
    const isDefault = isDefaultTagKey(tag);

    return {
      id: tag,
      label: isDefault ? tCommon(`tag.${tag}`) : tag,
      isDefault,
    };
  });

  const labels: SettingsProfileLabels = {
    title: tSettings("profile.title"),
    profileSection: tSettings("profile.profileSection"),
    calendarSection: tSettings("profile.calendarSection"),
    connect: tSettings("profile.connect"),
    disconnect: tSettings("profile.disconnect"),
    languageSection: tSettings("profile.languageSection"),
    languageKorean: tSettings("profile.languageKorean"),
    languageEnglish: tSettings("profile.languageEnglish"),
    tagsSection: tSettings("profile.tagsSection"),
    addTag: tSettings("profile.addTag"),
    logout: tSettings("profile.logout"),
    save: tSettings("profile.save"),
    removeTag: (tag: string) => tSettings("profile.removeTag", { tag }),
  };

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
    router.replace(pathname, { locale: language });
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
        language={locale}
        tags={tagItems}
        isSaveDisabled={!isDirty || isSaving}
        labels={labels}
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
