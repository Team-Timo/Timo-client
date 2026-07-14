import { OnboardingFunnelContainer } from "@/app/[locale]/onboarding/_containers/OnboardingFunnelContainer";
import { AuthGuardProvider } from "@/providers/auth/AuthGuardProvider";
import { OnboardingCompletedGuardProvider } from "@/providers/auth/OnboardingCompletedGuardProvider";

export default function OnboardingPage() {
  return (
    <AuthGuardProvider>
      <OnboardingCompletedGuardProvider>
        <OnboardingFunnelContainer />
      </OnboardingCompletedGuardProvider>
    </AuthGuardProvider>
  );
}
