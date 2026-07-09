"use client";

import {
  ChevronSmallLeftIcon,
  ChevronSmallRightIcon,
  ChevronSmallRightWhiteIcon,
} from "@repo/timo-design-system/icons";
import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";

export type OnboardingButtonVariant =
  | "next"
  | "next_active"
  | "prev"
  | "start"
  | "start_inactive";

export interface OnboardingButtonProps {
  variant: OnboardingButtonVariant;
  onClick?: () => void;
}

type ButtonTranslationKey = "button.next" | "button.prev" | "button.start";

const BUTTON_TRANSLATION_KEY: Record<
  OnboardingButtonVariant,
  ButtonTranslationKey
> = {
  next: "button.next",
  next_active: "button.next",
  prev: "button.prev",
  start: "button.start",
  start_inactive: "button.start",
};

export const OnboardingButton = ({
  variant,
  onClick,
}: OnboardingButtonProps) => {
  const t = useTranslations("Onboarding");
  const isActive = variant === "next_active" || variant === "start";
  const isDisabled = variant === "next" || variant === "start_inactive";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "flex items-center justify-center gap-2 rounded-[4px] px-4 py-2",
        isActive ? "bg-timo-blue-300" : "bg-timo-gray-200",
      )}
    >
      {variant === "prev" && <ChevronSmallLeftIcon />}
      <span
        className={cn(
          "typo-headline-m-16",
          isActive ? "text-white" : "text-timo-gray-700",
        )}
      >
        {t(BUTTON_TRANSLATION_KEY[variant])}
      </span>
      {variant === "next" && <ChevronSmallRightIcon />}
      {variant === "next_active" && <ChevronSmallRightWhiteIcon />}
    </button>
  );
};
