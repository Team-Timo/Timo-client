"use client";

import { useTranslations } from "next-intl";

import type { AuthButtonVariant } from "@/components/auth/AuthButton";

import { AuthButton } from "@/components/auth/AuthButton";

interface AuthButtonContainerProps {
  variant: AuthButtonVariant;
  isSelected?: boolean;
  onClick?: () => void;
}

export const AuthButtonContainer = ({
  variant,
  isSelected,
  onClick,
}: AuthButtonContainerProps) => {
  const t = useTranslations("Common.authButton");

  return (
    <AuthButton
      variant={variant}
      label={t(variant)}
      isSelected={isSelected}
      onClick={onClick}
    />
  );
};
