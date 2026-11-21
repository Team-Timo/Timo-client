"use client";

import { useTranslations } from "next-intl";

import type { AuthButtonVariant } from "@/components/auth/AuthButton";

import { AuthButton } from "@/components/auth/AuthButton";

interface AuthButtonContainerProps {
  variant: AuthButtonVariant;
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const AuthButtonContainer = ({
  variant,
  isSelected,
  disabled,
  onClick,
}: AuthButtonContainerProps) => {
  const t = useTranslations("Common.authButton");

  return (
    <AuthButton
      variant={variant}
      label={t(
        variant === "appleCalendar" && isSelected
          ? "appleCalendarConnected"
          : variant,
      )}
      isSelected={isSelected}
      disabled={disabled}
      onClick={onClick}
    />
  );
};
