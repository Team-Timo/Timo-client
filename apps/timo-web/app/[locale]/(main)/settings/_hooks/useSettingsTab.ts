"use client";

import { useSearchParams } from "next/navigation";

export type SettingsTab = "account" | "policy" | "withdrawal";

const SETTINGS_TAB_PARAM = "tab";

const isSettingsTab = (
  value: string | null,
): value is Exclude<SettingsTab, "account"> =>
  value === "policy" || value === "withdrawal";

export const useSettingsTab = (): SettingsTab => {
  const searchParams = useSearchParams();
  const param = searchParams.get(SETTINGS_TAB_PARAM);

  return isSettingsTab(param) ? param : "account";
};
