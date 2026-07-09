"use client";

import {
  ChevronLeftIcon,
  ChevronSmallRightIcon,
  ChevronSmallRightWhiteIcon,
} from "@repo/timo-design-system/icons";
import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";

type ButtonTranslationKey = "button.next" | "button.prev" | "button.start";

const BUTTON_TRANSLATION_KEY: Record<
  "next" | "prev" | "start",
  ButtonTranslationKey
> = {
  next: "button.next",
  prev: "button.prev",
  start: "button.start",
};

export type OnboardingButtonProps =
  | {
      variant: "next";
      isActive: boolean;
      disabled?: boolean;
      onClick?: () => void;
    }
  | { variant: "prev"; onClick?: () => void }
  | { variant: "start"; onClick?: () => void };

export const OnboardingButton = (props: OnboardingButtonProps) => {
  const { variant, onClick } = props;
  const t = useTranslations("Onboarding");

  if (variant === "prev") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="hover:bg-timo-gray-500 bg-timo-gray-200 flex items-center justify-center gap-2 rounded-[4px] px-4 py-2 transition-colors duration-200 ease-in-out"
      >
        <ChevronLeftIcon width={18} height={18} />
        <span className="typo-headline-m-16 text-timo-gray-900">
          {t(BUTTON_TRANSLATION_KEY.prev)}
        </span>
      </button>
    );
  }

  if (variant === "start") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="bg-timo-blue-300 flex items-center justify-center gap-2 rounded-[4px] px-4 py-2"
      >
        <span className="typo-headline-m-16 text-white">
          {t(BUTTON_TRANSLATION_KEY.start)}
        </span>
      </button>
    );
  }

  const { isActive, disabled = false } = props;
  const isDisabled = disabled || !isActive;

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
      <span
        className={cn(
          "typo-headline-m-16",
          isActive ? "text-white" : "text-timo-gray-700",
        )}
      >
        {t(BUTTON_TRANSLATION_KEY.next)}
      </span>
      {isActive ? <ChevronSmallRightWhiteIcon /> : <ChevronSmallRightIcon />}
    </button>
  );
};
