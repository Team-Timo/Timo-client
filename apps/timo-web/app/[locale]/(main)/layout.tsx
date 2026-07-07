import { MainShellContainer } from "@/app/[locale]/(main)/_containers/MainShellContainer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <div className="bg-timo-gray-300 h-screen overflow-hidden py-5">
      <MainShellContainer>{children}</MainShellContainer>
    </div>
  );
}
