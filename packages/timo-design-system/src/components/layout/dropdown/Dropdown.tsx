"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";

import {
  cn,
  registerOpenFloatingLayer,
  unregisterOpenFloatingLayer,
} from "../../../lib";

interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdownContext = (): DropdownContextValue => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      "Dropdown.Trigger, Dropdown.Panel은 Dropdown 내부에서만 사용할 수 있습니다.",
    );
  }

  return context;
};

export interface DropdownProps {
  children: ReactNode;
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

const DropdownRoot = ({ children, className, onOpenChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    registerOpenFloatingLayer();

    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKeydown);

    return () => {
      unregisterOpenFloatingLayer();
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKeydown);
    };
  }, [isOpen]);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onOpenChange?.(next);
  };
  const close = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, triggerRef }}>
      <div ref={rootRef} className={cn("relative inline-block", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export type DropdownTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownTrigger = ({
  className,
  onClick,
  ...rest
}: DropdownTriggerProps) => {
  const { isOpen, toggle, triggerRef } = useDropdownContext();

  return (
    <button
      type="button"
      {...rest}
      ref={triggerRef}
      onClick={(e) => {
        onClick?.(e);
        toggle();
      }}
      aria-expanded={isOpen}
      className={className}
    />
  );
};

export type DropdownPanelProps = HTMLAttributes<HTMLDivElement>;

const DropdownPanel = ({
  children,
  className,
  ...rest
}: DropdownPanelProps) => {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;

  return (
    <div
      {...rest}
      className={cn(
        "rounded-4 absolute top-full left-0 z-10 flex flex-col items-start bg-white p-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  closeOnSelect?: boolean;
}

const DropdownItem = ({
  className,
  onClick,
  closeOnSelect = true,
  ...rest
}: DropdownItemProps) => {
  const { close } = useDropdownContext();

  return (
    <button
      type="button"
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (closeOnSelect) close();
      }}
      className={cn(
        "rounded-4 flex w-full items-center transition-colors duration-200 ease-in-out",
        className,
      )}
    />
  );
};

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Panel: DropdownPanel,
  Item: DropdownItem,
});
