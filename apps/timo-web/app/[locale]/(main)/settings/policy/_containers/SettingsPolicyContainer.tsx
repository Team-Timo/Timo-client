"use client";

import { useTranslations } from "next-intl";

import { useTerms } from "@/queries/use-terms";

export const SettingsPolicyContainer = () => {
  const tSettings = useTranslations("Settings");
  const tPolicy = useTranslations("Policy");
  const { data: terms } = useTerms();

  return (
    <div className="flex flex-col gap-5 px-15 pt-7.5">
      <h1 className="typo-headline-m-16 text-timo-gray-900">
        {tSettings("nav.policy")}
      </h1>
      <hr className="border-timo-gray-500" />

      {terms.length === 0 ? (
        <p className="typo-body-m-12 text-timo-gray-700">{tPolicy("empty")}</p>
      ) : (
        <div className="flex flex-col gap-10">
          {terms.map((term) => (
            <section key={term.termsId} className="flex flex-col gap-3">
              <h2 className="typo-headline-b-16 text-timo-gray-900">
                {term.title}
              </h2>
              <p className="typo-body-m-12 text-timo-gray-700 whitespace-pre-wrap">
                {term.content}
              </p>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};
