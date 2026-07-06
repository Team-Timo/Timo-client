import { cn } from "@lib";

import type { ButtonHTMLAttributes } from "react";

export type ModalButtonVariantTypes = "fill" | "border";

const MODAL_BUTTON_VARIANT: Record<ModalButtonVariantTypes, string> = {
  fill: "bg-timo-blue-300 text-white",
  border: "border border-timo-gray-500 text-timo-black",
};

export interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ModalButtonVariantTypes;
}

export const ModalButton = ({
  variant,
  className,
  children,
  ...rest
}: ModalButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "typo-headline-r-14 flex items-center justify-center rounded-[4px] px-15.5 py-[11px]",
        MODAL_BUTTON_VARIANT[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
