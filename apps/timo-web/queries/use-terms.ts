"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  getGetTermsQueryKey,
  getTerms,
} from "@/api/generated/endpoints/terms/terms";
import { termsListSchema, type TermsType } from "@/types/terms-type";

export const useTerms = (type?: TermsType) => {
  const params = type ? { type } : undefined;

  return useSuspenseQuery({
    queryKey: getGetTermsQueryKey(params),
    queryFn: ({ signal }) => getTerms(params, undefined, signal),
    select: ({ data }) => termsListSchema.parse(data).terms,
  });
};
