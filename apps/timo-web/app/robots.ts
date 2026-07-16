import type { MetadataRoute } from "next";

import { ROUTES } from "@/constants/routes";
import { SITE_URL } from "@/constants/site";
import { routing } from "@/i18n/routing";

const PRIVATE_ROUTES = [
  ROUTES.ONBOARDING,
  ROUTES.HOME,
  ROUTES.TODAY,
  ROUTES.FOCUS,
  ROUTES.STATISTICS,
  ROUTES.SETTINGS,
] as const;

const disallow = routing.locales.flatMap((locale) => [
  ...PRIVATE_ROUTES.map((route) => `/${locale}${route}`),
  `/${locale}/oauth`,
]);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
