"use client";

import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";

import { ROUTES } from "@/constants/routes";
import { Link, usePathname } from "@/i18n/navigation";

export const SettingsNavContainer = () => {
  const t = useTranslations("Navigation");
  const tSettings = useTranslations("Settings");
  const pathname = usePathname();

  const settingsNavItems = [
    { label: tSettings("nav.account"), href: ROUTES.SETTINGS },
    { label: tSettings("nav.policy"), href: ROUTES.SETTINGS_POLICY },
    { label: tSettings("nav.withdrawal"), href: ROUTES.SETTINGS_WITHDRAWAL },
  ];

  return (
    <nav className="border-timo-gray-500 flex w-37.5 shrink-0 flex-col gap-3 border-r bg-white px-2.5 pt-3.25">
      <Link
        href={ROUTES.SETTINGS}
        className="typo-headline-m-16 text-timo-gray-900 block px-2.5 py-1.5"
      >
        {t("settings")}
      </Link>

      <ul className="flex flex-col gap-2">
        {settingsNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "typo-headline-m-14 block rounded-[4px] px-2.5 py-1",
                  isActive
                    ? "bg-timo-blue-65 text-timo-blue-300"
                    : "text-timo-gray-900",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
