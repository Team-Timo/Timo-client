"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import type { SettingsLanguage } from "@/app/[locale]/(main)/settings/_types/account/profile-type";

import {
  authorize,
  useDisconnectCalendar,
} from "@/api/generated/endpoints/calendar/calendar";
import {
  getGetMyProfileQueryKey,
  useUpdateLanguage,
} from "@/api/generated/endpoints/user/user";
import { UpdateLanguageRequestLanguage } from "@/api/generated/models";
import { useSettingsLanguageParam } from "@/app/[locale]/(main)/settings/_hooks/account/use-settings-language-param";
import { useLogoutMutation } from "@/app/[locale]/(main)/settings/_queries/account/use-logout-mutation";
import { useMyProfileQuery } from "@/queries/auth/use-my-profile-query";
import { useCreateTagMutation } from "@/queries/tag/use-create-tag-mutation";
import { useDeleteTagMutation } from "@/queries/tag/use-delete-tag-mutation";
import { useTagsQuery } from "@/queries/tag/use-tags-query";
import { tagCreateDataSchema } from "@/schemas/tag/tag-schema";
import { getDefaultTagLabelKey } from "@/utils/todo/tag-label";

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
  onConnectError?: () => void;
  onDisconnectError?: () => void;
}

export const useSettingsProfile = () => {
  const { locale, commitLanguage } = useSettingsLanguageParam();
  const tCommon = useTranslations("Common");

  const { data: profile } = useMyProfileQuery();

  const { mutate: disconnectCalendar } = useDisconnectCalendar();
  const { mutateAsync: updateLanguage } = useUpdateLanguage();
  const queryClient = useQueryClient();

  const tagsQuery = useTagsQuery();
  const { mutate: createTag } = useCreateTagMutation();
  const { mutate: deleteTag } = useDeleteTagMutation();
  const { mutate: logoutMutate, isPending: isLoggingOut } = useLogoutMutation();

  const tagItems = (tagsQuery.data?.tags ?? []).map((tag) => {
    const labelKey = tag.isDefault
      ? getDefaultTagLabelKey(tag.tagId)
      : undefined;

    return {
      id: tag.tagId,
      label: labelKey ? tCommon(`tag.${labelKey}`) : tag.name,
      isDefault: tag.isDefault,
    };
  });

  const handleConnectCalendar = async (
    isCalendarConnected: boolean,
    handlers: ConnectCalendarHandlers,
  ) => {
    if (isCalendarConnected) {
      disconnectCalendar(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetMyProfileQueryKey(),
          });
          handlers.onDisconnect();
        },
        onError: () => {
          handlers.onDisconnectError?.();
        },
      });
      return;
    }

    try {
      const response = await authorize();
      const url = response.data?.authorizationUrl;
      if (!url) {
        handlers.onConnectError?.();
        return;
      }
      localStorage.setItem("calendarConnectOrigin", "settings");
      window.location.assign(url);
    } catch {
      handlers.onConnectError?.();
    }
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
      profileImageUrl: profile.profileImageUrl ?? undefined,
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
