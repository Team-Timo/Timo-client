import { cn } from "../../../lib";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariantTypes = "primary" | "secondary";
type ButtonAppearanceTypes = "fill" | "outline";
type ButtonSizeTypes = "m" | "lg";
type ButtonIconPositionTypes = "left" | "right";

const BUTTON_VARIANTS: Record<
  ButtonVariantTypes,
  Record<ButtonAppearanceTypes, string>
> = {
  primary: {
    fill: "bg-timo-blue-300 text-white disabled:bg-timo-blue-65",
    outline:
      "border-timo-blue-300 text-timo-blue-300 border bg-white disabled:border-timo-gray-500 disabled:text-timo-gray-700",
  },
  secondary: {
    fill: "bg-timo-gray-300 text-timo-gray-900 disabled:text-timo-gray-700",
    outline:
      "border-timo-gray-500 text-timo-gray-900 border bg-white disabled:text-timo-gray-700",
  },
};

const BUTTON_SIZE: Record<ButtonSizeTypes, string> = {
  m: "h-8.5",
  lg: "h-11.5",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariantTypes;
  appearance: ButtonAppearanceTypes;
  size: ButtonSizeTypes;
  icon?: ReactNode;
  iconPosition?: ButtonIconPositionTypes;
  children: ReactNode;
}

export const Button = ({
  variant,
  appearance,
  size,
  icon,
  iconPosition = "left",
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) => {
  const iconElement = icon ? (
    <span
      aria-hidden="true"
      className="flex size-5.5 shrink-0 items-center justify-center"
    >
      {icon}
    </span>
  ) : null;

  return (
    <button
      type={type}
      className={cn(
        "typo-headline-m-14 flex w-full items-center justify-center gap-0.5 rounded-[4px] whitespace-nowrap outline-hidden",
        "focus-visible:ring-timo-blue-300 focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        BUTTON_VARIANTS[variant][appearance],
        BUTTON_SIZE[size],
        className,
      )}
      {...rest}
    >
      {iconPosition === "left" && iconElement}
      {children}
      {iconPosition === "right" && iconElement}
    </button>
  );
};
