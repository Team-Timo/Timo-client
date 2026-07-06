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

export const NavigationSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-timo-gray-300 flex h-screen w-55 flex-col items-start p-5">
      <Image src={timoTextLogo} alt="Timo" width={92} height={35} />
      <nav className="mt-7.5 flex flex-col gap-2">
        <Link
          href="/home"
          aria-current={pathname === "/home" ? "page" : undefined}
        >
          <TabButton
            label="홈"
            icon={
              pathname === "/home" ? (
                <HomeOnIcon width={24} height={24} />
              ) : (
                <HomeOffIcon width={24} height={24} />
              )
            }
            hoverIcon={<HomeHoverIcon width={24} height={24} />}
            isSelected={pathname === "/home"}
          />
        </Link>
        <Link
          href="/today"
          aria-current={pathname === "/today" ? "page" : undefined}
        >
          <TabButton
            label="오늘"
            icon={
              pathname === "/today" ? (
                <TodayOnIcon width={24} height={24} />
              ) : (
                <TodayOffIcon width={24} height={24} />
              )
            }
            hoverIcon={<TodayHoverIcon width={24} height={24} />}
            isSelected={pathname === "/today"}
          />
        </Link>
        <Link
          href="/focus"
          aria-current={pathname === "/focus" ? "page" : undefined}
        >
          <TabButton
            label="집중 모드"
            icon={
              pathname === "/focus" ? (
                <TimerOnIcon width={24} height={24} />
              ) : (
                <TimerOffIcon width={24} height={24} />
              )
            }
            hoverIcon={<TimerHoverIcon width={24} height={24} />}
            isSelected={pathname === "/focus"}
          />
        </Link>
        <Link
          href="/statistics"
          aria-current={pathname === "/statistics" ? "page" : undefined}
        >
          <TabButton
            label="통계"
            icon={
              pathname === "/statistics" ? (
                <ChartOnIcon width={24} height={24} />
              ) : (
                <ChartOffIcon width={24} height={24} />
              )
            }
            hoverIcon={<ChartHoverIcon width={24} height={24} />}
            isSelected={pathname === "/statistics"}
          />
        </Link>
      </nav>

      <Link
        href="/settings"
        className="mt-auto"
        aria-current={pathname.startsWith("/settings") ? "page" : undefined}
      >
        <TabButton
          label="설정"
          icon={
            pathname.startsWith("/settings") ? (
              <SettingOnIcon width={24} height={24} />
            ) : (
              <SettingOffIcon width={24} height={24} />
            )
          }
          hoverIcon={<SettingHoverIcon width={24} height={24} />}
          isSelected={pathname.startsWith("/settings")}
        />
      </Link>
    </aside>
  );
};
