"use client";

import timoTextLogo from "@repo/timo-design-system/assets/images/logo/timo-text-logo.svg";
import {
  ChartHoverIcon,
  ChartOffIcon,
  ChartOnIcon,
  HomeHoverIcon,
  HomeOffIcon,
  HomeOnIcon,
  SettingHoverIcon,
  SettingOffIcon,
  SettingOnIcon,
  TimerHoverIcon,
  TimerOffIcon,
  TimerOnIcon,
  TodayHoverIcon,
  TodayOffIcon,
  TodayOnIcon,
} from "@repo/timo-design-system/icons";
import { TabButton } from "@repo/timo-design-system/ui";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ROUTES } from "@/constants/routes";
import { Link, usePathname } from "@/i18n/navigation";

const NAV_ITEMS = [
  {
    href: ROUTES.HOME,
    labelKey: "home",
    OnIcon: HomeOnIcon,
    OffIcon: HomeOffIcon,
    HoverIcon: HomeHoverIcon,
    className: undefined,
  },
  {
    href: ROUTES.TODAY,
    labelKey: "today",
    OnIcon: TodayOnIcon,
    OffIcon: TodayOffIcon,
    HoverIcon: TodayHoverIcon,
    className: undefined,
  },
  {
    href: ROUTES.FOCUS,
    labelKey: "focus",
    OnIcon: TimerOnIcon,
    OffIcon: TimerOffIcon,
    HoverIcon: TimerHoverIcon,
    className: undefined,
  },
  {
    href: ROUTES.STATISTICS,
    labelKey: "statistics",
    OnIcon: ChartOnIcon,
    OffIcon: ChartOffIcon,
    HoverIcon: ChartHoverIcon,
    className: undefined,
  },
  {
    href: ROUTES.SETTINGS,
    labelKey: "settings",
    OnIcon: SettingOnIcon,
    OffIcon: SettingOffIcon,
    HoverIcon: SettingHoverIcon,
    className: "mt-auto",
  },
] as const;

export const NavigationSidebar = () => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const isActivePath = (pathname: string, href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="bg-timo-gray-300 flex h-screen w-55 flex-col items-start p-5">
      <div className="flex flex-col gap-7.5">
        <Image src={timoTextLogo} alt="Timo" width={92} height={35} />
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map(
            ({ href, labelKey, OnIcon, OffIcon, HoverIcon, className }) => {
              const isSelected = isActivePath(pathname, href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={className}
                  aria-current={isSelected ? "page" : undefined}
                >
                  <TabButton
                    label={t(labelKey)}
                    icon={
                      isSelected ? (
                        <OnIcon width={24} height={24} />
                      ) : (
                        <OffIcon width={24} height={24} />
                      )
                    }
                    hoverIcon={<HoverIcon width={24} height={24} />}
                    isSelected={isSelected}
                  />
                </Link>
              );
            },
          )}
        </nav>
      </div>
    </aside>
  );
};
