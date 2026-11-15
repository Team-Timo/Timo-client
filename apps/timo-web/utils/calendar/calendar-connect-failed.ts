const CALENDAR_CONNECT_FAILED_KEY = "timo:calendar-connect-failed";

export const markCalendarConnectFailed = (): void => {
  try {
    window.sessionStorage.setItem(CALENDAR_CONNECT_FAILED_KEY, "true");
  } catch {
    // 저장소 접근 불가 시 무시
  }
};

export const hasCalendarConnectFailed = (): boolean => {
  try {
    return window.sessionStorage.getItem(CALENDAR_CONNECT_FAILED_KEY) !== null;
  } catch {
    return false;
  }
};

export const clearCalendarConnectFailed = (): void => {
  try {
    window.sessionStorage.removeItem(CALENDAR_CONNECT_FAILED_KEY);
  } catch {
    // 저장소 접근 불가 시 무시
  }
};
