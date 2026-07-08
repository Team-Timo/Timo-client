export type TimeSidebarSize = "sm" | "lg";

export const TIME_SIDEBAR_WIDTH_CLASS_NAME: Record<TimeSidebarSize, string> = {
  sm: "w-76",
  lg: "w-110",
};

export const TIME_SIDEBAR_MARGIN_CLASS_NAME: Record<TimeSidebarSize, string> = {
  sm: "mr-76",
  lg: "mr-110",
};

export const TIME_SIDEBAR_COLLAPSED_WIDTH_CLASS_NAME = "w-17";
export const TIME_SIDEBAR_COLLAPSED_MARGIN_CLASS_NAME = "mr-17";
