import { cn } from "../../../lib";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariantTypes = "primary" | "secondary";
export type ButtonAppearanceTypes = "fill" | "outline";
export type ButtonSizeTypes = "m" | "lg";

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

const BUTTON_SIZE: Record<
  ButtonSizeTypes,
  { height: string; padding: { text: string; icon: string } }
> = {
  m: { height: "h-8.5", padding: { text: "px-4", icon: "px-2" } },
  lg: { height: "h-11.5", padding: { text: "px-12", icon: "px-12" } },
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariantTypes;
  appearance: ButtonAppearanceTypes;
  size: ButtonSizeTypes;
  icon?: ReactNode;
}

export const Button = ({
  variant,
  appearance,
  size,
  icon,
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "typo-headline-m-14 inline-flex items-center justify-center gap-0.5 rounded-[4px] whitespace-nowrap outline-hidden",
        "focus-visible:ring-timo-blue-300 focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        BUTTON_VARIANTS[variant][appearance],
        BUTTON_SIZE[size].height,
        BUTTON_SIZE[size].padding[icon ? "icon" : "text"],
        className,
      )}
      {...rest}
    >
      {icon && (
        <span className="flex size-5.5 shrink-0 items-center justify-center [&_:is(path,circle,rect)]:fill-current">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};
