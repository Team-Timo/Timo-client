"use client";

import {
  ChartHoverIcon,
  ChartOffIcon,
  ChartOnIcon,
  HomeHoverIcon,
  HomeOffIcon,
  HomeOnIcon,
  LogoTimoIcon,
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
import { cn, useEscapeKey } from "@repo/timo-design-system/utils";
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

const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

interface NavigationSidebarNavItemProps {
  item: (typeof MAIN_NAV_ITEMS)[number] | typeof SETTINGS_NAV_ITEM;
  pathname: string;
  onNavigate: () => void;
}

const NavigationSidebarNavItem = ({
  item: { href, labelKey, OnIcon, OffIcon, HoverIcon },
  pathname,
  onNavigate,
}: NavigationSidebarNavItemProps) => {
  const t = useTranslations("Navigation");
  const isSelected = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      aria-current={isSelected ? "page" : undefined}
      onClick={onNavigate}
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

export const NavigationSidebar = () => {
  const pathname = usePathname();

  const { isOpen, isMobileOpen, toggleMobile } = useNavigationSidebar();

  const closeMobileSidebar = () => {
    if (isMobileOpen) toggleMobile();
  };

  useEscapeKey(isMobileOpen, closeMobileSidebar);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeMobileSidebar}
        className={cn(
          "bg-timo-overlay fixed inset-0 z-40 transition-opacity duration-200 ease-out motion-reduce:transition-none md:hidden",
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "bg-timo-gray-300 fixed top-0 left-0 z-50 flex h-screen w-55 flex-col items-start p-5 transition-[translate,opacity] duration-200 ease-in-out motion-reduce:transition-none md:z-10",
          isMobileOpen
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-full opacity-0",
          isOpen
            ? "md:pointer-events-auto md:translate-x-0 md:opacity-100"
            : "md:pointer-events-none md:-translate-x-full md:opacity-0",
        )}
      >
        <div className="flex h-full w-45 shrink-0 flex-col gap-7.5">
          <Link
            href={ROUTES.HOME}
            aria-label="Timo"
            onClick={closeMobileSidebar}
          >
            <LogoTimoIcon width={92} height={35} />
          </Link>
          <nav className="flex flex-1 flex-col justify-between">
            <div className="flex flex-col gap-2">
              {MAIN_NAV_ITEMS.map((item) => (
                <NavigationSidebarNavItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onNavigate={closeMobileSidebar}
                />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <NavigationSidebarNavItem
                item={SETTINGS_NAV_ITEM}
                pathname={pathname}
                onNavigate={closeMobileSidebar}
              />
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};
