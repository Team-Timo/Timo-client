import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

import { ROUTES } from "@/constants/routes";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  redirect({ href: ROUTES.HOME, locale });
}
