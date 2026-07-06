"use client";

import { Toast } from "@repo/timo-design-system/ui";
import { cn } from "@repo/timo-design-system/utils";
import { useEffect, useState } from "react";

import type { ReactNode } from "react";

const EXIT_ANIMATION_DURATION = 200;

export interface AnimatedToastProps {
  message: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  duration?: number;
}

export const AnimatedToast = ({
  message,
  isOpen,
  onClose,
  duration = 3000,
}: AnimatedToastProps) => {
  const [shouldRender, setShouldRender] = useState<boolean>(isOpen);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);

      const hideTimer = setTimeout(
        () => setShouldRender(false),
        EXIT_ANIMATION_DURATION,
      );

      return () => clearTimeout(hideTimer);
    }

    setShouldRender(true);

    const showFrame = requestAnimationFrame(() => setIsVisible(true));

    return () => cancelAnimationFrame(showFrame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !duration) {
      return;
    }

    const autoCloseTimer = setTimeout(() => onClose?.(), duration);

    return () => clearTimeout(autoCloseTimer);
  }, [isOpen, duration, onClose]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-11 left-1/2 z-50 -translate-x-1/2 transition-all duration-200 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <Toast message={message} />
    </div>
  );
};
