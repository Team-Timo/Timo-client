import { PlusIcon } from "@repo/timo-design-system/icons";
import {
  CreateButton,
  TagButton,
  TogglePanel,
} from "@repo/timo-design-system/ui";
import Image from "next/image";

import type { SettingsLanguage } from "@/app/[locale]/(main)/settings/_types/profile-type";

const DEFAULT_SETTINGS_TAGS = ["과제", "업무", "운동", "일상"];

export interface SettingsProfileFormProps {
  name: string;
  googleEmail: string;
  isCalendarConnected: boolean;
  language: SettingsLanguage;
  tags: string[];
  isSaveDisabled: boolean;
  onConnectCalendar: () => void;
  onChangeLanguage: (language: SettingsLanguage) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onLogout: () => void;
  onSave: () => void;
}

export const SettingsProfileForm = ({
  name,
  googleEmail,
  isCalendarConnected,
  language,
  tags,
  isSaveDisabled,
  onConnectCalendar,
  onChangeLanguage,
  onAddTag,
  onRemoveTag,
  onLogout,
  onSave,
}: SettingsProfileFormProps) => {
  return (
    <div className="flex flex-col items-end gap-7.5">
      <div className="flex w-full flex-col gap-7.5">
        <h1 className="typo-headline-m-16 text-timo-gray-900">개인 정보</h1>
        <hr className="border-timo-gray-500" />

        <section className="flex flex-col gap-4">
          <h2 className="typo-headline-b-16 text-timo-gray-900">프로필</h2>
          <div className="flex items-center gap-5">
            <div className="bg-timo-gray-300 size-28.5 shrink-0 rounded-full" />
            <div className="flex flex-col gap-2">
              <p className="typo-headline-b-20 text-timo-black">{name}</p>
              <div className="bg-timo-gray-300 flex items-center gap-2 rounded-lg px-4 py-2">
                <Image
                  src="/images/google-logo.png"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span className="typo-headline-m-16 text-timo-gray-900">
                  {googleEmail}
                </span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-timo-gray-500" />

        <section className="flex flex-col gap-3">
          <h2 className="typo-headline-b-16 text-timo-gray-900">
            구글 캘린더 연동
          </h2>
          <div className="bg-timo-gray-300 flex h-10.25 items-center gap-4 rounded-lg px-2.5 py-1.5">
            <div className="flex items-center gap-1.5">
              <Image
                src="/images/google-calendar.png"
                alt=""
                width={20}
                height={20}
              />
              <span className="typo-headline-m-16 text-timo-gray-700 whitespace-nowrap">
                Google Calendar
              </span>
            </div>

            <TagButton variant="blue" onClick={onConnectCalendar}>
              {isCalendarConnected ? "연동 해제" : "연동하기"}
            </TagButton>
          </div>
        </section>

        <hr className="border-timo-gray-500" />

        <section className="flex w-67 flex-col gap-3">
          <h2 className="typo-headline-b-16 text-timo-gray-900">언어</h2>
          <TogglePanel
            id="settings-language"
            value={language}
            onChange={(value) => onChangeLanguage(value as SettingsLanguage)}
            options={[
              { value: "ko", label: "한국어" },
              { value: "en", label: "English" },
            ]}
          />
        </section>

        <hr className="border-timo-gray-500" />

        <section className="flex w-98 flex-col gap-3">
          <h2 className="typo-headline-b-16 text-timo-gray-900">태그</h2>
          <div className="flex flex-wrap items-center gap-3">
            {tags.map((tag) => {
              const isDefaultTag = DEFAULT_SETTINGS_TAGS.includes(tag);

              return (
                <TagButton
                  key={tag}
                  onRemove={isDefaultTag ? undefined : () => onRemoveTag(tag)}
                  removeLabel={`${tag} 태그 삭제`}
                >
                  {tag}
                </TagButton>
              );
            })}

            <TagButton
              icon={<PlusIcon width={20} height={20} />}
              onClick={onAddTag}
            >
              태그 추가
            </TagButton>
          </div>
        </section>

        <hr className="border-timo-gray-500" />

        <TagButton onClick={onLogout} className="w-fit">
          로그아웃
        </TagButton>
      </div>

      <CreateButton
        label="변경사항 저장"
        disabled={isSaveDisabled}
        onClick={onSave}
      />
    </div>
  );
};
