"use client";

import { useTranslations } from "next-intl";

import { OnboardingGoogleButton } from "@/app/[locale]/onboarding/_components/OnboardingGoogleButton";

interface OnboardingGoogleButtonContainerProps {
  variant: "login" | "connectCalendar";
  isSelected?: boolean;
  onClick?: () => void;
}

export const OnboardingGoogleButtonContainer = ({
  variant,
  isSelected,
  onClick,
}: OnboardingGoogleButtonContainerProps) => {
  const t = useTranslations("Onboarding");

  return (
    <OnboardingGoogleButton
      variant={variant}
      label={t(`onboardingGoogleButton.${variant}`)}
      isSelected={isSelected}
      onClick={onClick}
    />
  );
};
