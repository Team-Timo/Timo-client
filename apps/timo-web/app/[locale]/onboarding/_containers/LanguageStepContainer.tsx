"use client";

import { useTranslations } from "next-intl";

import { OnboardingSelectCard } from "@/app/[locale]/onboarding/_components/OnboardingSelectCard";
import { OnboardingButtonContainer } from "@/app/[locale]/onboarding/_containers/OnboardingButtonContainer";

interface LanguageStepContainerProps {
  language?: "ko" | "en";
  onSelect: (language: "ko" | "en" | undefined) => void;
  onNext: () => void;
}

export const LanguageStepContainer = ({
  language,
  onSelect,
  onNext,
}: LanguageStepContainerProps) => {
  const t = useTranslations("Onboarding");

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="typo-headline-b-24 text-timo-black">
            {t("language.title")}
          </h1>
          <p className="typo-headline-m-14 text-timo-gray-700 whitespace-pre-line">
            {t("language.description")}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <OnboardingSelectCard
            size="sm"
            label="English"
            sublabel="영어"
            selected={language === "en"}
            onClick={() => onSelect(language === "en" ? undefined : "en")}
          />
          <OnboardingSelectCard
            size="sm"
            label="한국어"
            sublabel="Korean"
            selected={language === "ko"}
            onClick={() => onSelect(language === "ko" ? undefined : "ko")}
          />
        </div>
      </div>

      <div className="mt-auto flex justify-end">
        <OnboardingButtonContainer
          variant="next"
          isActive={language !== undefined}
          disabled={language === undefined}
          onClick={onNext}
        />
      </div>
    </>
  );
};
