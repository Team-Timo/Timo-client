import { WithTimeSidebarContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/_containers/WithTimeSidebarContainer";

interface WithTimeSidebarLayoutProps {
  children: React.ReactNode;
}

export default function WithTimeSidebarLayout({
  children,
}: Readonly<WithTimeSidebarLayoutProps>) {
  return <WithTimeSidebarContainer>{children}</WithTimeSidebarContainer>;
}
