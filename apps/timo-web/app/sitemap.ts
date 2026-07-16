import type { MetadataRoute } from "next";

import { ROUTES } from "@/constants/routes";
import { SITE_URL } from "@/constants/site";
import { routing } from "@/i18n/routing";

const PUBLIC_ROUTES = ["", ROUTES.LOGIN, ROUTES.POLICY] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}/${routing.defaultLocale}${route}`,
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${SITE_URL}/${locale}${route}`,
        ]),
      ),
    },
  }));
}
