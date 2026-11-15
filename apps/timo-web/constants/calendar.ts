export const CALENDAR_CONNECT_ORIGIN = {
  ONBOARDING: "onboarding",
  SETTINGS: "settings",
} as const;

export type CalendarConnectOrigin =
  (typeof CALENDAR_CONNECT_ORIGIN)[keyof typeof CALENDAR_CONNECT_ORIGIN];

export const APPLE_CALENDAR_AUTH_ERROR = "APPLE_CALENDAR_401";
