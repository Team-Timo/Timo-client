import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import type { Metadata } from "next";

import { LoginContainer } from "@/app/[locale]/login/_containers/LoginContainer";
import { routing } from "@/i18n/routing";
import { GuestGuardProvider } from "@/providers/auth/GuestGuardProvider";

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Login" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/login`,
    },
  };
}

export default function LoginPage() {
  return (
    <GuestGuardProvider>
      <LoginContainer />
    </GuestGuardProvider>
  );
}
