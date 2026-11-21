import mixpanel from "mixpanel-browser";

import type { MixpanelEventName } from "@/types/analytics/mixpanel-event";

const MIXPANEL_TOKEN =
  process.env.NEXT_PUBLIC_APP_ENV === "production"
    ? process.env.NEXT_PUBLIC_MIXPANEL_TOKEN_PROD
    : process.env.NEXT_PUBLIC_MIXPANEL_TOKEN_DEV;

let isInitialized = false;
let lastIdentifiedUserId: string | null = null;

const canUseMixpanel = () => typeof window !== "undefined" && isInitialized;

/**
 * Mixpanel을 초기화합니다. 브라우저에서 한 번만 실행되며,
 * NEXT_PUBLIC_APP_ENV(production/development)에 따라 서로 다른 Mixpanel 프로젝트 토큰을 사용합니다.
 * 해당 토큰이 없으면 건너뛰어 다른 함수도 동작하지 않습니다.
 */
export const initMixpanel = (): void => {
  if (typeof window === "undefined" || isInitialized || !MIXPANEL_TOKEN) {
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: false,
  });
  isInitialized = true;
};

/**
 * 서버와 같은 유저 ID로 식별해 클라이언트·서버 이벤트를 한 유저로 집계합니다.
 * 로그인 직후뿐 아니라 세션 복구(새로고침·재방문) 시에도 호출될 수 있어,
 * 마지막으로 식별한 유저 ID와 같으면 중복 호출을 건너뜁니다.
 *
 * @param userId - 서버 유저 ID 문자열
 */
export const identifyMixpanel = (userId: string): void => {
  if (!canUseMixpanel() || lastIdentifiedUserId === userId) return;
  mixpanel.identify(userId);
  lastIdentifiedUserId = userId;
};

/** 로그아웃 시 식별 정보를 초기화합니다. */
export const resetMixpanel = (): void => {
  if (!canUseMixpanel()) return;
  mixpanel.reset();
  lastIdentifiedUserId = null;
};

/**
 * 이벤트를 전송합니다.
 *
 * @param event - 트래킹 플랜에 정의된 이벤트 이름
 * @param properties - 함께 보낼 속성
 */
export const trackMixpanel = (
  event: MixpanelEventName,
  properties?: Record<string, unknown>,
): void => {
  if (!canUseMixpanel()) return;
  mixpanel.track(event, properties);
};
