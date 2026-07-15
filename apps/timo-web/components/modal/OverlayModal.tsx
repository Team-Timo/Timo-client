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
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/*
            배경 클릭으로 모달을 닫는 영역이다. 포인터 전용 UX이며 키보드
            사용자는 이미 Escape로 동일하게 닫을 수 있어(위 handleEscape),
            여기서는 jsx-a11y의 인터랙션 규칙을 의도적으로 예외 처리한다.
          */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            className="flex min-h-full items-center justify-center py-8"
            onPointerDownCapture={() => {
              wasFloatingLayerOpenRef.current = hasOpenFloatingLayer();
            }}
            onClick={(event) => {
              if (event.target !== event.currentTarget) return;
              if (wasFloatingLayerOpenRef.current) return;
              onClose();
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              tabIndex={-1}
              className={cn(
                "flex flex-col rounded-[4px] bg-white transition-all duration-200 ease-out",
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
                className,
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </FocusTrap>
    </>,
    document.body,
  );
};
