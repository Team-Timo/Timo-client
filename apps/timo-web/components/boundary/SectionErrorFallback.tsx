"use client";

import { useTranslations } from "next-intl";

interface SectionErrorFallbackProps {
  reset: () => void;
}

export const SectionErrorFallback = ({ reset }: SectionErrorFallbackProps) => {
  const t = useTranslations("Error");

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <p className="typo-body-r-12 text-timo-gray-700">
        {t("sectionDescription")}
      </p>
      <button
        type="button"
        onClick={reset}
        className="typo-headline-m-14 border-timo-gray-500 text-timo-gray-900 rounded-[8px] border px-4 py-2"
      >
        {t("retryButton")}
      </button>
    </div>
  );
};
