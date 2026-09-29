const CALENDAR_CONNECT_FAILED_KEY = "timo:calendar-connect-failed";

/**
 * 캘린더 연동 callback에서 연동에 실패했음을 sessionStorage에 기록합니다.
 * 리다이렉트된 온보딩·설정 화면에서 실패 토스트를 띄우는 데 사용합니다.
 */
export const markCalendarConnectFailed = (): void => {
  window.sessionStorage.setItem(CALENDAR_CONNECT_FAILED_KEY, "true");
};

/**
 * 직전 캘린더 연동이 실패했는지 sessionStorage에서 확인합니다.
 *
 * @returns 실패 기록이 있으면 true
 */
export const hasCalendarConnectFailed = (): boolean =>
  window.sessionStorage.getItem(CALENDAR_CONNECT_FAILED_KEY) !== null;

/**
 * 실패 토스트를 띄운 뒤 sessionStorage의 실패 기록을 삭제합니다.
 */
export const clearCalendarConnectFailed = (): void => {
  window.sessionStorage.removeItem(CALENDAR_CONNECT_FAILED_KEY);
};
