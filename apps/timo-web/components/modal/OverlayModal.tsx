"use client";

import { cn, hasOpenFloatingLayer } from "@repo/timo-design-system/utils";
import FocusTrap from "focus-trap-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { ReactNode } from "react";

const EXIT_ANIMATION_DURATION = 200;

interface OverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExited?: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel: string;
}

export const OverlayModal = ({
  isOpen,
  onClose,
  onExited,
  children,
  className,
  ariaLabel,
}: OverlayModalProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasFloatingLayerOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);

      const hideTimer = setTimeout(() => {
        setShouldRender(false);
        onExited?.();
      }, EXIT_ANIMATION_DURATION);

      return () => clearTimeout(hideTimer);
    }

    setShouldRender(true);

    const showFrame = requestAnimationFrame(() => setIsVisible(true));

    return () => cancelAnimationFrame(showFrame);
  }, [isOpen, onExited]);

  useEffect(() => {
    if (!shouldRender) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (hasOpenFloatingLayer()) return;
      onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [shouldRender, onClose]);

  if (!shouldRender) return null;

  return createPortal(
    <>
      <div
        className={cn(
          "bg-timo-overlay fixed inset-0 z-40 transition-opacity duration-200 ease-out",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        onMouseDownCapture={() => {
          wasFloatingLayerOpenRef.current = hasOpenFloatingLayer();
        }}
        onClick={() => {
          if (wasFloatingLayerOpenRef.current) return;
          onClose();
        }}
        aria-hidden="true"
      />
      <FocusTrap
        active={shouldRender}
        focusTrapOptions={{
          escapeDeactivates: false,
          clickOutsideDeactivates: false,
          allowOutsideClick: true,
          fallbackFocus: () => dialogRef.current ?? document.body,
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          tabIndex={-1}
          className={cn(
            "fixed top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-[4px] bg-white transition-all duration-200 ease-out",
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
            className,
          )}
        >
          {children}
        </div>
      </FocusTrap>
    </>,
    document.body,
  );
};
