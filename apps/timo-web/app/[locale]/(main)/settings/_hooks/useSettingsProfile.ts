"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type {
  SettingsDefaultTagKey,
  SettingsLanguage,
  SettingsProfileFormValues,
} from "@/app/[locale]/(main)/settings/_types/profile-type";

import { useUpdateLanguage } from "@/api/generated/endpoints/user/user";
import { UpdateLanguageRequestLanguage } from "@/api/generated/models";
import { useSettingsLanguageParam } from "@/app/[locale]/(main)/settings/_hooks/useSettingsLanguageParam";
import { useMyProfile } from "@/queries/use-my-profile";

const LANGUAGE_REQUEST_MAP: Record<
  SettingsLanguage,
  (typeof UpdateLanguageRequestLanguage)[keyof typeof UpdateLanguageRequestLanguage]
> = {
  ko: UpdateLanguageRequestLanguage.KO,
  en: UpdateLanguageRequestLanguage.EN,
};

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

  const { data: profile } = useMyProfile();
  const [isCalendarConnected, setIsCalendarConnected] = useState(
    profile.calendarConnected,
  );
  const { mutateAsync: updateLanguage } = useUpdateLanguage();

  // TODO: 태그 목록 조회 API 연동 후 기본 태그 대신 실제 응답으로 교체
  const { watch, setValue, handleSubmit, reset, formState } =
    useForm<SettingsProfileFormValues>({
      defaultValues: { tags: DEFAULT_TAG_KEYS },
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
    if (isCalendarConnected) {
      // TODO: 실제 확인 모달로 교체
      const confirmed = window.confirm("구글 캘린더 연동을 해제하시겠습니까?");
      if (!confirmed) return;

      // TODO: API - 연동 토큰 파기
      console.log("구글 캘린더 연동 토큰을 파기합니다.");
      setIsCalendarConnected(false);
      return;
    }

    // TODO: Google 계정 인증 및 캘린더 접근 권한 동의 팝업 호출
    console.log("Google Calendar 연동 인증 팝업을 호출합니다.");
    setIsCalendarConnected(true);
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
    // TODO: API - 로그아웃 처리 및 브라우저 저장 데이터 파기
    console.log("로그아웃 API 호출");
    // TODO: 로그인 페이지 라우트 추가 후 이동 연결 (뒤로가기로 재접근 차단 포함)
    console.log("[Login] 페이지로 이동합니다.");
  };

  const isLanguageDirty = language !== locale;

  const handleSave = handleSubmit(async (values) => {
    try {
      if (isLanguageDirty) {
        await updateLanguage({
          data: { language: LANGUAGE_REQUEST_MAP[language] },
        });
      }
      reset(values);
      commitLanguage();
    } catch {
      // TODO: 실제 토스트 컴포넌트로 교체
      window.alert("저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  });

  return {
    profileState: {
      name: profile.name,
      googleEmail: profile.email,
      isCalendarConnected,
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
