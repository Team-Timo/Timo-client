"use client";

import { useQueryClient } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import { useState } from "react";

import type { BaseResponseUserProfileResponse } from "@/api/generated/models";
import type { SettingsLanguage } from "@/app/[locale]/(main)/settings/_types/profile-type";

import {
  getGetMyProfileQueryKey,
  useUpdateLanguage,
} from "@/api/generated/endpoints/user/user";
import { UpdateLanguageRequestLanguage } from "@/api/generated/models";
import { tagCreateDataSchema } from "@/api/tag/tag-schema";
import { useSettingsLanguageParam } from "@/app/[locale]/(main)/settings/_hooks/useSettingsLanguageParam";
import { CreateTagModalContainer } from "@/components/tag/CreateTagModalContainer";
import { useCreateTag } from "@/queries/tag/use-create-tag";
import { useDeleteTag } from "@/queries/tag/use-delete-tag";
import { useTags } from "@/queries/tag/use-tags";
import { useMyProfile } from "@/queries/use-my-profile";

const LANGUAGE_REQUEST_MAP: Record<
  SettingsLanguage,
  (typeof UpdateLanguageRequestLanguage)[keyof typeof UpdateLanguageRequestLanguage]
> = {
  ko: UpdateLanguageRequestLanguage.KO,
  en: UpdateLanguageRequestLanguage.EN,
};

export const useSettingsProfile = () => {
  const { language, locale, setLanguage, commitLanguage } =
    useSettingsLanguageParam();

  const { data: profile } = useMyProfile();
  const [isCalendarConnected, setIsCalendarConnected] = useState(
    profile.calendarConnected,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isTagErrorToastOpen, setIsTagErrorToastOpen] = useState(false);

  const { mutateAsync: updateLanguage } = useUpdateLanguage();
  const queryClient = useQueryClient();

  const tagsQuery = useTags();
  const { mutate: createTag } = useCreateTag();
  const { mutate: deleteTag } = useDeleteTag();

  const tagItems = (tagsQuery.data?.tags ?? []).map((tag) => ({
    id: tag.tagId,
    label: tag.name,
    isDefault: tag.isDefault,
  }));

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
      const { data } = await updateLanguage({
        data: { language: LANGUAGE_REQUEST_MAP[language] },
      });

      if (data) {
        queryClient.setQueryData(
          getGetMyProfileQueryKey(),
          (cached?: BaseResponseUserProfileResponse) =>
            cached?.data
              ? {
                  ...cached,
                  data: { ...cached.data, language: data.language },
                }
              : cached,
        );
      }
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
      googleEmail: profile.email,
      isCalendarConnected,
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
