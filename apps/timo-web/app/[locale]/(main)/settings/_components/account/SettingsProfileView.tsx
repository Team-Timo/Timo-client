import { Button } from "@repo/timo-design-system/ui";
import Image from "next/image";

import type {
  SettingsLanguage,
  SettingsProfileLabels,
  SettingsTagItem,
} from "@/app/[locale]/(main)/settings/_types/account/profile-type";

import { SettingsLanguageSectionContainer } from "@/app/[locale]/(main)/settings/_containers/account/SettingsLanguageSectionContainer";
import { SettingsLogoutModalContainer } from "@/app/[locale]/(main)/settings/_containers/account/SettingsLogoutModalContainer";
import { SettingsTagsSectionContainer } from "@/app/[locale]/(main)/settings/_containers/account/SettingsTagsSectionContainer";

export interface SettingsProfileViewProps {
  name: string;
  googleEmail: string;
  profileImageUrl?: string;
  isCalendarConnected: boolean;
  language: SettingsLanguage;
  tags: SettingsTagItem[];
  labels: SettingsProfileLabels;
  onConnectCalendar: () => void;
  onChangeLanguage: (language: SettingsLanguage) => void;
  onAddTag: () => void;
  onRemoveTag: (tagId: number) => void;
  onLogout: () => void;
}

export const SettingsProfileView = ({
  name,
  googleEmail,
  profileImageUrl,
  isCalendarConnected,
  language,
  tags,
  labels,
  onConnectCalendar,
  onChangeLanguage,
  onAddTag,
  onRemoveTag,
  onLogout,
}: SettingsProfileViewProps) => {
  return (
    <div className="flex flex-col items-end gap-7.5 pb-15">
      <div className="flex w-full flex-col gap-7.5">
        <h1 className="typo-headline-m-16 text-timo-gray-900 sr-only md:not-sr-only">
          {labels.title}
        </h1>
        <hr className="border-timo-gray-500 hidden md:block" />

        <section className="flex flex-col gap-4">
          <h2 className="typo-headline-b-16 text-timo-gray-900">
            {labels.profileSection}
          </h2>
          <div className="flex items-center gap-3 md:gap-5">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt={name}
                width={114}
                height={114}
                priority
                className="size-16 shrink-0 rounded-full object-cover md:size-28.5"
              />
            ) : (
              <div className="bg-timo-gray-300 size-16 shrink-0 rounded-full md:size-28.5" />
            )}
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
            {labels.calendarSection}
          </h2>
          <div className="bg-timo-gray-300 flex w-full items-center justify-between gap-4 self-start rounded-lg px-2.5 py-1.5 md:w-fit md:justify-start">
            <div className="flex items-center gap-1.5">
              <div className="flex size-6 shrink-0 items-center justify-center p-1">
                <Image
                  src="/images/google-calendar.png"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              <span className="typo-headline-m-16 text-timo-gray-700 whitespace-nowrap">
                Google Calendar
              </span>
            </div>

            <Button
              variant={isCalendarConnected ? "secondary" : "primary"}
              appearance="fill"
              size="m"
              className="w-20"
              onClick={onConnectCalendar}
            >
              {isCalendarConnected ? labels.disconnect : labels.connect}
            </Button>
          </div>
        </section>

        <hr className="border-timo-gray-500" />

        <SettingsLanguageSectionContainer
          language={language}
          labels={labels}
          onChangeLanguage={onChangeLanguage}
        />

        <hr className="border-timo-gray-500" />

        <SettingsTagsSectionContainer
          tags={tags}
          labels={labels}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
        />

        <hr className="border-timo-gray-500" />

        <SettingsLogoutModalContainer labels={labels} onLogout={onLogout} />
      </div>
    </div>
  );
};
