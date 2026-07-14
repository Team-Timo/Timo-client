"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { SettingsLanguage } from "@/app/[locale]/(main)/settings/_types/account/profile-type";

import {
  getGetMyProfileQueryKey,
  useUpdateLanguage,
} from "@/api/generated/endpoints/user/user";
import { UpdateLanguageRequestLanguage } from "@/api/generated/models";
import { tagCreateDataSchema } from "@/api/tag/tag-schema";
import { useSettingsLanguageParam } from "@/app/[locale]/(main)/settings/_hooks/account/use-settings-language-param";
import { useLogoutAction } from "@/app/[locale]/(main)/settings/_queries/account/use-logout";
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

export interface ActionErrorHandlers {
  onError: () => void;
}

export interface CreateTagHandlers extends ActionErrorHandlers {
  onSuccess: () => void;
}

export interface ConnectCalendarHandlers {
  onConnect: () => void;
  onDisconnect: () => void;
}

export const useSettingsProfile = () => {
  const { locale, commitLanguage } = useSettingsLanguageParam();

  const { data: profile } = useMyProfile();

  const { mutateAsync: updateLanguage } = useUpdateLanguage();
  const queryClient = useQueryClient();

  const tagsQuery = useTags();
  const { mutate: createTag } = useCreateTag();
  const { mutate: deleteTag } = useDeleteTag();
  const { mutate: logoutMutate, isPending: isLoggingOut } = useLogoutAction();

  const tagItems = (tagsQuery.data?.tags ?? []).map((tag) => ({
    id: tag.tagId,
    label: tag.name,
    isDefault: tag.isDefault,
  }));

  const handleConnectCalendar = (
    isCalendarConnected: boolean,
    handlers: ConnectCalendarHandlers,
  ) => {
    if (isCalendarConnected) {
      // TODO: 실제 확인 모달로 교체
      const confirmed = window.confirm("구글 캘린더 연동을 해제하시겠습니까?");
      if (!confirmed) return;

      // TODO: API - 연동 토큰 파기
      console.log("구글 캘린더 연동 토큰을 파기합니다.");
      handlers.onDisconnect();
      return;
    }

    // TODO: Google 계정 인증 및 캘린더 접근 권한 동의 팝업 호출
    console.log("Google Calendar 연동 인증 팝업을 호출합니다.");
    handlers.onConnect();
  };

  const handleCreateTag = (label: string, handlers: CreateTagHandlers) => {
    createTag(
      { name: label },
      {
        onSuccess: (response) => {
          const parsed = tagCreateDataSchema.safeParse(response.data);

          if (!parsed.success) {
            handlers.onError();
            return;
          }

          handlers.onSuccess();
        },
        onError: () => {
          handlers.onError();
        },
      },
    );
  };

  const handleRemoveTag = (tagId: number, handlers: ActionErrorHandlers) => {
    deleteTag(tagId, {
      onError: () => {
        handlers.onError();
      },
    });
  };

  const handleLogout = () => {
    if (isLoggingOut) return;
    logoutMutate();
  };

  const handleConfirmLanguageChange = async (
    next: SettingsLanguage,
    handlers: ActionErrorHandlers,
  ) => {
    if (next === locale) return;

    try {
      await updateLanguage({
        data: { language: LANGUAGE_REQUEST_MAP[next] },
      });

      await queryClient.invalidateQueries({
        queryKey: getGetMyProfileQueryKey(),
      });
      commitLanguage(next);
    } catch {
      handlers.onError();
    }
  };

  return {
    profileState: {
      name: profile.name,
      googleEmail: profile.email,
      calendarConnected: profile.calendarConnected,
      language: locale,
      tags: tagItems,
    },
    profileActions: {
      onConnectCalendar: handleConnectCalendar,
      onChangeLanguage: handleConfirmLanguageChange,
      onCreateTag: handleCreateTag,
      onRemoveTag: handleRemoveTag,
      onLogout: handleLogout,
    },
  };
};
