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

/**
 * 캘린더 연동으로 온보딩을 벗어나기 전 저장해 둔 답변을 sessionStorage에서 가져옵니다.
 *
 * @returns 저장된 온보딩 답변, 없거나 형식이 맞지 않으면 null
 */
export const getOnboardingAnswers = (): OnboardingAnswers | null => {
  const raw = window.sessionStorage.getItem(ONBOARDING_ANSWERS_KEY);
  if (raw === null) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isOnboardingAnswers(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

/**
 * 캘린더 연동 페이지로 이동하기 전 온보딩 답변을 sessionStorage에 저장합니다.
 *
 * @param answers - 캘린더 연동 단계까지 입력한 온보딩 답변
 */
export const setOnboardingAnswers = (answers: OnboardingAnswers): void => {
  window.sessionStorage.setItem(
    ONBOARDING_ANSWERS_KEY,
    JSON.stringify(answers),
  );
};

/**
 * 온보딩 완료 후 저장해 둔 답변을 sessionStorage에서 삭제합니다.
 */
export const removeOnboardingAnswers = (): void => {
  window.sessionStorage.removeItem(ONBOARDING_ANSWERS_KEY);
};
