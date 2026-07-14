"use client";

import { useTranslations } from "next-intl";

import type { TermsType } from "@/types/terms-type";

import { PolicyDocument } from "@/components/policy/PolicyDocument";
import { useTerms } from "@/queries/use-terms";

export interface SettingsTermsContainerProps {
  type: TermsType;
}

export const SettingsTermsContainer = ({
  type,
}: SettingsTermsContainerProps) => {
  const t = useTranslations("Policy");
  const { data: terms } = useTerms(type);
  const term = terms[0];

  return (
    <div className="px-15 pt-7.5">
      {term ? (
        <PolicyDocument title={term.title} content={term.content} />
      ) : (
        <p className="typo-body-m-12 text-timo-gray-700">{t("empty")}</p>
      )}
    </div>
  );
};
