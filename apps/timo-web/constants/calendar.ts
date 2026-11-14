export const CALENDAR_CONNECT_ORIGIN = {
  ONBOARDING: "onboarding",
  SETTINGS: "settings",
} as const;

export type CalendarConnectOrigin =
  (typeof CALENDAR_CONNECT_ORIGIN)[keyof typeof CALENDAR_CONNECT_ORIGIN];
