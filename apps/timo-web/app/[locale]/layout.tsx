import "./globals.css";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Metadata } from "next";

import { SITE_URL } from "@/constants/site";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/providers/auth/AuthProvider";
import { LanguageSyncProvider } from "@/providers/locale/LanguageSyncProvider";
import { OverlayProvider } from "@/providers/overlay/OverlayProvider";
import { QueryProvider } from "@/providers/query/QueryProvider";

const pretendard = localFont({
  src: "../../fonts/PretendardVariable.woff2",
  variable: "--font-family-pretendard",
  weight: "45 920",
  display: "swap",
});

const OG_LOCALE: Record<(typeof routing.locales)[number], string> = {
  en: "en_US",
  ko: "ko_KR",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<RootLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
      type: "website",
      siteName: title,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales
        .filter((otherLocale) => otherLocale !== locale)
        .map((otherLocale) => OG_LOCALE[otherLocale]),
      images: [
        {
          url: "/og.png",
          width: 4800,
          height: 2520,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={pretendard.variable}>
      <body>
        <NextIntlClientProvider>
          <QueryProvider>
            <AuthProvider>
              <LanguageSyncProvider>
                <OverlayProvider>{children}</OverlayProvider>
              </LanguageSyncProvider>
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
