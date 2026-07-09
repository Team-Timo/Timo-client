"use client";

import * as Sentry from "@sentry/nextjs";
import localFont from "next/font/local";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { StatusScreen } from "@/components/status-screen/StatusScreen";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import enMessages from "@/messages/en.json";
import koMessages from "@/messages/ko.json";

import "./[locale]/globals.css";

type Locale = (typeof routing.locales)[number];

const messagesByLocale: Record<Locale, typeof enMessages> = {
  en: enMessages,
  ko: koMessages,
};

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-family-pretendard",
  weight: "45 920",
  display: "swap",
});

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function getLocaleFromPathname(): Locale {
  const segment = window.location.pathname.split("/")[1];
  return routing.locales.includes(segment as Locale)
    ? (segment as Locale)
    : routing.defaultLocale;
}

function GlobalErrorContent() {
  const t = useTranslations("GlobalError");

  return (
    <StatusScreen
      lottieSrc="/lottie/error.json"
      title={t("title")}
      description={t("description")}
      action={
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="typo-headline-m-16 rounded-[8px] border border-gray-500 px-4 py-2.5 text-gray-900"
          >
            {t("homeButton")}
          </Link>
        </div>
      }
    />
  );
}

export default function GlobalError({ error }: GlobalErrorProps) {
  const [locale, setLocale] = useState<Locale>(routing.defaultLocale);

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  useEffect(() => {
    setLocale(getLocaleFromPathname());
  }, []);

  return (
    <html lang={locale} className={pretendard.variable}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messagesByLocale[locale]}
        >
          <GlobalErrorContent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
