"use client";

import { AlertIcon, MoonIcon, SunIcon } from "@repo/timo-design-system/icons";
import { useTranslations } from "next-intl";

import { OnboardingTimeDropdown } from "@/app/[locale]/onboarding/_components/OnboardingTimeDropdown";
import { OnboardingButtonContainer } from "@/app/[locale]/onboarding/_containers/OnboardingButtonContainer";

interface LifePatternStepContainerProps {
  wakeUpTime?: string;
  bedTime?: string;
  onSelectWakeUpTime: (time: string) => void;
  onSelectBedTime: (time: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LifePatternStepContainer = ({
  wakeUpTime,
  bedTime,
  onSelectWakeUpTime,
  onSelectBedTime,
  onPrev,
  onNext,
}: LifePatternStepContainerProps) => {
  const t = useTranslations("Onboarding");

  const isBedTimeInvalid = Boolean(
    wakeUpTime && bedTime && bedTime === wakeUpTime,
  );
  const canProceed = Boolean(wakeUpTime && bedTime && !isBedTimeInvalid);

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="typo-headline-b-24 text-timo-black">
            {t("lifePattern.title")}
          </h1>
          <p className="typo-headline-m-14 text-timo-gray-700">
            {t("lifePattern.description")}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <div className="flex w-37.5 flex-col gap-3">
              <div className="flex items-center gap-2">
                <SunIcon />
                <span className="typo-body-r-12 text-timo-blue-300">
                  {t("lifePattern.wakeUpTime")}
                </span>
              </div>
              <OnboardingTimeDropdown
                value={wakeUpTime ?? ""}
                placeholder="01:00"
                onChange={onSelectWakeUpTime}
              />
            </div>

            <div className="flex w-37.5 flex-col gap-3">
              <div className="flex items-center gap-2">
                <MoonIcon />
                <span className="typo-body-r-12 text-timo-blue-300">
                  {t("lifePattern.bedTime")}
                </span>
              </div>
              <OnboardingTimeDropdown
                value={bedTime ?? ""}
                placeholder="23:00"
                onChange={onSelectBedTime}
              />
            </div>
          </div>

          {isBedTimeInvalid && (
            <div className="flex items-center gap-1">
              <AlertIcon />
              <span className="typo-body-sb-12 text-timo-red whitespace-nowrap">
                {t("lifePattern.bedTimeError")}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto flex justify-between">
        <OnboardingButtonContainer variant="prev" onClick={onPrev} />
        <OnboardingButtonContainer
          variant="next"
          isActive={canProceed}
          disabled={!canProceed}
          onClick={onNext}
        />
      </div>
    </>
  );
};
