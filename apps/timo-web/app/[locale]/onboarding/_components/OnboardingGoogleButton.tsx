"use client";

import googleLogo from "@repo/timo-design-system/assets/images/google-logo.svg";
import { cn } from "@repo/timo-design-system/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";

export type OnboardingGoogleButtonVariant = "login" | "connectCalendar";

export interface OnboardingGoogleButtonProps {
  variant: OnboardingGoogleButtonVariant;
  isSelected?: boolean;
  onClick?: () => void;
}

export const OnboardingGoogleButton = ({
  variant,
  isSelected = false,
  onClick,
}: OnboardingGoogleButtonProps) => {
  const t = useTranslations("Onboarding");

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-[305px] items-center justify-center rounded-[4px] border py-2.5",
        isSelected
          ? "border-timo-blue-300 bg-timo-blue-50"
          : "border-timo-gray-500 bg-white",
      )}
    >
      <div className="flex items-center gap-2.5 px-2">
        <div className="flex size-[22px] items-center justify-center">
          <Image src={googleLogo} alt="Google" width={18} height={18} />
        </div>
        <span className="typo-headline-m-16 text-timo-blue-300">
          {t(`onboardingGoogleButton.${variant}`)}
        </span>
      </div>
    </button>
  );
};
