"use client";

import { useFunnel } from "@use-funnel/browser";
import { useState } from "react";

import { OnboardingStepButton } from "@/app/[locale]/onboarding/_components/OnboardingStepButton";
import { CalendarConnectStepContainer } from "@/app/[locale]/onboarding/_containers/CalendarConnectStepContainer";
import { LanguageStepContainer } from "@/app/[locale]/onboarding/_containers/LanguageStepContainer";
import { LifePatternStepContainer } from "@/app/[locale]/onboarding/_containers/LifePatternStepContainer";
import { TimePredictionStepContainer } from "@/app/[locale]/onboarding/_containers/TimePredictionStepContainer";
import { OnboardingFunnelSteps } from "@/app/[locale]/onboarding/_types/onboarding-funnel";
import { LottiePlayer } from "@/components/lottie/LottiePlayer";

const STEP_NUMBER: Record<keyof OnboardingFunnelSteps, 1 | 2 | 3 | 4> = {
  Language: 1,
  TimePrediction: 2,
  LifePattern: 3,
  CalendarConnect: 4,
};

export const OnboardingFunnelContainer = () => {
  const [answers, setAnswers] = useState<
    Partial<OnboardingFunnelSteps["CalendarConnect"]>
  >({});

  const funnel = useFunnel<OnboardingFunnelSteps>({
    id: "onboarding",
    initial: { step: "Language", context: {} },
  });

  return (
    <main className="flex min-h-screen items-center justify-center gap-10 bg-white px-8 lg:gap-16 xl:gap-36 2xl:gap-[225px]">
      <LottiePlayer
        src="/lottie/onboarding.json"
        className="hidden shrink-0 lg:block lg:size-[350px] xl:size-[430px] 2xl:size-[500px]"
        ariaLabel="온보딩 애니메이션"
      />
      <div className="border-timo-gray-500 shadow-timo flex min-h-153.5 flex-col rounded-[4px] border bg-white px-16 py-12">
        <div className="flex w-76 flex-1 flex-col gap-10">
          <OnboardingStepButton step={STEP_NUMBER[funnel.step]} />

          <funnel.Render
            Language={({ history }) => (
              <LanguageStepContainer
                language={answers.language}
                onSelect={(language) =>
                  setAnswers((prev) => ({ ...prev, language }))
                }
                onNext={() => {
                  if (!answers.language) return;
                  history.push("TimePrediction", {
                    language: answers.language,
                  });
                }}
              />
            )}
            TimePrediction={({ history }) => (
              <TimePredictionStepContainer
                predictionAccuracy={answers.predictionAccuracy}
                onSelect={(predictionAccuracy) =>
                  setAnswers((prev) => ({ ...prev, predictionAccuracy }))
                }
                onPrev={() => history.back()}
                onNext={() => {
                  if (!answers.language || !answers.predictionAccuracy) return;
                  history.push("LifePattern", {
                    language: answers.language,
                    predictionAccuracy: answers.predictionAccuracy,
                  });
                }}
              />
            )}
            LifePattern={({ history }) => (
              <LifePatternStepContainer
                wakeUpTime={answers.wakeUpTime}
                bedTime={answers.bedTime}
                onSelectWakeUpTime={(wakeUpTime) =>
                  setAnswers((prev) => ({ ...prev, wakeUpTime }))
                }
                onSelectBedTime={(bedTime) =>
                  setAnswers((prev) => ({ ...prev, bedTime }))
                }
                onPrev={() => history.back()}
                onNext={() => {
                  if (
                    !answers.language ||
                    !answers.predictionAccuracy ||
                    !answers.wakeUpTime ||
                    !answers.bedTime
                  )
                    return;
                  history.push("CalendarConnect", {
                    language: answers.language,
                    predictionAccuracy: answers.predictionAccuracy,
                    wakeUpTime: answers.wakeUpTime,
                    bedTime: answers.bedTime,
                  });
                }}
              />
            )}
            CalendarConnect={({ history }) => (
              <CalendarConnectStepContainer
                onPrev={() => history.back()}
                onStart={() => {
                  if (
                    !answers.language ||
                    !answers.predictionAccuracy ||
                    !answers.wakeUpTime ||
                    !answers.bedTime
                  )
                    return;
                  const payload: OnboardingFunnelSteps["CalendarConnect"] = {
                    language: answers.language,
                    predictionAccuracy: answers.predictionAccuracy,
                    wakeUpTime: answers.wakeUpTime,
                    bedTime: answers.bedTime,
                  };
                  // TODO: 실제 제출 API 연동 + 완료 후 payload.language로 locale 리다이렉트
                  console.log("[onboarding] submit payload", payload);
                }}
              />
            )}
          />
        </div>
      </div>
    </main>
  );
};
