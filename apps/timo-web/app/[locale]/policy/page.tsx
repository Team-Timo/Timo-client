import { LogoTimoIcon } from "@repo/timo-design-system/icons";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import type { Metadata } from "next";

import { PolicyContainer } from "@/app/[locale]/policy/_containers/PolicyContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";
import { ROUTES } from "@/constants/routes";
import { routing } from "@/i18n/routing";

interface PolicyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PolicyPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Settings" });

  return {
    title: t("nav.policy"),
    alternates: {
      canonical: `/${locale}/policy`,
    },
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { locale } = await params;

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-12.5 bg-white">
      <header className="flex w-full items-center justify-between px-37 py-6.75">
        <a href={`/${locale}${ROUTES.LOGIN}`} aria-label="Timo">
          <LogoTimoIcon width={92} height={35} />
        </a>
      </header>

      <article className="flex w-full justify-center px-8 pb-20">
        <AsyncBoundary>
          <PolicyContainer />
        </AsyncBoundary>
      </article>
    </main>
  );
}
