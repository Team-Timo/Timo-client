"use client";

import { NavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebar";
import {
  NavigationSidebarProvider,
  useNavigationSidebar,
} from "@/components/layout/sidebar/navigation/NavigationSidebarContext";

interface MainShellContainerProps {
  children: React.ReactNode;
}

const MAIN_MARGIN_CLASS_NAME = {
  open: "ml-55",
  collapsed: "ml-5",
} as const;

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useNavigationSidebar();

  return (
    <main
      className={`rounded-8 h-full overflow-y-auto bg-white transition-[margin-left] duration-200 ease-in-out ${
        isOpen ? MAIN_MARGIN_CLASS_NAME.open : MAIN_MARGIN_CLASS_NAME.collapsed
      }`}
    >
      {children}
    </main>
  );
};

export const MainShellContainer = ({ children }: MainShellContainerProps) => {
  return (
    <NavigationSidebarProvider>
      <NavigationSidebar />
      <MainContent>{children}</MainContent>
    </NavigationSidebarProvider>
  );
};
