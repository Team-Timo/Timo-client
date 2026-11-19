export const CALENDAR_CONNECT_ORIGIN = {
  ONBOARDING: "onboarding",
  SETTINGS: "settings",
} as const;

export type CalendarConnectOrigin =
  (typeof CALENDAR_CONNECT_ORIGIN)[keyof typeof CALENDAR_CONNECT_ORIGIN];

export const APPLE_CALENDAR_ERROR = {
  AUTH: "APPLE_CALENDAR_401",
  ALREADY_CONNECTED: "APPLE_CALENDAR_409",
} as const;
