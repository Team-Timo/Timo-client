export type TimeSidebarSize = "sm" | "lg";

export const TIME_SIDEBAR_WIDTH_CLASS_NAME: Record<TimeSidebarSize, string> = {
  sm: "md:w-76",
  lg: "md:w-110",
};

export const TIME_SIDEBAR_MARGIN_CLASS_NAME: Record<TimeSidebarSize, string> = {
  sm: "md:mr-76",
  lg: "md:mr-110",
};

export const TIME_SIDEBAR_COLLAPSED_WIDTH_CLASS_NAME = "md:w-17";
export const TIME_SIDEBAR_COLLAPSED_MARGIN_CLASS_NAME = "md:mr-17";
