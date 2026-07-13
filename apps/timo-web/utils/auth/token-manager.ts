const ACCESS_TOKEN_KEY = "accessToken";
const ONBOARDING_COMPLETED_KEY = "onboardingCompleted";

const isBrowser = typeof window !== "undefined";

/**
 * localStorage에 저장된 accessToken을 가져옵니다.
 *
 * @returns 저장된 accessToken, 없거나 서버 환경이면 null
 */
export const getAccessToken = (): string | null => {
  if (!isBrowser) return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * accessToken을 localStorage에 저장합니다.
 *
 * @param token - 저장할 accessToken
 */
export const setAccessToken = (token: string): void => {
  if (!isBrowser) return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * localStorage에 저장된 accessToken을 제거합니다.
 */
export const clearAccessToken = (): void => {
  if (!isBrowser) return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
};

/**
 * 온보딩 완료 여부를 localStorage에서 가져옵니다.
 *
 * @returns 온보딩 완료 여부, 저장된 값이 없거나 서버 환경이면 false
 */
export const getOnboardingCompleted = (): boolean => {
  if (!isBrowser) return false;
  return window.localStorage.getItem(ONBOARDING_COMPLETED_KEY) === "true";
};

/**
 * 온보딩 완료 여부를 localStorage에 저장합니다.
 *
 * @param completed - 저장할 온보딩 완료 여부
 */
export const setOnboardingCompleted = (completed: boolean): void => {
  if (!isBrowser) return;
  window.localStorage.setItem(ONBOARDING_COMPLETED_KEY, String(completed));
};

/**
 * localStorage에 저장된 온보딩 완료 여부를 제거합니다.
 */
export const clearOnboardingCompleted = (): void => {
  if (!isBrowser) return;
  window.localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
};
