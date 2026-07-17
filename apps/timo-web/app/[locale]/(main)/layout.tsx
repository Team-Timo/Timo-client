import type { Metadata } from "next";

import { MainShellContainer } from "@/app/[locale]/(main)/_containers/MainShellContainer";
import { AuthGuardProvider } from "@/providers/auth/AuthGuardProvider";
import { OnboardingRequiredGuardProvider } from "@/providers/auth/OnboardingRequiredGuardProvider";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <div className="bg-timo-gray-300 h-screen overflow-hidden py-5">
      <AuthGuardProvider>
        <OnboardingRequiredGuardProvider>
          <MainShellContainer>{children}</MainShellContainer>
        </OnboardingRequiredGuardProvider>
      </AuthGuardProvider>
    </div>
  );
}
