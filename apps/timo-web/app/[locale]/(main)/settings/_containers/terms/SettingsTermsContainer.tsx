"use client";

import { useTranslations } from "next-intl";

import type { TermsType } from "@/schemas/settings/terms-schema";

import { PolicyDocument } from "@/components/policy/PolicyDocument";
import { useTermsQuery } from "@/queries/settings/use-terms-query";

export interface SettingsTermsContainerProps {
  type: TermsType;
}

export const SettingsTermsContainer = ({
  type,
}: SettingsTermsContainerProps) => {
  const t = useTranslations("Policy");
  const { data: term } = useTermsQuery(type);

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
