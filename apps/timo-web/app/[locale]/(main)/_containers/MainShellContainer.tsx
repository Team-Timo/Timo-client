"use client";

import { cn } from "@repo/timo-design-system/utils";
import { useEffect } from "react";

import { NavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebar";
import {
  NavigationSidebarProvider,
  useNavigationSidebar,
} from "@/components/layout/sidebar/navigation/NavigationSidebarContext";
import { unlockTimerSound } from "@/utils/timer/timer-sound";

interface MainShellContainerProps {
  children: React.ReactNode;
}

const MAIN_MARGIN_CLASS_NAME = {
  open: "md:ml-55",
  collapsed: "md:ml-5",
} as const;

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useNavigationSidebar();

  return (
    <main
      className={cn(
        "md:rounded-8 h-full overflow-y-auto bg-white transition-[margin-left] duration-200 ease-in-out",
        isOpen ? MAIN_MARGIN_CLASS_NAME.open : MAIN_MARGIN_CLASS_NAME.collapsed,
      )}
    >
      {children}
    </main>
  );
};

export const MainShellContainer = ({ children }: MainShellContainerProps) => {
  useEffect(() => {
    const unlock = (event: Event) => {
      if (!event.isTrusted) return;
      void unlockTimerSound().then((isUnlocked) => {
        if (isUnlocked) removeListeners();
      });
    };
    const removeListeners = () => {
      window.removeEventListener("click", unlock, true);
      window.removeEventListener("keydown", unlock, true);
    };
    window.addEventListener("click", unlock, true);
    window.addEventListener("keydown", unlock, true);
    return removeListeners;
  }, []);

  return (
    <NavigationSidebarProvider>
      <NavigationSidebar />
      <MainContent>{children}</MainContent>
    </NavigationSidebarProvider>
  );
};
