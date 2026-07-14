"use client";

import { OverlayProvider as OverlayKitProvider } from "overlay-kit";

interface OverlayProviderProps {
  children: React.ReactNode;
}

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  return <OverlayKitProvider>{children}</OverlayKitProvider>;
};
