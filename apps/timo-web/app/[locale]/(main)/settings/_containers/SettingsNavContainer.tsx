"use client";

import { cn } from "@repo/timo-design-system/utils";

import { ROUTES } from "@/constants/routes";
import { Link, usePathname } from "@/i18n/navigation";

const SETTINGS_NAV_ITEMS = [
  { label: "개인 정보", href: ROUTES.SETTINGS },
  { label: "약관", href: ROUTES.SETTINGS_POLICY },
  { label: "회원 탈퇴", href: ROUTES.SETTINGS_WITHDRAWAL },
];

export const SettingsNavContainer = () => {
  const pathname = usePathname();

  return (
    <nav className="border-timo-gray-500 flex w-37.5 shrink-0 flex-col gap-3 border-r bg-white px-2.5 pt-3.25">
      <Link
        href={ROUTES.SETTINGS}
        className="typo-headline-m-16 text-timo-gray-900 block px-2.5 py-1.5"
      >
        설정
      </Link>

      <ul className="flex flex-col gap-2">
        {SETTINGS_NAV_ITEMS.map((item) => {
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
