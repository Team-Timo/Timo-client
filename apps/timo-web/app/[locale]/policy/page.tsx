import { LogoTimoIcon } from "@repo/timo-design-system/icons";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import type { Metadata } from "next";

import { PolicyContainer } from "@/app/[locale]/policy/_containers/PolicyContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { termsTypeSchema } from "@/schemas/settings/terms-schema";

interface PolicyPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PolicyPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const { type } = await searchParams;
  const parsedType = termsTypeSchema.safeParse(type);
  const isPrivacy = parsedType.success && parsedType.data === "PRIVACY";

  const t = await getTranslations({ locale, namespace: "Settings" });

  return {
    title: isPrivacy ? t("nav.privacy") : t("nav.policy"),
    alternates: {
      canonical: `/${locale}/policy`,
    },
  };
}

export default async function PolicyPage({ searchParams }: PolicyPageProps) {
  const { type } = await searchParams;
  const parsedType = termsTypeSchema.safeParse(type);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-12.5 bg-white">
      <div className="flex w-full items-center justify-between px-37 py-6.75">
        <Link href={ROUTES.LOGIN} aria-label="Timo">
          <LogoTimoIcon width={92} height={35} />
        </Link>
      </div>

      <div className="flex w-full justify-center px-8 pb-20">
        <AsyncBoundary>
          <PolicyContainer
            type={parsedType.success ? parsedType.data : "SERVICE"}
          />
        </AsyncBoundary>
      </div>
    </div>
  );
}
