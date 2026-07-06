"use client";

import { ModalButton } from "@components/button/modal-button/ModalButton";
import { cn } from "@lib";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

interface ModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  titleId: string;
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
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, open, close, titleId }}>
      <div className={className}>{children}</div>
    </ModalContext.Provider>
  );
};

export type ModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ModalTrigger = ({ onClick, ...rest }: ModalTriggerProps) => {
  const { open } = useModalContext();

  return (
    <button
      type="button"
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
  const { isOpen, close } = useModalContext();

  if (!isOpen) return null;

  return (
    <div
      className={cn("bg-timo-overlay fixed inset-0 z-40", className)}
      onClick={close}
      aria-hidden="true"
    />
  );
};

export interface ModalPanelProps {
  children: ReactNode;
  className?: string;
}

const ModalPanel = ({ children, className }: ModalPanelProps) => {
  const { isOpen, titleId } = useModalContext();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        "fixed top-1/2 left-1/2 z-50 flex w-100 -translate-x-1/2 -translate-y-1/2 flex-col rounded-[4px] bg-white p-5.5",
        className,
      )}
    >
      {children}
    </div>
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
  ...rest
}: ModalBorderButtonProps) => {
  const { close } = useModalContext();

  return (
    <ModalButton
      variant="border"
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        close();
      }}
      className={cn("flex-1 px-0", className)}
    />
  );
};

export type ModalFillButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ModalFillButton = ({ className, ...rest }: ModalFillButtonProps) => (
  <ModalButton
    variant="fill"
    {...rest}
    className={cn("flex-1 px-0", className)}
  />
);

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
