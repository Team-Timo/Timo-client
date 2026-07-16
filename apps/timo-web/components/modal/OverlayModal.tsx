"use client";

import {
  acquireModalStackIndex,
  cn,
  hasOpenFloatingLayer,
} from "@repo/timo-design-system/utils";
import FocusTrap from "focus-trap-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { ReactNode } from "react";

const EXIT_ANIMATION_DURATION = 200;
// tailwind-config theme.css의 --z-index-modal-overlay/--z-index-modal-panel과 동일한 기준값이다.
const BASE_OVERLAY_Z_INDEX = 40;
const BASE_PANEL_Z_INDEX = 50;
// 중첩된 모달의 오버레이가 그 아래 모달의 패널(z=50)보다 항상 높도록, 한 단계당 overlay/panel 차이(10)보다 큰 폭으로 올린다.
const MODAL_STACK_Z_INDEX_STEP = 20;

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
  const [stackIndex, setStackIndex] = useState(0);
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

    setStackIndex(acquireModalStackIndex());
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

  const overlayZIndex =
    BASE_OVERLAY_Z_INDEX + stackIndex * MODAL_STACK_Z_INDEX_STEP;
  const panelZIndex =
    BASE_PANEL_Z_INDEX + stackIndex * MODAL_STACK_Z_INDEX_STEP;

  return createPortal(
    <>
      <div
        className={cn(
          "bg-timo-overlay fixed inset-0 transition-opacity duration-200 ease-out",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        style={{ zIndex: overlayZIndex }}
        onPointerDownCapture={() => {
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
          style={{ zIndex: panelZIndex }}
          className={cn(
            "fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-[4px] bg-white transition-all duration-200 ease-out",
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
