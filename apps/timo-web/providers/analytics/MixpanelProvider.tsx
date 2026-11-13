"use client";

import { useEffect } from "react";

import { initMixpanel } from "@/utils/analytics/mixpanel";

interface MixpanelProviderProps {
  children: React.ReactNode;
}

export const MixpanelProvider = ({ children }: MixpanelProviderProps) => {
  useEffect(() => {
    initMixpanel();
  }, []);

  return <>{children}</>;
};
