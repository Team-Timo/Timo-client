"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import {
  getGetTermsByConditionQueryKey,
  getTermsByCondition,
} from "@/api/generated/endpoints/terms/terms";
import { termsDetailSchema, type TermsType } from "@/types/terms-type";

const TERMS_LANGUAGE_MAP: Record<"ko" | "en", string> = {
  ko: "KO",
  en: "EN",
};

export const useTerms = (type: TermsType) => {
  const locale = useLocale() as "ko" | "en";
  const params = { type, language: TERMS_LANGUAGE_MAP[locale] };

  return useSuspenseQuery({
    queryKey: getGetTermsByConditionQueryKey(params),
    queryFn: ({ signal }) => getTermsByCondition(params, undefined, signal),
    select: ({ data }) => termsDetailSchema.nullable().parse(data),
  });
};
