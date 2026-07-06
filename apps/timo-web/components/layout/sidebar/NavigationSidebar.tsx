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
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/routes";

const NAV_ITEMS = [
  {
    href: ROUTES.HOME,
    label: "홈",
    OnIcon: HomeOnIcon,
    OffIcon: HomeOffIcon,
    HoverIcon: HomeHoverIcon,
  },
  {
    href: ROUTES.TODAY,
    label: "오늘",
    OnIcon: TodayOnIcon,
    OffIcon: TodayOffIcon,
    HoverIcon: TodayHoverIcon,
  },
  {
    href: ROUTES.FOCUS,
    label: "집중 모드",
    OnIcon: TimerOnIcon,
    OffIcon: TimerOffIcon,
    HoverIcon: TimerHoverIcon,
  },
  {
    href: ROUTES.STATISTICS,
    label: "통계",
    OnIcon: ChartOnIcon,
    OffIcon: ChartOffIcon,
    HoverIcon: ChartHoverIcon,
  },
  {
    href: ROUTES.SETTINGS,
    label: "설정",
    OnIcon: SettingOnIcon,
    OffIcon: SettingOffIcon,
    HoverIcon: SettingHoverIcon,
    className: "mt-auto",
  },
];

export const NavigationSidebar = () => {
  const pathname = usePathname();
  const isActivePath = (pathname: string, href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="bg-timo-gray-300 flex h-screen w-55 flex-col items-start p-5">
      <div className="flex flex-col gap-7.5">
        <Image src={timoTextLogo} alt="Timo" width={92} height={35} />
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map(
            ({ href, label, OnIcon, OffIcon, HoverIcon, className }) => {
              const isSelected = isActivePath(pathname, href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={className}
                  aria-current={isSelected ? "page" : undefined}
                >
                  <TabButton
                    label={label}
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
