"use client";

import { useTranslations } from "next-intl";

import { OnboardingButton } from "@/app/[locale]/onboarding/_components/OnboardingButton";

interface OnboardingButtonContainerProps {
  variant: "next" | "prev" | "start";
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const OnboardingButtonContainer = ({
  variant,
  isActive,
  disabled,
  onClick,
}: OnboardingButtonContainerProps) => {
  const t = useTranslations("Onboarding");

  return (
    <OnboardingButton
      variant={variant}
      label={t(`button.${variant}`)}
      isActive={isActive}
      disabled={disabled}
      onClick={onClick}
    />
  );
};
