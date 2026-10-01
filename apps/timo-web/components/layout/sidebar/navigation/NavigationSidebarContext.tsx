"use client";

import { createContext, useContext, useState } from "react";

interface NavigationSidebarContextValue {
  isOpen: boolean;
  isMobileOpen: boolean;
  toggle: () => void;
}

const NavigationSidebarContext =
  createContext<NavigationSidebarContextValue | null>(null);

interface NavigationSidebarProviderProps {
  children: React.ReactNode;
}

export const NavigationSidebarProvider = ({
  children,
}: NavigationSidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const value: NavigationSidebarContextValue = {
    isOpen,
    isMobileOpen: !isOpen,
    toggle: () => setIsOpen((prev) => !prev),
  };

  return (
    <NavigationSidebarContext.Provider value={value}>
      {children}
    </NavigationSidebarContext.Provider>
  );
};

export const useNavigationSidebar = () => {
  const context = useContext(NavigationSidebarContext);

  if (!context) {
    throw new Error(
      "useNavigationSidebar must be used within a NavigationSidebarProvider",
    );
  }

  return context;
};
