"use client";

import { useTranslations } from "next-intl";

import type { TermsType } from "@/types/terms-type";

import { PolicyDocument } from "@/components/policy/PolicyDocument";
import { useTerms } from "@/queries/use-terms";

export interface PolicyContainerProps {
  type: TermsType;
}

export const PolicyContainer = ({ type }: PolicyContainerProps) => {
  const t = useTranslations("Policy");
  const { data: terms } = useTerms(type);
  const term = terms.find((item) => item.type === type);

  if (!term) {
    return <p className="typo-body-m-12 text-timo-gray-700">{t("empty")}</p>;
  }

  return <PolicyDocument title={term.title} content={term.content} />;
};
