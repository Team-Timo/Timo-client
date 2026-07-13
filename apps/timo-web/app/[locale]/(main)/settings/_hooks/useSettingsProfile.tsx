"use client";

import { overlay } from "overlay-kit";
import { useState } from "react";

import type { SettingsProfile } from "@/app/[locale]/(main)/settings/_types/profile-type";

import { tagCreateDataSchema } from "@/api/tag/tag-schema";
import { useSettingsLanguageParam } from "@/app/[locale]/(main)/settings/_hooks/useSettingsLanguageParam";
import { settingsProfileMock } from "@/app/[locale]/(main)/settings/_mocks/profile-mock";
import { CreateTagModalContainer } from "@/components/tag/CreateTagModalContainer";
import { useCreateTag } from "@/queries/tag/use-create-tag";
import { useDeleteTag } from "@/queries/tag/use-delete-tag";
import { useTags } from "@/queries/tag/use-tags";

export const useSettingsProfile = () => {
  const { language, locale, setLanguage, commitLanguage } =
    useSettingsLanguageParam();

  const [profile, setProfile] = useState<SettingsProfile>(settingsProfileMock);
  const [isSaving, setIsSaving] = useState(false);
  const [isTagErrorToastOpen, setIsTagErrorToastOpen] = useState(false);

  const tagsQuery = useTags();
  const { mutate: createTag } = useCreateTag();
  const { mutate: deleteTag } = useDeleteTag();

  const tagItems = (tagsQuery.data?.tags ?? []).map((tag) => ({
    id: tag.tagId,
    label: tag.name,
    isDefault: tag.isDefault,
  }));

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
    const existingLabels = tagItems.map((tag) => tag.label);

    overlay.open(({ isOpen, close, unmount }) => (
      <CreateTagModalContainer
        isOpen={isOpen}
        onClose={close}
        onExited={unmount}
        existingLabels={existingLabels}
        onCreate={(label: string) => {
          createTag(
            { name: label },
            {
              onSuccess: (response) => {
                const parsed = tagCreateDataSchema.safeParse(response.data);

                if (!parsed.success) {
                  setIsTagErrorToastOpen(true);
                  return;
                }

                close();
              },
              onError: () => {
                setIsTagErrorToastOpen(true);
              },
            },
          );
        }}
      />
    ));
  };

  const handleRemoveTag = (tagId: number) => {
    deleteTag(tagId, {
      onError: () => {
        setIsTagErrorToastOpen(true);
      },
    });
  };

  const handleLogout = () => {
    // TODO: API - 로그아웃 처리 및 브라우저 저장 데이터 파기
    console.log("로그아웃 API 호출");
    // TODO: 로그인 페이지 라우트 추가 후 이동 연결 (뒤로가기로 재접근 차단 포함)
    console.log("[Login] 페이지로 이동합니다.");
  };

  const isLanguageDirty = language !== locale;

  const handleSave = async () => {
    if (!isLanguageDirty) return;

    setIsSaving(true);
    try {
      // TODO: API 연동
      await new Promise((resolve) => setTimeout(resolve, 1000));
      commitLanguage();
    } catch {
      // TODO: 실제 토스트 컴포넌트로 교체
      window.alert("저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profileState: {
      name: profile.name,
      googleEmail: profile.googleEmail,
      isCalendarConnected: profile.isCalendarConnected,
      language,
      tags: tagItems,
      isSaveDisabled: !isLanguageDirty || isSaving,
    },
    profileActions: {
      onConnectCalendar: handleConnectCalendar,
      onChangeLanguage: setLanguage,
      onAddTag: handleAddTag,
      onRemoveTag: handleRemoveTag,
      onLogout: handleLogout,
      onSave: handleSave,
    },
    isTagErrorToastOpen,
    closeTagErrorToast: () => setIsTagErrorToastOpen(false),
  };
};
