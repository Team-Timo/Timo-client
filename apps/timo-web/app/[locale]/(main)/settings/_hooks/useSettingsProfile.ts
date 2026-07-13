"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type {
  SettingsDefaultTagKey,
  SettingsProfile,
  SettingsProfileFormValues,
} from "@/app/[locale]/(main)/settings/_types/profile-type";

import { useSettingsLanguageParam } from "@/app/[locale]/(main)/settings/_hooks/useSettingsLanguageParam";
import { settingsProfileMock } from "@/app/[locale]/(main)/settings/_mocks/profile-mock";
import { useLogoutAction } from "@/app/[locale]/(main)/settings/_queries/use-logout";

const DEFAULT_TAG_KEYS: SettingsDefaultTagKey[] = [
  "assignment",
  "work",
  "exercise",
  "dailyLife",
];

const isDefaultTagKey = (tag: string): tag is SettingsDefaultTagKey =>
  DEFAULT_TAG_KEYS.includes(tag as SettingsDefaultTagKey);

export const useSettingsProfile = () => {
  const tCommon = useTranslations("Common");
  const { language, locale, setLanguage, commitLanguage } =
    useSettingsLanguageParam();
  const { mutate: logoutMutate, isPending: isLoggingOut } = useLogoutAction();

  const [profile, setProfile] = useState<SettingsProfile>(settingsProfileMock);

  const { watch, setValue, handleSubmit, reset, formState } =
    useForm<SettingsProfileFormValues>({
      defaultValues: { tags: profile.tags },
    });
  const tags = watch("tags");

  const tagItems = tags.map((tag) => {
    const isDefault = isDefaultTagKey(tag);

    return {
      id: tag,
      label: isDefault ? tCommon(`tag.${tag}`) : tag,
      isDefault,
    };
  });

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

  const handleAddTag = () => {
    // TODO: 실제 태그 추가 모달로 교체
    const newTag = window.prompt("추가할 태그를 입력해주세요")?.trim();
    if (!newTag || tags.includes(newTag)) return;

    setValue("tags", [...tags, newTag], { shouldDirty: true });
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((existingTag) => existingTag !== tag),
      { shouldDirty: true },
    );
  };

  const handleLogout = () => {
    if (isLoggingOut) return;
    logoutMutate();
  };

  const handleSave = handleSubmit(async (values) => {
    try {
      // TODO: API 연동
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset(values);
      commitLanguage();
    } catch {
      // TODO: 실제 토스트 컴포넌트로 교체
      window.alert("저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  });

  const isLanguageDirty = language !== locale;

  return {
    profileState: {
      name: profile.name,
      googleEmail: profile.googleEmail,
      isCalendarConnected: profile.isCalendarConnected,
      language,
      tags: tagItems,
      isSaveDisabled:
        (!formState.isDirty && !isLanguageDirty) || formState.isSubmitting,
    },
    profileActions: {
      onConnectCalendar: handleConnectCalendar,
      onChangeLanguage: setLanguage,
      onAddTag: handleAddTag,
      onRemoveTag: handleRemoveTag,
      onLogout: handleLogout,
      onSave: handleSave,
    },
  };
};
