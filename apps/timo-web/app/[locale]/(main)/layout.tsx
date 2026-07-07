import { NavigationSidebar } from "@/components/layout/sidebar/NavigationSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <div className="flex min-h-screen">
      <NavigationSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
