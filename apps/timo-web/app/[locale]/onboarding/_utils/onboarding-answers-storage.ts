import type { OnboardingFunnelSteps } from "@/app/[locale]/onboarding/_types/onboarding-funnel";

const ONBOARDING_ANSWERS_KEY = "timo:onboarding-answers";

type OnboardingAnswers = OnboardingFunnelSteps["CalendarConnect"];

const isOnboardingAnswers = (value: unknown): value is OnboardingAnswers => {
  if (typeof value !== "object" || value === null) return false;

  const { language, predictionAccuracy, wakeUpTime, bedTime } = value as Record<
    string,
    unknown
  >;
  return (
    (language === "ko" || language === "en") &&
    (predictionAccuracy === 1 ||
      predictionAccuracy === 2 ||
      predictionAccuracy === 3 ||
      predictionAccuracy === 4) &&
    typeof wakeUpTime === "string" &&
    typeof bedTime === "string"
  );
};

export const getOnboardingAnswers = (): OnboardingAnswers | null => {
  try {
    const raw = window.sessionStorage.getItem(ONBOARDING_ANSWERS_KEY);
    if (raw === null) return null;

    const parsed: unknown = JSON.parse(raw);
    return isOnboardingAnswers(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const setOnboardingAnswers = (answers: OnboardingAnswers): void => {
  try {
    window.sessionStorage.setItem(
      ONBOARDING_ANSWERS_KEY,
      JSON.stringify(answers),
    );
  } catch {
    // 저장소 접근 불가 시 무시
  }
};

export const removeOnboardingAnswers = (): void => {
  try {
    window.sessionStorage.removeItem(ONBOARDING_ANSWERS_KEY);
  } catch {
    // 저장소 접근 불가 시 무시
  }
};
