"use client";

import { cn } from "@repo/timo-design-system/utils";
import { useTranslations } from "next-intl";

import type { SettingsTab } from "@/app/[locale]/(main)/settings/_hooks/useSettingsTab";

import { useSettingsTab } from "@/app/[locale]/(main)/settings/_hooks/useSettingsTab";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

const getSettingsTabHref = (tab: SettingsTab) =>
  tab === "account" ? ROUTES.SETTINGS : `${ROUTES.SETTINGS}?tab=${tab}`;

export const SettingsNavContainer = () => {
  const t = useTranslations("Navigation");
  const tSettings = useTranslations("Settings");
  const activeTab = useSettingsTab();

  const settingsNavItems = [
    { label: tSettings("nav.account"), tab: "account" as const },
    { label: tSettings("nav.policy"), tab: "policy" as const },
    { label: tSettings("nav.privacy"), tab: "privacy" as const },
    { label: tSettings("nav.withdrawal"), tab: "withdrawal" as const },
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
          const isActive = activeTab === item.tab;

          return (
            <li key={item.tab}>
              <Link
                href={getSettingsTabHref(item.tab)}
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
