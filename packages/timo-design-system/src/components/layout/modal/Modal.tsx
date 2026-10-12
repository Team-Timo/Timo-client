"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

import {
  acquireModalStackIndex,
  cn,
  hasOpenFloatingLayer,
  releaseModalStackIndex,
} from "../../../lib";
import { Button } from "../../button/button/Button";

// tailwind-config theme.css의 --z-index-modal-overlay/--z-index-modal-panel과 동일한 기준값이다.
const BASE_OVERLAY_Z_INDEX = 40;
const BASE_PANEL_Z_INDEX = 50;
// 중첩된 모달의 오버레이가 그 아래 모달의 패널(z=50)보다 항상 높도록, 한 단계당 overlay/panel 차이(10)보다 큰 폭으로 올린다.
const MODAL_STACK_Z_INDEX_STEP = 20;

interface ModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  titleId: string;
  panelRef: RefObject<HTMLDivElement | null>;
  overlayZIndex: number;
  panelZIndex: number;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = (): ModalContextValue => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "Modal 서브 컴포넌트는 Modal 내부에서만 사용할 수 있습니다.",
    );
  }

  return context;
};

export interface ModalProps {
  children?: ReactNode;
  className?: string;
}

const ModalRoot = ({ children, className }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stackIndex, setStackIndex] = useState(0);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (hasOpenFloatingLayer()) return;
      setIsOpen(false);
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return;
      if (hasOpenFloatingLayer()) return;
      setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // 모달이 닫히거나(어떤 경로로 닫히든) 언마운트될 때 스택 인덱스를 반납한다.
  useEffect(() => {
    if (!isOpen) return;

    return () => releaseModalStackIndex();
  }, [isOpen]);

  const open = () => {
    if (isOpen) return;
    setStackIndex(acquireModalStackIndex());
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  const overlayZIndex =
    BASE_OVERLAY_Z_INDEX + stackIndex * MODAL_STACK_Z_INDEX_STEP;
  const panelZIndex =
    BASE_PANEL_Z_INDEX + stackIndex * MODAL_STACK_Z_INDEX_STEP;

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        open,
        close,
        titleId,
        panelRef,
        overlayZIndex,
        panelZIndex,
      }}
    >
      <div className={className}>{children}</div>
    </ModalContext.Provider>
  );
};

export type ModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>;
};

const ModalTrigger = ({ onClick, ref, ...rest }: ModalTriggerProps) => {
  const { open } = useModalContext();

  return (
    <button
      type="button"
      ref={ref}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        open();
      }}
    />
  );
};

export interface ModalOverlayProps {
  className?: string;
}

const ModalOverlay = ({ className }: ModalOverlayProps) => {
  const { isOpen, overlayZIndex } = useModalContext();

  if (!isOpen) return null;

  return createPortal(
    <div
      className={cn("bg-timo-overlay fixed inset-0", className)}
      style={{ zIndex: overlayZIndex }}
      aria-hidden="true"
    />,
    document.body,
  );
};

export interface ModalPanelProps {
  children: ReactNode;
  className?: string;
}

const ModalPanel = ({ children, className }: ModalPanelProps) => {
  const { isOpen, titleId, panelRef, panelZIndex } = useModalContext();

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      style={{ zIndex: panelZIndex }}
      className={cn(
        "fixed top-1/2 left-1/2 flex w-100 max-w-[calc(100vw-0.5rem)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-[4px] bg-white p-4.5 md:max-w-none md:p-5.5",
        className,
      )}
    >
      {children}
    </div>,
    document.body,
  );
};

export interface ModalIconProps {
  children: ReactNode;
  className?: string;
}

const ModalIcon = ({ children, className }: ModalIconProps) => (
  <div className={cn("mb-4 size-10 shrink-0", className)}>{children}</div>
);

export interface ModalTitleProps {
  children: ReactNode;
  className?: string;
}

const ModalTitle = ({ children, className }: ModalTitleProps) => {
  const { titleId } = useModalContext();

  return (
    <p
      id={titleId}
      className={cn("typo-headline-b-18 text-timo-black", className)}
    >
      {children}
    </p>
  );
};

export interface ModalDescriptionProps {
  children: ReactNode;
  className?: string;
}

const ModalDescription = ({ children, className }: ModalDescriptionProps) => (
  <p className={cn("typo-headline-r-14 text-timo-gray-900 mt-1", className)}>
    {children}
  </p>
);

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

const ModalFooter = ({ children, className }: ModalFooterProps) => (
  <div className={cn("mt-6 flex w-full gap-3", className)}>{children}</div>
);

export type ModalBorderButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ModalBorderButton = ({
  onClick,
  className,
  children,
  ...rest
}: ModalBorderButtonProps) => {
  const { close } = useModalContext();

  return (
    <Button
      variant="secondary"
      appearance="outline"
      size="lg"
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        close();
      }}
      className={cn("flex-1", className)}
    >
      {children}
    </Button>
  );
};

export type ModalFillButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ModalFillButton = ({
  onClick,
  className,
  children,
  ...rest
}: ModalFillButtonProps) => {
  const { close } = useModalContext();

  return (
    <Button
      variant="primary"
      appearance="fill"
      size="lg"
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        close();
      }}
      className={cn("flex-1", className)}
    >
      {children}
    </Button>
  );
};

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Overlay: ModalOverlay,
  Panel: ModalPanel,
  Icon: ModalIcon,
  Title: ModalTitle,
  Description: ModalDescription,
  Footer: ModalFooter,
  BorderButton: ModalBorderButton,
  FillButton: ModalFillButton,
});
