"use client";

import { useTranslations } from "next-intl";

import { OnboardingSelectCard } from "@/app/[locale]/onboarding/_components/OnboardingSelectCard";
import { OnboardingButtonContainer } from "@/app/[locale]/onboarding/_containers/OnboardingButtonContainer";
import { PredictionAccuracy } from "@/app/[locale]/onboarding/_types/onboarding-funnel";

interface TimePredictionStepContainerProps {
  predictionAccuracy?: PredictionAccuracy;
  onSelect: (predictionAccuracy: PredictionAccuracy | undefined) => void;
  onPrev: () => void;
  onNext: () => void;
}

const PREDICTION_ACCURACY_OPTIONS: PredictionAccuracy[] = [4, 3, 2, 1];

export const TimePredictionStepContainer = ({
  predictionAccuracy,
  onSelect,
  onPrev,
  onNext,
}: TimePredictionStepContainerProps) => {
  const t = useTranslations("Onboarding");

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="typo-headline-b-24 text-timo-black whitespace-pre-line">
            {t("timePrediction.title")}
          </h1>
          <p className="typo-headline-m-14 text-timo-gray-700">
            {t("timePrediction.description")}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {PREDICTION_ACCURACY_OPTIONS.map((accuracy) => (
            <OnboardingSelectCard
              key={accuracy}
              size="lg"
              label={t(`timePrediction.options.${accuracy}.label`)}
              sublabel={t(`timePrediction.options.${accuracy}.sublabel`)}
              selected={predictionAccuracy === accuracy}
              onClick={() =>
                onSelect(predictionAccuracy === accuracy ? undefined : accuracy)
              }
            />
          ))}
        </div>
      </div>

      <div className="mt-auto flex justify-between">
        <OnboardingButtonContainer variant="prev" onClick={onPrev} />
        <OnboardingButtonContainer
          variant="next"
          isActive={predictionAccuracy !== undefined}
          disabled={predictionAccuracy === undefined}
          onClick={onNext}
        />
      </div>
    </>
  );
};
