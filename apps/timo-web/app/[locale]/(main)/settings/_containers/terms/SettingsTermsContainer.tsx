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
    <div className="px-5 pt-5 pb-8 md:px-15 md:pt-7.5 md:pb-12.5">
      {term ? (
        <PolicyDocument title={term.title} content={term.content} />
      ) : (
        <p className="typo-body-m-12 text-timo-gray-700">{t("empty")}</p>
      )}
    </div>
  );
};
