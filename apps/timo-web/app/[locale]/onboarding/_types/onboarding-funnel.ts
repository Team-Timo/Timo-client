export type PredictionAccuracy = 1 | 2 | 3 | 4;

// use-funnel의 CompareMergeContext가 keyof로 필드를 비교하는데, interface는
// keyof가 예상대로 계산되지 않아 타입 추론이 깨짐 (반드시 type이어야 함)
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type OnboardingFunnelSteps = {
  Language: {
    language?: "ko" | "en";
  };
  TimePrediction: {
    language: "ko" | "en";
    predictionAccuracy?: PredictionAccuracy;
  };
  LifePattern: {
    language: "ko" | "en";
    predictionAccuracy: PredictionAccuracy;
    wakeUpTime?: string;
    bedTime?: string;
  };
  CalendarConnect: {
    language: "ko" | "en";
    predictionAccuracy: PredictionAccuracy;
    wakeUpTime: string;
    bedTime: string;
  };
};
