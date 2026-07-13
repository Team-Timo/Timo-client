"use client";

import { useTranslations } from "next-intl";

import { PolicyDocument } from "@/components/policy/PolicyDocument";
import { useTerms } from "@/queries/use-terms";

export const SettingsPrivacyContainer = () => {
  const t = useTranslations("Policy");
  const { data: terms } = useTerms("PRIVACY");
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
