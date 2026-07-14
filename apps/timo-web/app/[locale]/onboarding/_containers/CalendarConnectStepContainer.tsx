"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { authorize } from "@/api/generated/endpoints/calendar/calendar";
import { OnboardingButtonContainer } from "@/app/[locale]/onboarding/_containers/OnboardingButtonContainer";
import { OnboardingGoogleButtonContainer } from "@/app/[locale]/onboarding/_containers/OnboardingGoogleButtonContainer";

interface CalendarConnectStepContainerProps {
  isPending?: boolean;
  onPrev: () => void;
  onStart: () => void;
}

export const CalendarConnectStepContainer = ({
  isPending,
  onPrev,
  onStart,
}: CalendarConnectStepContainerProps) => {
  const t = useTranslations("Onboarding");
  const [isCalendarConnected] = useState(false);

  const handleGoogleConnect = async () => {
    try {
      const response = await authorize();
      const url = response.data?.authorizationUrl;
      if (!url) return;
      localStorage.setItem("calendarConnectOrigin", "onboarding");
      window.location.assign(url);
    } catch {
      // authorize 실패 시 아무 동작 없음 — 사용자가 재시도 가능
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
            <OnboardingGoogleButtonContainer
              variant="connectCalendar"
              isSelected={isCalendarConnected}
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
