"use client";

import { useTranslations } from "next-intl";

import type { TermsType } from "@/schemas/settings/terms-schema";

import { PolicyDocument } from "@/components/policy/PolicyDocument";
import { useTermsQuery } from "@/queries/settings/use-terms-query";

export interface PolicyContainerProps {
  type: TermsType;
}

export const PolicyContainer = ({ type }: PolicyContainerProps) => {
  const t = useTranslations("Policy");
  const { data: term } = useTermsQuery(type);

  if (!term) {
    return <p className="typo-body-m-12 text-timo-gray-700">{t("empty")}</p>;
  }

  return <PolicyDocument title={term.title} content={term.content} />;
};
