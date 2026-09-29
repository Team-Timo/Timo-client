"use client";

import { useTranslations } from "next-intl";

import type { OnboardingFunnelSteps } from "@/app/[locale]/onboarding/_types/onboarding-funnel";

import { OnboardingButtonContainer } from "@/app/[locale]/onboarding/_containers/OnboardingButtonContainer";
import { setOnboardingAnswers } from "@/app/[locale]/onboarding/_utils/onboarding-answers-storage";
import {
  CALENDAR_CONNECT_ORIGIN,
  CALENDAR_CONNECT_ORIGIN_KEY,
} from "@/constants/calendar";
import { AuthButtonContainer } from "@/containers/auth/AuthButtonContainer";
import { authorize } from "@/generated/endpoints/calendar/calendar";
import { useMyProfileQuery } from "@/queries/auth/use-my-profile-query";

interface CalendarConnectStepContainerProps {
  answers: OnboardingFunnelSteps["CalendarConnect"];
  isPending?: boolean;
  onConnectError: () => void;
  onPrev: () => void;
  onStart: () => void;
}

export const CalendarConnectStepContainer = ({
  answers,
  isPending,
  onConnectError,
  onPrev,
  onStart,
}: CalendarConnectStepContainerProps) => {
  const t = useTranslations("Onboarding");
  const { data: profile } = useMyProfileQuery();

  const handleGoogleConnect = async () => {
    try {
      const response = await authorize();
      const url = response.data?.authorizationUrl;
      if (!url) {
        onConnectError();
        return;
      }
      setOnboardingAnswers(answers);
      localStorage.setItem(
        CALENDAR_CONNECT_ORIGIN_KEY,
        CALENDAR_CONNECT_ORIGIN.ONBOARDING,
      );
      window.location.assign(url);
    } catch {
      onConnectError();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="typo-headline-b-24 text-timo-black whitespace-pre-line">
            {t("calendarConnect.title")}
          </h1>
          <p className="typo-headline-m-14 text-timo-gray-700">
            {t("calendarConnect.description")}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="typo-body-r-12 text-timo-gray-700">
              {t("calendarConnect.connectLabel")}
            </p>
            <AuthButtonContainer
              variant="googleCalendar"
              isSelected={profile.calendarConnected}
              onClick={handleGoogleConnect}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="typo-body-r-12 text-timo-gray-700">
              {t("calendarConnect.consentNotice")}
            </p>
            <p className="typo-body-r-12 text-timo-gray-700">
              {t("calendarConnect.permissionNotice")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-between">
        <OnboardingButtonContainer variant="prev" onClick={onPrev} />
        <OnboardingButtonContainer
          variant="start"
          disabled={isPending}
          onClick={onStart}
        />
      </div>
    </>
  );
};
