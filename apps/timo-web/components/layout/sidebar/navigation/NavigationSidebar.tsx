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
import { cn } from "@repo/timo-design-system/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { useNavigationSidebar } from "@/components/layout/sidebar/navigation/NavigationSidebarContext";
import { ROUTES } from "@/constants/routes";
import { Link, usePathname } from "@/i18n/navigation";

const MAIN_NAV_ITEMS = [
  {
    href: ROUTES.HOME,
    labelKey: "home",
    OnIcon: HomeOnIcon,
    OffIcon: HomeOffIcon,
    HoverIcon: HomeHoverIcon,
  },
  {
    href: ROUTES.TODAY,
    labelKey: "today",
    OnIcon: TodayOnIcon,
    OffIcon: TodayOffIcon,
    HoverIcon: TodayHoverIcon,
  },
  {
    href: ROUTES.FOCUS,
    labelKey: "focus",
    OnIcon: TimerOnIcon,
    OffIcon: TimerOffIcon,
    HoverIcon: TimerHoverIcon,
  },
  {
    href: ROUTES.STATISTICS,
    labelKey: "statistics",
    OnIcon: ChartOnIcon,
    OffIcon: ChartOffIcon,
    HoverIcon: ChartHoverIcon,
  },
] as const;

const SETTINGS_NAV_ITEM = {
  href: ROUTES.SETTINGS,
  labelKey: "settings",
  OnIcon: SettingOnIcon,
  OffIcon: SettingOffIcon,
  HoverIcon: SettingHoverIcon,
} as const;

export const NavigationSidebar = () => {
  const t = useTranslations("Navigation");

  const pathname = usePathname();

  const { isOpen } = useNavigationSidebar();

  const isActivePath = (pathname: string, href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const renderNavItem = ({
    href,
    labelKey,
    OnIcon,
    OffIcon,
    HoverIcon,
  }: (typeof MAIN_NAV_ITEMS)[number] | typeof SETTINGS_NAV_ITEM) => {
    const isSelected = isActivePath(pathname, href);

    return (
      <Link
        key={href}
        href={href}
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
  };

  return (
    <aside
      className={cn(
        "bg-timo-gray-300 fixed top-0 left-0 z-10 flex h-screen w-55 flex-col items-start p-5 transition-[transform,opacity] duration-200 ease-in-out",
        isOpen
          ? "translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-full opacity-0",
      )}
    >
      <div className="flex h-full w-45 shrink-0 flex-col gap-7.5">
        <Image src={timoTextLogo} alt="Timo" width={92} height={35} />
        <nav className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-2">
            {MAIN_NAV_ITEMS.map(renderNavItem)}
          </div>
          <div className="flex flex-col gap-2">
            {renderNavItem(SETTINGS_NAV_ITEM)}
          </div>
        </nav>
      </div>
    </aside>
  );
};
