"use client";

import { Header } from "@/components/layout/header/Header";
import { NavigationSidebarToggle } from "@/components/layout/sidebar/navigation/NavigationSidebarToggle";

export const SettingsHeaderContainer = () => {
  return <Header left={<NavigationSidebarToggle />} />;
};
