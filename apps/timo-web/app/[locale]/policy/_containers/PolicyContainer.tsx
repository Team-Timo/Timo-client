"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { PolicyDocument } from "@/components/policy/PolicyDocument";
import { useTermsQuery } from "@/queries/settings/use-terms-query";
import { termsTypeSchema } from "@/schemas/settings/terms-schema";

export const PolicyContainer = () => {
  const t = useTranslations("Policy");
  const searchParams = useSearchParams();
  const parsedType = termsTypeSchema.safeParse(searchParams.get("type"));
  const type = parsedType.success ? parsedType.data : "SERVICE";

  const { data: term } = useTermsQuery(type);

  if (!term) {
    return <p className="typo-body-m-12 text-timo-gray-700">{t("empty")}</p>;
  }

  return <PolicyDocument title={term.title} content={term.content} />;
};
